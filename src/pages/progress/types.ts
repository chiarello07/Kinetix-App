export interface ProgressMetrics {
  period: { startDate: string; endDate: string; label: string }
  workout: {
    totalWorkouts: number
    workoutsCompleted: number
    completionRate: number
    totalReps: number
    totalWeight: number
    totalTime: number
    caloriesBurned: number
    avgBorgRPE: number
  }
  nutrition: {
    mealsLogged: number
    mealsCompleted: number
    completionRate: number
    caloriesConsumed: number
    proteinConsumed: number
    carbsConsumed: number
    fatConsumed: number
    adherenceRate: number
  }
  calorieBalance: {
    burned: number
    consumed: number
    balance: number
    status: 'deficit' | 'maintenance' | 'surplus'
    message: string
  }
  lastUpdated: string
}

export interface MonthlyReport {
  userId: string
  period: { startDate: string; endDate: string; label: string }
  workout: ProgressMetrics['workout']
  nutrition: ProgressMetrics['nutrition']
  calorieBalance: {
    totalBurned: number
    totalConsumed: number
    totalBalance: number
    status: string
    message: string
  }
  weeklyBreakdown: Array<{
    week: number
    startDate: string
    endDate: string
    workout: any
    nutrition: any
    calorieBalance: number
  }>
  comparison: {
    repsChange: number
    weightChange: number
    timeChange: number
    caloriesBurnedChange: number
    rpeChange: number
    nutritionAdherenceChange: number
    calorieBalanceChange: number
  }
  insights: Array<{
    type: 'positive' | 'warning' | 'suggestion'
    icon: string
    message: string
    category: string
  }>
  generatedAt: string
}
