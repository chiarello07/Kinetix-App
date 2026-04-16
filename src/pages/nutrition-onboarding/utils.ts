import { NutritionOnboardingData } from './types'

export function canGoNext(step: number, data: NutritionOnboardingData): boolean {
  switch (step) {
    case 1: {
      const a = Number(data.age)
      const h = Number(data.height)
      const w = Number(data.weight)
      return a >= 16 && h >= 100 && h <= 250 && w >= 30 && w <= 300
    }
    case 2:
      return !!data.goal
    case 3:
      return !!data.bodyType
    case 4: {
      const maxW = Number(data.maxWeight)
      const minW = Number(data.minWeight)
      const w = Number(data.weight)
      return !!data.maxWeight && !!data.minWeight && maxW >= w && minW > 0 && minW <= w
    }
    case 5:
      return !!data.wakeTime && !!data.sleepTime && !!data.sleepQuality
    case 6:
      return !!data.fitnessLevel
    case 7:
      return (
        !!data.exerciseType &&
        !!data.exerciseFrequency &&
        !!data.exerciseDuration &&
        Number(data.exerciseFrequency) >= 1 &&
        Number(data.exerciseFrequency) <= 7 &&
        Number(data.exerciseDuration) >= 10 &&
        Number(data.exerciseDuration) <= 180
      )
    case 8:
      return (
        !!data.workActivityLevel &&
        !!data.workHours &&
        Number(data.workHours) >= 0 &&
        Number(data.workHours) <= 24
      )
    case 9:
      return (
        !!data.intestinalFunction &&
        Number(data.bristolScale) >= 1 &&
        Number(data.bristolScale) <= 7
      )
    case 10: {
      const meals = Number(data.mealsPerDay)
      const timesFilled = Array.from({ length: meals }).every((_, i) => !!data.mealTimes[i])
      const water = Number(data.waterIntake)
      return (
        meals >= 3 && meals <= 6 && timesFilled && !!data.waterIntake && water >= 0 && water <= 10
      )
    }
    case 11: {
      const hasMealPrefs = ['Café da Manhã', 'Almoço', 'Jantar'].every(
        (m) => data.mealPreferences[m]?.length > 0,
      )
      return data.favFruits.length === 3 && data.favVegetables.length === 3 && hasMealPrefs
    }
    default:
      return true
  }
}
