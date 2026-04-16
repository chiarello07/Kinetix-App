import { useState, useEffect } from 'react'
import type { WorkoutPlan } from '@/lib/types/workout'
import { generatePlan, type GeneratePlanParams } from '@/lib/services/workout-generator'
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
    generateWorkout: async (params: GeneratePlanParams) => {
      state.isGenerating = true
      notify()

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        const plan = generatePlan(params)
        state.plans = [plan, ...state.plans]
        toast.success('Plano periodizado gerado!', {
          description: `Plano de ${plan.durationWeeks} semanas criado com sucesso.`,
        })
        return plan
      } catch (error) {
        toast.error('Erro ao gerar plano', {
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
