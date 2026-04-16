import { ProgressMetrics, MonthlyReport } from './types'

export const mockMetrics: ProgressMetrics = {
  period: { startDate: '2026-03-01', endDate: '2026-03-31', label: 'Últimos 30 dias' },
  workout: {
    totalWorkouts: 12,
    workoutsCompleted: 12,
    completionRate: 100,
    totalReps: 5000,
    totalWeight: 50000,
    totalTime: 16200,
    caloriesBurned: 3500,
    avgBorgRPE: 7.2,
  },
  nutrition: {
    mealsLogged: 120,
    mealsCompleted: 120,
    completionRate: 100,
    caloriesConsumed: 42000,
    proteinConsumed: 1200,
    carbsConsumed: 5400,
    fatConsumed: 1400,
    adherenceRate: 75,
  },
  calorieBalance: {
    burned: 3500,
    consumed: 42000,
    balance: 38500,
    status: 'surplus',
    message: 'Você está em superávit calórico. Ideal para ganho muscular!',
  },
  lastUpdated: new Date().toISOString(),
}

export const mockGraphs = {
  volumeWeekly: {
    type: 'volume',
    period: 'weekly',
    data: [
      { label: 'Sem 1', value: 250 },
      { label: 'Sem 2', value: 280 },
      { label: 'Sem 3', value: 310 },
      { label: 'Sem 4', value: 360 },
    ],
    metadata: { min: 250, max: 360, avg: 300, trend: 'up' },
  },
  weightWeekly: {
    type: 'weight',
    period: 'weekly',
    data: [
      { label: 'Sem 1', value: 2500 },
      { label: 'Sem 2', value: 2800 },
      { label: 'Sem 3', value: 3100 },
      { label: 'Sem 4', value: 3600 },
    ],
    metadata: { min: 2500, max: 3600, avg: 3000, trend: 'up' },
  },
  adherenceWeekly: {
    type: 'adherence',
    period: 'weekly',
    data: [
      { label: 'Sem 1', protein: 73, carbs: 70, fat: 80 },
      { label: 'Sem 2', protein: 74, carbs: 72, fat: 81 },
      { label: 'Sem 3', protein: 75, carbs: 75, fat: 82 },
      { label: 'Sem 4', protein: 77, carbs: 78, fat: 85 },
    ],
    metadata: { min: 73, max: 77, avg: 75, trend: 'up' },
  },
  calorieBalanceDaily: {
    type: 'calorieBalance',
    period: 'daily',
    data: [
      { label: 'D1', value: 500 },
      { label: 'D2', value: -200 },
      { label: 'D3', value: 300 },
      { label: 'D4', value: 600 },
      { label: 'D5', value: -100 },
      { label: 'D6', value: 400 },
      { label: 'D7', value: 800 },
    ],
    metadata: { min: -200, max: 800, avg: 300, trend: 'stable' },
  },
}

export const mockReport: MonthlyReport = {
  userId: 'user-1',
  period: { startDate: '2026-03-01', endDate: '2026-03-31', label: 'Março 2026' },
  workout: mockMetrics.workout,
  nutrition: mockMetrics.nutrition,
  calorieBalance: {
    totalBurned: 3500,
    totalConsumed: 42000,
    totalBalance: 38500,
    status: 'surplus',
    message: 'Superávit calórico ideal para ganho muscular',
  },
  weeklyBreakdown: [
    {
      week: 1,
      startDate: '2026-03-01',
      endDate: '2026-03-07',
      workout: {
        totalReps: 250,
        totalWeight: 2500,
        totalTime: 120,
        caloriesBurned: 800,
        avgBorgRPE: 6.5,
        workoutsCompleted: 3,
      },
      nutrition: {
        caloriesConsumed: 10500,
        proteinConsumed: 300,
        carbsConsumed: 1350,
        fatConsumed: 350,
        adherenceRate: 73,
        mealsCompleted: 30,
      },
      calorieBalance: 9700,
    },
    {
      week: 2,
      startDate: '2026-03-08',
      endDate: '2026-03-14',
      workout: {
        totalReps: 280,
        totalWeight: 2800,
        totalTime: 135,
        caloriesBurned: 850,
        avgBorgRPE: 6.8,
        workoutsCompleted: 3,
      },
      nutrition: {
        caloriesConsumed: 10500,
        proteinConsumed: 300,
        carbsConsumed: 1350,
        fatConsumed: 350,
        adherenceRate: 74,
        mealsCompleted: 30,
      },
      calorieBalance: 9650,
    },
  ],
  comparison: {
    repsChange: 44,
    weightChange: 44,
    timeChange: 12.5,
    caloriesBurnedChange: 18.75,
    rpeChange: 15.4,
    nutritionAdherenceChange: 5.5,
    calorieBalanceChange: -0.5,
  },
  insights: [
    {
      type: 'positive',
      icon: '✅',
      message: 'Excelente progressão de volume! Você aumentou 44% em 4 semanas',
      category: 'workout',
    },
    {
      type: 'positive',
      icon: '✅',
      message: 'Aderência nutricional excelente: 75% em média',
      category: 'nutrition',
    },
    {
      type: 'positive',
      icon: '✅',
      message: 'Seu balanço calórico está ideal para ganho muscular',
      category: 'integrated',
    },
    {
      type: 'suggestion',
      icon: '💡',
      message: 'Aumente proteína em 10% para otimizar ganho muscular',
      category: 'nutrition',
    },
  ],
  generatedAt: new Date().toISOString(),
}
