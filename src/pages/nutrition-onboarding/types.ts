export type MedSupp = { id: string; name: string; dosage: string; frequency: string }

export type NutritionOnboardingData = {
  age: string
  height: string
  weight: string
  targetWeight: string
  goal: string
  bodyType: string
  maxWeight: string
  minWeight: string
  wakeTime: string
  sleepTime: string
  sleepQuality: string
  fitnessLevel: string
  exerciseType: string
  exerciseFrequency: string
  exerciseDuration: string
  workActivityLevel: string
  workHours: string
  intestinalFunction: string
  bristolScale: string
  medications: MedSupp[]
  supplements: MedSupp[]
  mealsPerDay: string
  mealTimes: Record<number, string>
  waterIntake: string
  favFruits: string[]
  favVegetables: string[]
  mealPreferences: Record<string, string[]>
}

export const INITIAL_DATA: NutritionOnboardingData = {
  age: '',
  height: '',
  weight: '',
  targetWeight: '',
  goal: '',
  bodyType: '',
  maxWeight: '',
  minWeight: '',
  wakeTime: '',
  sleepTime: '',
  sleepQuality: '',
  fitnessLevel: '',
  exerciseType: '',
  exerciseFrequency: '',
  exerciseDuration: '',
  workActivityLevel: '',
  workHours: '',
  intestinalFunction: '',
  bristolScale: '4',
  medications: [],
  supplements: [],
  mealsPerDay: '3',
  mealTimes: {},
  waterIntake: '',
  favFruits: [],
  favVegetables: [],
  mealPreferences: {
    'Café da Manhã': [],
    Almoço: [],
    Jantar: [],
  },
}
