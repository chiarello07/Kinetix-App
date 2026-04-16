export interface FoodLog {
  id: string
  nutritionPlanId: string
  userId: string
  logDate: string
  logTime?: string
  mealType?: string
  inputMethod: 'photo' | 'audio' | 'text' | 'manual'
  inputData: any
  foods: Array<{
    foodId: string
    foodName: string
    quantity: number
    unit: string
    calories: number
    protein: number
    carbs: number
    fat: number
  }>
  totalCalories: number
  totalProteinGrams: number
  totalCarbsGrams: number
  totalFatGrams: number
  aiConfidence: number
  confirmed: boolean
  createdAt: string
}

export interface DailySummary {
  id: string
  nutritionPlanId: string
  userId: string
  summaryDate: string
  totalCaloriesConsumed: number
  totalProteinConsumed: number
  totalCarbsConsumed: number
  totalFatConsumed: number
  targetCalories: number
  targetProtein: number
  targetCarbs: number
  targetFat: number
  caloriesRemaining: number
  proteinRemaining: number
  carbsRemaining: number
  fatRemaining: number
  caloriesPercentage: number
  proteinPercentage: number
  carbsPercentage: number
  fatPercentage: number
}

export interface LogFoodRequest {
  nutritionPlanId: string
  userId: string
  logDate: string
  logTime?: string
  mealType?: string
  inputMethod: 'photo' | 'audio' | 'text' | 'manual'
  inputData: any
}

export interface LogFoodResponse {
  success: boolean
  data?: any
  warnings?: string[]
  errors?: string[]
}
