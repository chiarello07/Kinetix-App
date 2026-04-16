import { useState, useEffect } from 'react'
import { api } from '@/lib/services/api'
import type { WorkoutPlan } from '@/lib/types/workout'
import type { PosturalDeviation } from '@/lib/types/analysis'
import { toast } from 'sonner'

type WorkoutState = {
  plans: WorkoutPlan[]
  isGenerating: boolean
}

let state: WorkoutState = {
  plans: [],
  isGenerating: false,
}

const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export function useWorkoutStore() {
  const [snap, setSnap] = useState(state)

  useEffect(() => {
    const listener = () => setSnap({ ...state })
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const actions = {
    generateWorkout: async (analysisId: string, deviations: PosturalDeviation[]) => {
      state.isGenerating = true
      notify()

      try {
        const plan = await api.workout.generate(analysisId, deviations)
        state.plans = [plan, ...state.plans]
        toast.success('Plano de treino corretivo gerado!', {
          description: 'Ele está disponível na aba de Treinos.',
        })
        return plan
      } catch (error) {
        toast.error('Erro ao gerar treino', {
          description: error instanceof Error ? error.message : 'Tente novamente.',
        })
        throw error
      } finally {
        state.isGenerating = false
        notify()
      }
    },
  }

  return {
    ...snap,
    ...actions,
  }
}
