import type { PosturalDeviation } from './analysis'

export interface Exercise {
  id: string
  name: string
  description: string
  targetMuscles: string[]
  executionNotes: string
  type: 'Compound' | 'Isolation' | 'Mobility' | 'Cardio'
}

export interface SessionExercise {
  id: string
  exerciseId: string
  exercise: Exercise
  category: 'Warm-up' | 'Main' | 'Accessory' | 'Cool-down'
  sets: number
  reps: string
  restTimeSeconds: number
  rpe: number
  notes: string
  targetDeviationId?: string
}

export interface TrainingSession {
  id: string
  dayOfWeek: string
  name: string
  estimatedDurationMinutes: number
  estimatedCalories: number
  exercises: SessionExercise[]
}

export interface Microcycle {
  id: string
  weekNumber: number
  isDeload: boolean
  sessions: TrainingSession[]
}

export interface Mesocycle {
  id: string
  name: string
  objective: string
  startWeek: number
  endWeek: number
  microcycles: Microcycle[]
}

export interface WorkoutPlan {
  id: string
  userId: string
  analysisId?: string
  name: string
  durationWeeks: 13 | 26 | 52
  periodizationType: 'Linear' | 'Undulating' | 'Block'
  createdAt: string
  mesocycles: Mesocycle[]
  medicalClearanceRequired: boolean
  posturalScore: number
  deviationsSnapshot: any[]
  focusAreas: string[]
  trainingDays: string[]
}
