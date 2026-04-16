import { supabase } from '@/lib/supabase/client'

export const calculateCaloriesBurned = (
  totalTimeMinutes: number,
  userWeight: number,
  borgRPE: number,
) => {
  const baseFactor = 0.1
  const rpeFactor: Record<number, number> = {
    0: 0.3,
    1: 0.4,
    2: 0.5,
    3: 0.6,
    4: 0.8,
    5: 1.0,
    6: 1.1,
    7: 1.25,
    8: 1.4,
    9: 1.5,
    10: 1.6,
  }
  return Math.round(totalTimeMinutes * userWeight * baseFactor * (rpeFactor[borgRPE] || 1.0))
}

export const calculateCalorieBalance = (burned: number, consumed: number) => {
  return burned - consumed
}

export const getBalanceStatus = (balance: number) => {
  if (balance < -500) return 'deficit'
  if (balance > 500) return 'surplus'
  return 'maintenance'
}

export const calculateMacroAdherence = (intake: any, target: any) => {
  return {
    protein: target.protein > 0 ? Math.round((intake.protein / target.protein) * 100) : 0,
    carbs: target.carbs > 0 ? Math.round((intake.carbs / target.carbs) * 100) : 0,
    fat: target.fat > 0 ? Math.round((intake.fat / target.fat) * 100) : 0,
  }
}

export const generateNutritionRecommendation = (caloriesBurned: number, macrosAdherence: any) => {
  let recommendation = ''
  if (caloriesBurned > 400) {
    recommendation += `Você queimou ${caloriesBurned} kcal. Considere consumir uma refeição com ~${Math.round(caloriesBurned * 1.2)} kcal nos próximos 30-60 min para otimizar recuperação. `
  }
  if (macrosAdherence.protein < 70) {
    recommendation +=
      'Sua ingestão de proteína está baixa. Aumente para otimizar a recuperação muscular. '
  }
  if (macrosAdherence.carbs < 70) {
    recommendation += 'Sua ingestão de carboidrato está baixa. Aumente para repor energia. '
  }
  return recommendation || 'Continue mantendo uma boa aderência aos macros!'
}

export const getDailyNutritionSummary = async (userId: string) => {
  if (!userId) return mockNutritionData()

  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase
    .from('daily_summaries')
    .select('*')
    .eq('user_id', userId)
    .eq('summary_date', today)
    .single()

  if (data) {
    return {
      caloriesConsumed: Number(data.total_calories_consumed || 0),
      macrosIntake: {
        protein: Number(data.total_protein_consumed || 0),
        carbs: Number(data.total_carbs_consumed || 0),
        fat: Number(data.total_fat_consumed || 0),
      },
      macrosTarget: {
        protein: Number(data.target_protein || 150),
        carbs: Number(data.target_carbs || 200),
        fat: Number(data.target_fat || 70),
      },
    }
  }

  return mockNutritionData()
}

const mockNutritionData = () => ({
  caloriesConsumed: 1800,
  macrosIntake: { protein: 120, carbs: 180, fat: 60 },
  macrosTarget: { protein: 150, carbs: 200, fat: 70 },
})
