import { supabase } from '@/lib/supabase/client'

export async function generateNutritionPlan(nutritionProfileId: string) {
  const { data: profile, error: profileErr } = await supabase
    .from('nutrition_profiles')
    .select('*')
    .eq('id', nutritionProfileId)
    .single()

  if (profileErr || !profile) throw new Error('Profile not found')

  const { data: assessments } = await supabase
    .from('nutrition_assessments')
    .select('*')
    .eq('nutrition_profile_id', nutritionProfileId)

  const birthDate = profile.date_of_birth ? new Date(profile.date_of_birth) : new Date()
  const age = Math.floor((new Date().getTime() - birthDate.getTime()) / 3.15576e10) || 30

  const weight = Number(profile.current_weight_kg) || 70
  const height = Number(profile.height_cm) || 170
  let bmr = 0
  if (profile.gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }

  let baseFactor = 1.2
  const exerciseDays = Number(profile.exercise_days_per_week) || 0
  if (exerciseDays >= 1 && exerciseDays <= 3) baseFactor = 1.375
  else if (exerciseDays >= 4 && exerciseDays <= 5) baseFactor = 1.55
  else if (exerciseDays >= 6) baseFactor = 1.725

  if (profile.work_activity_level === 'heavy') baseFactor += 0.1
  else if (profile.work_activity_level === 'moderate') baseFactor += 0.05

  const activityFactor = Math.min(baseFactor, 1.9)
  const tdee = bmr * activityFactor

  const goal = profile.primary_goal || 'health'
  let targetCalories = tdee
  if (goal === 'muscle_gain') targetCalories += 400
  else if (goal === 'fat_loss') targetCalories -= 400
  else if (goal === 'definition') targetCalories -= 250

  const metabolic = assessments?.find((a) => a.assessment_type === 'metabolic')
  let metabolicAdjustment = 0
  if (metabolic && Number(metabolic.score_percentage || 0) > 75) {
    targetCalories *= 0.85
    metabolicAdjustment = -15
  }

  let proteinGrams = weight * 1.6
  if (goal === 'muscle_gain') proteinGrams = weight * 2.0
  else if (goal === 'fat_loss') proteinGrams = weight * 2.2
  else if (goal === 'definition') proteinGrams = weight * 1.8
  else if (goal === 'health' || goal === 'longevity') proteinGrams = weight * 1.2

  const proteinCalories = proteinGrams * 4
  const remainingCalories = Math.max(0, targetCalories - proteinCalories)

  let carbsPercentage = 0.55
  let fatPercentage = 0.45
  if (goal === 'muscle_gain') {
    carbsPercentage = 0.6
    fatPercentage = 0.4
  } else if (goal === 'fat_loss') {
    carbsPercentage = 0.5
    fatPercentage = 0.5
  }

  const carbsGrams = (remainingCalories * carbsPercentage) / 4
  const fatGrams = (remainingCalories * fatPercentage) / 9

  let water = weight * 0.035
  if (exerciseDays >= 4) water += 0.5

  const { data: plan, error: planErr } = await supabase
    .from('nutrition_plans')
    .insert({
      nutrition_profile_id: nutritionProfileId,
      plan_name: `Plano Personalizado - ${goal}`,
      plan_description: 'Plano gerado com base nas suas avaliações.',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      duration_days: 90,
      primary_goal: goal,
      basal_metabolic_rate: bmr,
      total_daily_energy_expenditure: tdee,
      activity_factor: activityFactor,
      target_calories: targetCalories,
      protein_grams: proteinGrams,
      carbs_grams: carbsGrams,
      fat_grams: fatGrams,
      water_liters_per_day: water,
      meals_per_day: profile.meals_per_day || 4,
      metabolic_adjustment: metabolicAdjustment,
      status: 'active',
    })
    .select()
    .single()

  if (planErr || !plan) throw new Error('Failed to create nutrition plan: ' + planErr.message)

  const mealsCount = Number(profile.meals_per_day) || 4
  const mealTypes = ['breakfast', 'lunch', 'snack', 'dinner', 'supper']

  const mealsToInsert = Array.from({ length: mealsCount }).map((_, i) => {
    const mealCal = targetCalories / mealsCount
    const mealPro = proteinGrams / mealsCount
    const mealCarb = carbsGrams / mealsCount
    const mealFat = fatGrams / mealsCount

    return {
      nutrition_plan_id: plan.id,
      meal_type: mealTypes[i] || 'snack',
      meal_number: i + 1,
      calories: mealCal,
      protein_grams: mealPro,
      carbs_grams: mealCarb,
      fat_grams: mealFat,
      meal_options: [
        {
          optionNumber: 1,
          foods: [
            {
              foodName: 'Opção Recomendada Principal',
              quantity: 1,
              unit: 'porção',
              calories: mealCal,
              protein: mealPro,
              carbs: mealCarb,
              fat: mealFat,
            },
          ],
          calories: mealCal,
          macros: { protein: mealPro, carbs: mealCarb, fat: mealFat },
        },
        {
          optionNumber: 2,
          foods: [
            {
              foodName: 'Opção Alternativa (Prática)',
              quantity: 1,
              unit: 'porção',
              calories: mealCal,
              protein: mealPro,
              carbs: mealCarb,
              fat: mealFat,
            },
          ],
          calories: mealCal,
          macros: { protein: mealPro, carbs: mealCarb, fat: mealFat },
        },
        {
          optionNumber: 3,
          foods: [
            {
              foodName: 'Opção Alternativa (Econômica)',
              quantity: 1,
              unit: 'porção',
              calories: mealCal,
              protein: mealPro,
              carbs: mealCarb,
              fat: mealFat,
            },
          ],
          calories: mealCal,
          macros: { protein: mealPro, carbs: mealCarb, fat: mealFat },
        },
      ],
    }
  })

  await supabase.from('meal_plans').insert(mealsToInsert)

  const supplements = []
  if (goal === 'muscle_gain') {
    supplements.push({
      nutrition_plan_id: plan.id,
      supplement_name: 'Creatina Monohidrato',
      supplement_type: 'performance',
      dosage: 5,
      dosage_unit: 'g',
      frequency: 'daily',
      rationale: 'Melhora força e ganho de massa muscular',
      scientific_reference: 'ISSN (2017)',
      recommended: true,
    })
    supplements.push({
      nutrition_plan_id: plan.id,
      supplement_name: 'Whey Protein',
      supplement_type: 'performance',
      dosage: 25,
      dosage_unit: 'g',
      frequency: 'post-workout',
      rationale: 'Suplementação de proteína pós-treino',
      scientific_reference: 'ISSN (2017)',
      recommended: true,
    })
  }

  if (metabolic && Number(metabolic.score_percentage || 0) > 75) {
    supplements.push({
      nutrition_plan_id: plan.id,
      supplement_name: 'Vitamina D3',
      supplement_type: 'vitamin',
      dosage: 2000,
      dosage_unit: 'UI',
      frequency: 'daily',
      rationale: 'Deficiência comum em disfunção metabólica',
      scientific_reference: 'Endocrine Society (2011)',
      recommended: true,
    })
  }

  const dysbiosis = assessments?.find((a) => a.assessment_type === 'dysbiosis')
  if (dysbiosis && Number(dysbiosis.score_percentage || 0) > 50) {
    supplements.push({
      nutrition_plan_id: plan.id,
      supplement_name: 'Probióticos',
      supplement_type: 'herb',
      dosage: 10,
      dosage_unit: 'billion CFU',
      frequency: 'daily',
      rationale: 'Restaurar microbiota intestinal',
      scientific_reference: 'Vini (Especialista em Nutrição)',
      recommended: true,
    })
  }

  if (supplements.length > 0) {
    await supabase.from('supplementation_plans').insert(supplements)
  }

  return plan
}
