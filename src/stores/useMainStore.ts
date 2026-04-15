import { useState, useEffect } from 'react'

export type Meal = {
  id: string
  type: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export type AppState = {
  caloriesGoal: number
  proteinGoal: number
  carbsGoal: number
  fatGoal: number
  meals: Meal[]
  waterGlasses: number
  steps: number
  weight: number
}

const initialState: AppState = {
  caloriesGoal: 2200,
  proteinGoal: 150,
  carbsGoal: 250,
  fatGoal: 65,
  meals: [
    {
      id: '1',
      type: 'Café da Manhã',
      name: 'Ovos Mexidos (3 und)',
      calories: 210,
      protein: 18,
      carbs: 2,
      fat: 15,
    },
    {
      id: '2',
      type: 'Almoço',
      name: 'Frango com Batata Doce',
      calories: 450,
      protein: 40,
      carbs: 50,
      fat: 10,
    },
  ],
  waterGlasses: 4,
  steps: 6500,
  weight: 78.5,
}

let state: AppState = { ...initialState }
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export default function useMainStore() {
  const [snap, setSnap] = useState(state)

  useEffect(() => {
    const listener = () => setSnap({ ...state })
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  const actions = {
    addMeal: (meal: Omit<Meal, 'id'>) => {
      state.meals = [...state.meals, { ...meal, id: Math.random().toString(36).substring(2, 9) }]
      notify()
    },
    removeMeal: (id: string) => {
      state.meals = state.meals.filter((m) => m.id !== id)
      notify()
    },
    addWater: () => {
      state.waterGlasses += 1
      notify()
    },
    updateWeight: (weight: number) => {
      state.weight = weight
      notify()
    },
    updateGoals: (goals: Partial<AppState>) => {
      state = { ...state, ...goals }
      notify()
    },
  }

  // Computed values
  const caloriesConsumed = snap.meals.reduce((sum, meal) => sum + meal.calories, 0)
  const proteinConsumed = snap.meals.reduce((sum, meal) => sum + meal.protein, 0)
  const carbsConsumed = snap.meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const fatConsumed = snap.meals.reduce((sum, meal) => sum + meal.fat, 0)
  const caloriesRemaining = Math.max(0, snap.caloriesGoal - caloriesConsumed)

  return {
    ...snap,
    ...actions,
    caloriesConsumed,
    proteinConsumed,
    carbsConsumed,
    fatConsumed,
    caloriesRemaining,
  }
}
