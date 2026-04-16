import { supabase } from '@/lib/supabase/client'
import { generateNutritionPlan } from './nutrition-plan'

export async function regeneratePlans(
  userId: string,
  nutritionProfileId: string,
  newProfileData: any,
) {
  // 1. Update the nutrition_profile in supabase
  const { error: profileError } = await supabase
    .from('nutrition_profiles')
    .update(newProfileData)
    .eq('id', nutritionProfileId)

  if (profileError) throw profileError

  // 2. Archive old plans
  await supabase
    .from('nutrition_plans')
    .update({ status: 'archived' })
    .eq('nutrition_profile_id', nutritionProfileId)

  // 3. Generate new nutrition plan
  await generateNutritionPlan(nutritionProfileId)

  // Note: Training plan generation would be called here.
  // Assuming workout generator handles its own logic.

  return { success: true }
}
