import { supabase } from '@/lib/supabase/client'
import type { LogFoodRequest, LogFoodResponse } from '@/lib/types/food-logger'

export async function deleteFoodLog(logId: string, userId: string, logDate: string): Promise<void> {
  const { data: log } = await supabase.from('food_logs').select('*').eq('id', logId).single()
  if (!log) return

  await supabase.from('food_logs').delete().eq('id', logId)

  const { data: summary } = await supabase
    .from('daily_summaries')
    .select('*')
    .eq('user_id', userId)
    .eq('summary_date', logDate)
    .single()
  if (summary) {
    const updatedCals = Math.max(
      0,
      Number(summary.total_calories_consumed) - Number(log.total_calories),
    )
    const updatedProt = Math.max(
      0,
      Number(summary.total_protein_consumed) - Number(log.total_protein_grams),
    )
    const updatedCarbs = Math.max(
      0,
      Number(summary.total_carbs_consumed) - Number(log.total_carbs_grams),
    )
    const updatedFat = Math.max(0, Number(summary.total_fat_consumed) - Number(log.total_fat_grams))

    const calsRemaining = Number(summary.target_calories) - updatedCals
    const protRemaining = Number(summary.target_protein) - updatedProt
    const carbsRemaining = Number(summary.target_carbs) - updatedCarbs
    const fatRemaining = Number(summary.target_fat) - updatedFat

    const calsPct = (updatedCals / Number(summary.target_calories)) * 100
    const protPct = (updatedProt / Number(summary.target_protein)) * 100
    const carbsPct = (updatedCarbs / Number(summary.target_carbs)) * 100
    const fatPct = (updatedFat / Number(summary.target_fat)) * 100

    await supabase
      .from('daily_summaries')
      .update({
        total_calories_consumed: updatedCals,
        total_protein_consumed: updatedProt,
        total_carbs_consumed: updatedCarbs,
        total_fat_consumed: updatedFat,
        calories_remaining: calsRemaining,
        protein_remaining: protRemaining,
        carbs_remaining: carbsRemaining,
        fat_remaining: fatRemaining,
        calories_percentage: calsPct,
        protein_percentage: protPct,
        carbs_percentage: carbsPct,
        fat_percentage: fatPct,
        meals_logged: Math.max(0, Number(summary.meals_logged) - 1),
      })
      .eq('id', summary.id)
  }
}

export async function logFood(request: LogFoodRequest): Promise<LogFoodResponse> {
  // 1. Process Input (Mock AI for Photo, Audio, Text)
  let identifiedFoods: Array<{
    foodName: string
    quantity: number
    unit: string
    confidence: number
  }> = []

  if (request.inputMethod === 'photo') {
    identifiedFoods = [
      { foodName: 'Frango Grelhado', quantity: 150, unit: 'g', confidence: 0.92 },
      { foodName: 'Arroz Branco', quantity: 100, unit: 'g', confidence: 0.88 },
    ]
  } else if (request.inputMethod === 'audio') {
    identifiedFoods = [{ foodName: 'Ovo Cozido', quantity: 2, unit: 'unidade', confidence: 0.85 }]
  } else if (request.inputMethod === 'text') {
    const text = request.inputData.textInput || ''
    identifiedFoods = [
      { foodName: text.split(' ')[0] || 'Alimento', quantity: 100, unit: 'g', confidence: 0.9 },
    ]
  } else if (request.inputMethod === 'manual') {
    identifiedFoods = request.inputData.manualFoods || []
  }

  // 2. Find in DB and calculate macros
  const foodsWithNutrients = []
  for (const f of identifiedFoods) {
    const searchName = f.foodName.split(' ')[0]
    const { data: dbFood } = await supabase
      .from('food_database')
      .select('*')
      .ilike('food_name', `%${searchName}%`)
      .limit(1)
      .maybeSingle()

    if (dbFood) {
      let multiplier = f.quantity / 100
      if (f.unit === 'unidade') {
        multiplier = (f.quantity * 100) / 100 // Mock: 1 unit = 100g
      }

      foodsWithNutrients.push({
        foodId: dbFood.id,
        foodName: dbFood.food_name,
        quantity: f.quantity,
        unit: f.unit,
        calories: Number((dbFood.calories_per_100g * multiplier).toFixed(2)),
        protein: Number((dbFood.protein_per_100g * multiplier).toFixed(2)),
        carbs: Number((dbFood.carbs_per_100g * multiplier).toFixed(2)),
        fat: Number((dbFood.fat_per_100g * multiplier).toFixed(2)),
        confidence: f.confidence,
      })
    } else {
      // Fallback if not found in db (Mocking USDA search fallback)
      const mockCals = Math.floor(Math.random() * 200) + 50
      foodsWithNutrients.push({
        foodId: '00000000-0000-0000-0000-000000000000',
        foodName: f.foodName,
        quantity: f.quantity,
        unit: f.unit,
        calories: mockCals,
        protein: Math.floor(mockCals * 0.2),
        carbs: Math.floor(mockCals * 0.5),
        fat: Math.floor(mockCals * 0.3),
        confidence: f.confidence,
      })
    }
  }

  // 3. Calculate Totals
  const totalCalories = foodsWithNutrients.reduce((acc, f) => acc + f.calories, 0)
  const totalProtein = foodsWithNutrients.reduce((acc, f) => acc + f.protein, 0)
  const totalCarbs = foodsWithNutrients.reduce((acc, f) => acc + f.carbs, 0)
  const totalFat = foodsWithNutrients.reduce((acc, f) => acc + f.fat, 0)

  // 4. Insert Food Log
  const { data: foodLog, error: logError } = await supabase
    .from('food_logs')
    .insert({
      nutrition_plan_id: request.nutritionPlanId,
      user_id: request.userId,
      log_date: request.logDate,
      log_time: request.logTime || new Date().toISOString().split('T')[1].substring(0, 5),
      meal_type: request.mealType,
      input_method: request.inputMethod,
      input_data: request.inputData,
      foods: foodsWithNutrients,
      total_calories: totalCalories,
      total_protein_grams: totalProtein,
      total_carbs_grams: totalCarbs,
      total_fat_grams: totalFat,
      ai_confidence: foodsWithNutrients.length > 0 ? foodsWithNutrients[0].confidence : 1.0,
    })
    .select()
    .single()

  if (logError) throw new Error(`Erro ao salvar log: ${logError.message}`)

  // 5. Update Daily Summary
  let { data: summary } = await supabase
    .from('daily_summaries')
    .select('*')
    .eq('user_id', request.userId)
    .eq('summary_date', request.logDate)
    .maybeSingle()

  if (!summary) {
    const { data: plan } = await supabase
      .from('nutrition_plans')
      .select('*')
      .eq('id', request.nutritionPlanId)
      .single()

    const { data: newSummary, error: createError } = await supabase
      .from('daily_summaries')
      .insert({
        nutrition_plan_id: request.nutritionPlanId,
        user_id: request.userId,
        summary_date: request.logDate,
        target_calories: plan?.target_calories || 2000,
        target_protein: plan?.protein_grams || 150,
        target_carbs: plan?.carbs_grams || 200,
        target_fat: plan?.fat_grams || 60,
      })
      .select()
      .single()

    if (createError) throw new Error(`Erro ao criar resumo diário: ${createError.message}`)
    summary = newSummary
  }

  const updatedCals = Number(summary.total_calories_consumed) + totalCalories
  const updatedProt = Number(summary.total_protein_consumed) + totalProtein
  const updatedCarbs = Number(summary.total_carbs_consumed) + totalCarbs
  const updatedFat = Number(summary.total_fat_consumed) + totalFat

  const calsRemaining = Number(summary.target_calories) - updatedCals
  const protRemaining = Number(summary.target_protein) - updatedProt
  const carbsRemaining = Number(summary.target_carbs) - updatedCarbs
  const fatRemaining = Number(summary.target_fat) - updatedFat

  const calsPct = (updatedCals / Number(summary.target_calories)) * 100
  const protPct = (updatedProt / Number(summary.target_protein)) * 100
  const carbsPct = (updatedCarbs / Number(summary.target_carbs)) * 100
  const fatPct = (updatedFat / Number(summary.target_fat)) * 100

  const { error: updateError } = await supabase
    .from('daily_summaries')
    .update({
      total_calories_consumed: updatedCals,
      total_protein_consumed: updatedProt,
      total_carbs_consumed: updatedCarbs,
      total_fat_consumed: updatedFat,
      calories_remaining: calsRemaining,
      protein_remaining: protRemaining,
      carbs_remaining: carbsRemaining,
      fat_remaining: fatRemaining,
      calories_percentage: calsPct,
      protein_percentage: protPct,
      carbs_percentage: carbsPct,
      fat_percentage: fatPct,
      meals_logged: Number(summary.meals_logged) + 1,
    })
    .eq('id', summary.id)

  if (updateError) throw new Error(`Erro ao atualizar resumo: ${updateError.message}`)

  try {
    const { processFoodLogGamification } = await import('@/services/gamification-engine')
    await processFoodLogGamification(request.userId, foodLog.id)
  } catch (e) {
    console.error('Gamification error:', e)
  }

  // 6. Check warnings
  const warnings: string[] = []
  if (calsPct > 100)
    warnings.push(`Você ultrapassou sua meta de calorias em ${Math.round(calsPct - 100)}%`)
  if (protPct < 80 && summary.meals_logged > 2)
    warnings.push(`Você atingiu apenas ${Math.round(protPct)}% da meta de proteína até agora`)

  return {
    success: true,
    data: {
      foodLogId: foodLog.id,
      identifiedFoods: foodsWithNutrients,
      totalCalories,
      totalMacros: { protein: totalProtein, carbs: totalCarbs, fat: totalFat },
    },
    warnings,
  }
}
