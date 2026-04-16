import { exercisesDB, deviationMappings } from './mockDatabase'
import type { WorkoutPlan, ExercisePrescription } from '../types/workout'
import type { PosturalDeviation } from '../types/analysis'

export const userWorkoutsStore: WorkoutPlan[] = []

export const api = {
  workout: {
    generate: async (
      analysisId: string,
      deviations: PosturalDeviation[],
      userId: string = 'user-uuid-123',
    ): Promise<WorkoutPlan> => {
      // Simulating API latency to meet requirement for loading state
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const prescribedExercises = new Map<string, ExercisePrescription>()

      for (const deviation of deviations) {
        const mapping = deviationMappings[deviation.id]
        if (!mapping || mapping.length === 0) continue

        // Algorithm: sort by priority (ASC) then efficacy (DESC)
        const sortedMapping = [...mapping].sort((a, b) => {
          if (a.priority === b.priority) {
            return b.efficacy - a.efficacy
          }
          return a.priority - b.priority
        })

        const topExercises = sortedMapping.slice(0, 2)

        for (const item of topExercises) {
          const exercise = exercisesDB[item.exerciseId]
          if (!exercise) continue

          if (!prescribedExercises.has(exercise.id)) {
            let sets = 3
            let reps = '10-12'
            let restTimeSeconds = 60

            if (exercise.type === 'Compound') {
              sets = 4
              reps = '8-10'
              restTimeSeconds = 90
            } else if (exercise.type === 'Mobility') {
              sets = 2
              reps = '30-45s'
              restTimeSeconds = 45
            }

            prescribedExercises.set(exercise.id, {
              exerciseId: exercise.id,
              exercise,
              sets,
              reps,
              restTimeSeconds,
              notes: exercise.executionNotes,
              targetDeviationId: deviation.id,
            })
          }
        }
      }

      const planExercises = Array.from(prescribedExercises.values())

      if (planExercises.length === 0) {
        throw new Error(
          'Nenhum exercício pôde ser mapeado para os desvios encontrados. O banco de dados pode estar desatualizado.',
        )
      }

      // Add general exercises if the plan is too short
      if (planExercises.length < 5) {
        const fillers = ['EX003', 'EX001', 'EX006', 'EX016']
        for (const f of fillers) {
          if (planExercises.length >= 6) break
          if (!prescribedExercises.has(f)) {
            const exercise = exercisesDB[f]
            planExercises.push({
              exerciseId: exercise.id,
              exercise,
              sets: 3,
              reps: '10-12',
              restTimeSeconds: 60,
              notes: exercise.executionNotes,
            })
          }
        }
      }

      const plan: WorkoutPlan = {
        id: `plan-${Date.now()}`,
        userId,
        analysisId,
        name: `Treino Corretivo Postural`,
        createdAt: new Date().toISOString(),
        exercises: planExercises,
        deviationsSnapshot: deviations,
      }

      // Snapshot to "user_workouts"
      userWorkoutsStore.push(plan)

      return plan
    },
  },
}
