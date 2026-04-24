import { NutritionOnboardingData } from './types'

export function canGoNext(step: number, data: NutritionOnboardingData): boolean {
  switch (step) {
    case 1:
      return !!data.diabetesHistory && !!data.bodyType
    case 2:
      return !!data.wakeUpTime && !!data.sleepTime
    case 3:
      return true // Clinical can be empty
    case 4:
      return !!data.mealsPerDay
    default:
      return true
  }
}
