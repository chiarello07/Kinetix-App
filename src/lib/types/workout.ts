import type { PosturalDeviation } from './analysis'

export interface Exercise {
  id: string
  name: string
  description: string
  targetMuscles: string[]
  executionNotes: string
  type: 'Compound' | 'Isolation' | 'Mobility'
}

export interface ExercisePrescription {
  exerciseId: string
  exercise: Exercise
  sets: number
  reps: string
  restTimeSeconds: number
  notes: string
  targetDeviationId?: string
}

export interface WorkoutPlan {
  id: string
  userId: string
  analysisId: string
  name: string
  createdAt: string
  exercises: ExercisePrescription[]
  deviationsSnapshot: PosturalDeviation[]
}
