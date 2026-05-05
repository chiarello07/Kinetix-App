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

const tier1Exercises: Exercise[] = [
  {
    id: 'c1',
    name: 'Prancha Isométrica',
    type: 'Compound',
    targetMuscles: ['Core'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'p1',
    name: 'Supino Reto com Barra',
    type: 'Compound',
    targetMuscles: ['Peito'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'p2',
    name: 'Supino Inclinado com Halteres',
    type: 'Compound',
    targetMuscles: ['Peito'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'b1',
    name: 'Puxada Frontal (Lat Pulldown)',
    type: 'Compound',
    targetMuscles: ['Costas'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'b2',
    name: 'Remada Curvada com Barra',
    type: 'Compound',
    targetMuscles: ['Costas'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'l1',
    name: 'Agachamento Livre com Barra',
    type: 'Compound',
    targetMuscles: ['Pernas'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'l2',
    name: 'Leg Press 45º',
    type: 'Compound',
    targetMuscles: ['Pernas'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'l5',
    name: 'Levantamento Terra Romeno (RDL)',
    type: 'Compound',
    targetMuscles: ['Pernas'],
    description: '',
    executionNotes: '',
  },
  {
    id: 's1',
    name: 'Desenvolvimento Militar com Barra',
    type: 'Compound',
    targetMuscles: ['Ombros'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'a1',
    name: 'Rosca Direta com Barra',
    type: 'Isolation',
    targetMuscles: ['Bíceps'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'a4',
    name: 'Tríceps Pulley com Corda',
    type: 'Isolation',
    targetMuscles: ['Tríceps'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'ca1',
    name: 'Panturrilha em Pé (Máquina)',
    type: 'Isolation',
    targetMuscles: ['Panturrilhas'],
    description: '',
    executionNotes: '',
  },
]

export function generatePlan(params: GeneratePlanParams): WorkoutPlan {
  const { durationWeeks, trainingDays, focusAreas, weightKg, posturalScore, deviations } = params

  const periodizationType =
    durationWeeks === 13 ? 'Linear' : durationWeeks === 26 ? 'Undulating' : 'Block'
  const medicalClearanceRequired = posturalScore < 60

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

        let mainSets = objective === 'Hypertrophy' ? 4 : objective === 'Strength' ? 5 : 3
        let mainReps =
          objective === 'Hypertrophy'
            ? '8-12 (Até a falha)'
            : objective === 'Strength'
              ? '3-6'
              : '10-15'
        let mainRpe = objective === 'Hypertrophy' ? 9 : objective === 'Strength' ? 9 : 8
        let mainRest = objective === 'Strength' ? 180 : 90

        if (isDeload) {
          mainSets = 2
          mainReps = '12'
          mainRpe = 6
          mainRest = 60
        }

        for (let i = 0; i < 5; i++) {
          const comp = tier1Exercises[(idx * 5 + i) % tier1Exercises.length]
          sessionExercises.push({
            id: generateId(),
            exerciseId: comp.id,
            exercise: comp,
            category: 'Main',
            sets: mainSets,
            reps: mainReps,
            restTimeSeconds: mainRest,
            rpe: mainRpe,
            notes:
              'Foco na cadência e controle do movimento. Máxima eficiência de recrutamento muscular.',
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
    mesocycles.push(createMeso('Meso 1 - Adaptação Tensional', 'Hypertrophy', 4))
    mesocycles.push(createMeso('Meso 2 - Volume e Hipertrofia', 'Hypertrophy', 4))
    mesocycles.push(createMeso('Meso 3 - Choque e Densidade', 'Strength', 4))
    mesocycles.push(createMeso('Meso 4 - Recuperação Ativa', 'Deload', 1))
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
    name: `Plano Estruturado ${durationWeeks} Semanas (Motor Tier 1)`,
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
