export type NutritionOnboardingData = {
  diabetesHistory: string
  bodyType: string
  wakeUpTime: string
  sleepTime: string
  profession: string
  intestinalFunction: string
  bristolScale: string
  medications: any[]
  mealsPerDay: string
  waterIntake: string
  favoriteFoods: string
}

export const INITIAL_DATA: NutritionOnboardingData = {
  diabetesHistory: '',
  bodyType: '',
  wakeUpTime: '',
  sleepTime: '',
  profession: '',
  intestinalFunction: '',
  bristolScale: '4',
  medications: [],
  mealsPerDay: '',
  waterIntake: '',
  favoriteFoods: '',
}
