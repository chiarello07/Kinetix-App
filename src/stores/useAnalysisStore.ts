import { useState, useEffect } from 'react'
import type { AnalysisResult, AnalysisStep, ViewType } from '@/lib/types/analysis'
import { processPhotos } from '@/lib/services/mockPosturalEngine'

export type AnalysisState = {
  step: AnalysisStep
  consentGiven: boolean
  currentView: ViewType
  photos: Record<ViewType, string | null>
  result: AnalysisResult | null
  error: string | null
}

const initialState: AnalysisState = {
  step: 'CONSENT',
  consentGiven: false,
  currentView: 'FRONTAL',
  photos: {
    FRONTAL: null,
    LATERAL_LEFT: null,
    LATERAL_RIGHT: null,
    POSTERIOR: null,
  },
  result: null,
  error: null,
}

let state: AnalysisState = { ...initialState }
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export default function useAnalysisStore() {
  const [snap, setSnap] = useState(state)

  useEffect(() => {
    const listener = () => setSnap({ ...state })
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  const actions = {
    setConsent: (given: boolean) => {
      state.consentGiven = given
      if (given) state.step = 'CAPTURE'
      notify()
    },
    setPhoto: (view: ViewType, url: string) => {
      state.photos[view] = url
      notify()
    },
    setCurrentView: (view: ViewType) => {
      state.currentView = view
      notify()
    },
    startProcessing: async () => {
      state.step = 'PROCESSING'
      state.error = null
      notify()

      try {
        const result = await processPhotos(state.photos)
        state.result = result
        state.step = 'RESULTS'
        notify()
      } catch (err: any) {
        state.error = err.message || 'Falha ao processar análise.'
        state.step = 'ERROR'
        notify()
      }
    },
    reset: () => {
      state = { ...initialState }
      notify()
    },
  }

  const allPhotosCaptured = Object.values(snap.photos).every((photo) => photo !== null)

  return {
    ...snap,
    ...actions,
    allPhotosCaptured,
  }
}
