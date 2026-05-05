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
  fitnessLevel?: string
  primaryGoal?: string
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
    id: 'c2',
    name: 'Ponte de Glúteos',
    type: 'Compound',
    targetMuscles: ['Glúteos'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'c3',
    name: 'Bird-Dog',
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
    id: 'p3',
    name: 'Flexão de Braço (Push-up)',
    type: 'Compound',
    targetMuscles: ['Peito', 'Tríceps'],
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
    id: 'b3',
    name: 'Levantamento Terra (Deadlift)',
    type: 'Compound',
    targetMuscles: ['Costas', 'Posterior'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'l1',
    name: 'Agachamento Livre com Barra',
    type: 'Compound',
    targetMuscles: ['Quadríceps', 'Glúteos'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'l2',
    name: 'Leg Press 45º',
    type: 'Compound',
    targetMuscles: ['Quadríceps'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'l3',
    name: 'Afundo com Halteres',
    type: 'Compound',
    targetMuscles: ['Quadríceps'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'l4',
    name: 'Levantamento Terra Romeno (RDL)',
    type: 'Compound',
    targetMuscles: ['Posterior', 'Glúteos'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'l5',
    name: 'Mesa Flexora',
    type: 'Isolation',
    targetMuscles: ['Posterior'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'l6',
    name: 'Elevação Pélvica com Barra',
    type: 'Compound',
    targetMuscles: ['Glúteos'],
    description: '',
    executionNotes: '',
  },
  {
    id: 's1',
    name: 'Desenvolvimento Militar',
    type: 'Compound',
    targetMuscles: ['Ombros'],
    description: '',
    executionNotes: '',
  },
  {
    id: 's2',
    name: 'Elevação Lateral com Halteres',
    type: 'Isolation',
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
    id: 'a2',
    name: 'Tríceps Pulley com Corda',
    type: 'Isolation',
    targetMuscles: ['Tríceps'],
    description: '',
    executionNotes: '',
  },
  {
    id: 'ca1',
    name: 'Panturrilha em Pé',
    type: 'Isolation',
    targetMuscles: ['Panturrilhas'],
    description: '',
    executionNotes: '',
  },
]

export function generatePlan(params: GeneratePlanParams): WorkoutPlan {
  const {
    durationWeeks,
    trainingDays,
    focusAreas,
    weightKg,
    posturalScore,
    deviations,
    primaryGoal,
  } = params

  const periodizationType =
    durationWeeks === 13 ? 'Linear' : durationWeeks === 26 ? 'Undulating' : 'Block'
  const medicalClearanceRequired = posturalScore < 60

  const mesocycles: Mesocycle[] = []
  let currentWeek = 1

  const createMeso = (
    name: string,
    objective: string,
    length: number,
    phase: 'Acumulo' | 'Intensificacao' | 'Deload',
  ): Mesocycle => {
    const startWeek = currentWeek
    const endWeek = currentWeek + length - 1
    const microcycles: Microcycle[] = []

    for (let w = startWeek; w <= endWeek; w++) {
      const isDeload = phase === 'Deload' || w === endWeek

      const sessions: TrainingSession[] = trainingDays.map((day, idx) => {
        const sessionExercises: SessionExercise[] = []

        let baseSets = phase === 'Acumulo' ? 4 : phase === 'Intensificacao' ? 3 : 2
        let baseReps = phase === 'Acumulo' ? '10-15' : phase === 'Intensificacao' ? '6-8' : '12-15'
        let baseRpe = phase === 'Acumulo' ? 8 : phase === 'Intensificacao' ? 9 : 6
        let restTime = phase === 'Intensificacao' ? 120 : 90

        if (primaryGoal === 'força') {
          baseReps = phase === 'Acumulo' ? '5-8' : '3-5'
          baseSets += 1
          restTime = 180
        }

        for (let i = 0; i < 6; i++) {
          const exercise = tier1Exercises[(idx * 6 + i) % tier1Exercises.length]
          const isTier1 = exercise.type === 'Compound'

          sessionExercises.push({
            id: generateId(),
            exerciseId: exercise.id,
            exercise: exercise,
            category: isTier1 ? 'Main' : 'Accessory',
            sets: isTier1 ? baseSets : Math.max(1, baseSets - 1),
            reps: baseReps,
            restTimeSeconds: restTime,
            rpe: isTier1 ? baseRpe : Math.max(5, baseRpe - 1),
            notes: isTier1
              ? 'Foco total em sobrecarga progressiva e execução técnica. Movimento âncora do dia (Tier 1).'
              : 'Exercício de suporte para volume e correção (Tier 2/3).',
          })
        }

        const totalSets = sessionExercises.reduce((acc, curr) => acc + curr.sets, 0)
        const avgSetTime = 45
        const durationMinutes =
          Math.round((totalSets * avgSetTime + totalSets * restTime) / 60) + 10
        const estimatedCalories = Math.round(((6.0 * 3.5 * weightKg) / 200) * durationMinutes)

        return {
          id: generateId(),
          dayOfWeek: day,
          name: `Treino de ${day} - Foco Tier 1`,
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
    mesocycles.push(
      createMeso(
        'Mês 1 - Adaptação Tensional (Base)',
        'Adaptação Anatômica e Consistência',
        4,
        'Acumulo',
      ),
    )
    mesocycles.push(
      createMeso(
        'Mês 2 - Volume e Hipertrofia (Desenvolvimento)',
        'Hipertrofia e Resistência',
        4,
        'Acumulo',
      ),
    )
    mesocycles.push(
      createMeso(
        'Mês 3 - Choque e Densidade (Consolidação)',
        'Força Máxima e Pico de Performance',
        4,
        'Intensificacao',
      ),
    )
    mesocycles.push(createMeso('Mês 4 - Recuperação Ativa', 'Deload e Reparo', 1, 'Deload'))
  } else if (durationWeeks === 26) {
    mesocycles.push(
      createMeso('Bloco 1 - Capacidade de Trabalho', 'Base Aeróbica/Anaeróbica', 8, 'Acumulo'),
    )
    mesocycles.push(
      createMeso('Bloco 2 - Construção e Volume', 'Hipertrofia Sustentada', 8, 'Acumulo'),
    )
    mesocycles.push(
      createMeso(
        'Bloco 3 - Especialização e Densidade',
        'Refinamento e Pontos Fracos',
        8,
        'Intensificacao',
      ),
    )
    mesocycles.push(createMeso('Transição Final', 'Deload', 2, 'Deload'))
  } else {
    mesocycles.push(
      createMeso('Trimestre 1 - Fundação', 'Correção de assimetrias e base', 12, 'Acumulo'),
    )
    mesocycles.push(
      createMeso('Trimestre 2 - Hipertrofia Máxima', 'Acúmulo de volume', 13, 'Acumulo'),
    )
    mesocycles.push(
      createMeso(
        'Trimestre 3 - Força Máxima e Potência',
        'Cargas máximas e RPE 9',
        13,
        'Intensificacao',
      ),
    )
    mesocycles.push(
      createMeso('Trimestre 4 - Consolidação e PRs', 'Manutenção ativa e testes', 14, 'Deload'),
    )
  }

  return {
    id: generateId(),
    userId: 'user-1',
    name: `Plano Estruturado ${durationWeeks} Semanas (Motor Kinetix)`,
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
