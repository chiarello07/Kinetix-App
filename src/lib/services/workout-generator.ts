import { exercisesDB, deviationMappings, prohibitedMappings } from './mockDatabase'
import type {
  WorkoutPlan,
  Mesocycle,
  Microcycle,
  TrainingSession,
  SessionExercise,
  Exercise,
} from '../types/workout'

export type GeneratePlanParams = {
  durationWeeks: 13 | 26 | 52
  trainingDays: string[]
  focusAreas: string[]
  weightKg: number
  posturalScore: number
  deviations: any[]
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export function generatePlan(params: GeneratePlanParams): WorkoutPlan {
  const { durationWeeks, trainingDays, focusAreas, weightKg, posturalScore, deviations } = params

  const periodizationType =
    durationWeeks === 13 ? 'Linear' : durationWeeks === 26 ? 'Undulating' : 'Block'
  const medicalClearanceRequired = posturalScore < 60

  const prohibitedIds = new Set<string>()
  deviations.forEach((dev) => {
    const prohibited = prohibitedMappings[dev.id] || []
    prohibited.forEach((id) => prohibitedIds.add(id))
  })

  const correctiveExercises: { ex: Exercise; devId: string }[] = []
  deviations.forEach((dev) => {
    const mappings = deviationMappings[dev.id] || []
    mappings.forEach((m) => {
      if (!prohibitedIds.has(m.exerciseId) && exercisesDB[m.exerciseId]) {
        correctiveExercises.push({ ex: exercisesDB[m.exerciseId], devId: dev.id })
      }
    })
  })

  const allExercises = Object.values(exercisesDB)
  const accessories = allExercises.filter((e) => e.type === 'Isolation' && !prohibitedIds.has(e.id))

  const cardios = allExercises.filter((e) => e.type === 'Cardio' && !prohibitedIds.has(e.id))
  const defaultWarmup =
    cardios.length > 0
      ? cardios[0]
      : { ...allExercises[0], name: 'Aquecimento Geral', type: 'Cardio' as const }

  const mobilities = allExercises.filter((e) => e.type === 'Mobility' && !prohibitedIds.has(e.id))

  const mesocycles: Mesocycle[] = []
  let currentWeek = 1

  const createMeso = (name: string, objective: string, length: number): Mesocycle => {
    const startWeek = currentWeek
    const endWeek = currentWeek + length - 1
    const microcycles: Microcycle[] = []

    for (let w = startWeek; w <= endWeek; w++) {
      const isDeload = w === endWeek || w % 4 === 0

      const sessions: TrainingSession[] = trainingDays.map((day, idx) => {
        const sessionExercises: SessionExercise[] = []

        sessionExercises.push({
          id: generateId(),
          exerciseId: defaultWarmup.id,
          exercise: defaultWarmup,
          category: 'Warm-up',
          sets: 1,
          reps: '5 min',
          restTimeSeconds: 0,
          rpe: 4,
          notes: 'Aquecimento em intensidade leve.',
        })

        let mainSets = objective === 'Hypertrophy' ? 4 : objective === 'Strength' ? 4 : 3
        let mainReps =
          objective === 'Hypertrophy' ? '8-12' : objective === 'Strength' ? '4-6' : '12-15'
        let mainRpe = objective === 'Hypertrophy' ? 8 : objective === 'Strength' ? 9 : 7
        let mainRest = objective === 'Strength' ? 120 : 90

        if (isDeload) {
          mainSets = 2
          mainReps = '10'
          mainRpe = 6
          mainRest = 60
        }

        const dayCorrectives = correctiveExercises.slice(idx * 2, idx * 2 + 2)
        dayCorrectives.forEach((c) => {
          sessionExercises.push({
            id: generateId(),
            exerciseId: c.ex.id,
            exercise: c.ex,
            category: 'Main',
            sets: mainSets,
            reps: mainReps,
            restTimeSeconds: mainRest,
            rpe: mainRpe,
            notes: c.ex.executionNotes,
            targetDeviationId: c.devId,
          })
        })

        const compounds = allExercises.filter(
          (e) => e.type === 'Compound' && !prohibitedIds.has(e.id),
        )
        if (compounds.length > 0) {
          const comp = compounds[idx % compounds.length]
          sessionExercises.push({
            id: generateId(),
            exerciseId: comp.id,
            exercise: comp,
            category: 'Main',
            sets: mainSets,
            reps: mainReps,
            restTimeSeconds: mainRest,
            rpe: mainRpe,
            notes: comp.executionNotes,
          })
        }

        const dayAccessories = accessories.slice(idx * 2, idx * 2 + 2)
        dayAccessories.forEach((a) => {
          sessionExercises.push({
            id: generateId(),
            exerciseId: a.id,
            exercise: a,
            category: 'Accessory',
            sets: isDeload ? 2 : 3,
            reps: isDeload ? '12' : '10-15',
            restTimeSeconds: 60,
            rpe: isDeload ? 6 : 7,
            notes: a.executionNotes,
          })
        })

        if (mobilities.length > 0) {
          const mob = mobilities[idx % mobilities.length]
          sessionExercises.push({
            id: generateId(),
            exerciseId: mob.id,
            exercise: mob,
            category: 'Cool-down',
            sets: 1,
            reps: '30s cada lado',
            restTimeSeconds: 0,
            rpe: 3,
            notes: 'Foque na respiração.',
          })
        }

        const totalSets = sessionExercises.reduce((acc, curr) => acc + curr.sets, 0)
        const avgSetTime = 45
        const avgRestTime =
          sessionExercises.reduce((acc, curr) => acc + curr.sets * curr.restTimeSeconds, 0) /
          Math.max(1, totalSets)
        const durationMinutes =
          Math.round((totalSets * avgSetTime + totalSets * avgRestTime) / 60) + 10
        const estimatedCalories = Math.round(((6.0 * 3.5 * weightKg) / 200) * durationMinutes)

        return {
          id: generateId(),
          dayOfWeek: day,
          name: `Treino de ${day} - ${objective}`,
          estimatedDurationMinutes: durationMinutes,
          estimatedCalories,
          exercises: sessionExercises,
        }
      })

      microcycles.push({
        id: generateId(),
        weekNumber: w,
        isDeload,
        sessions,
      })
    }

    currentWeek += length
    return {
      id: generateId(),
      name,
      objective,
      startWeek,
      endWeek,
      microcycles,
    }
  }

  if (durationWeeks === 13) {
    mesocycles.push(createMeso('Meso 1 - Adaptação', 'Adaptation', 3))
    mesocycles.push(createMeso('Meso 2 - Hipertrofia', 'Hypertrophy', 3))
    mesocycles.push(createMeso('Meso 3 - Força Base', 'Strength', 3))
    mesocycles.push(createMeso('Meso 4 - Transição', 'Deload', 1))
    mesocycles.push(createMeso('Meso 5 - Potência', 'Power', 3))
  } else if (durationWeeks === 26) {
    for (let i = 0; i < 6; i++) {
      const obj = i % 2 === 0 ? 'Hypertrophy' : 'Strength'
      mesocycles.push(createMeso(`Bloco ${i + 1} - ${obj}`, obj, 4))
    }
    mesocycles.push(createMeso('Transição Final', 'Deload', 2))
  } else {
    for (let i = 0; i < 13; i++) {
      const phase = i % 3 === 0 ? 'Accumulation' : i % 3 === 1 ? 'Transmutation' : 'Realization'
      const obj =
        phase === 'Accumulation' ? 'Hypertrophy' : phase === 'Transmutation' ? 'Strength' : 'Power'
      mesocycles.push(createMeso(`Bloco ${i + 1} - ${phase}`, obj, 4))
    }
  }

  return {
    id: generateId(),
    userId: 'user-1',
    name: `Plano Periodizado ${durationWeeks} Semanas`,
    durationWeeks,
    periodizationType,
    createdAt: new Date().toISOString(),
    mesocycles,
    medicalClearanceRequired,
    posturalScore,
    deviationsSnapshot: deviations,
    focusAreas,
    trainingDays,
  }
}
