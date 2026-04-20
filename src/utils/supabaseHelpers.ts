import { supabase } from '@/lib/supabase/client'

export async function saveNutritionProfileStep(
  userId: string,
  nutritionProfileId: string,
  stepNumber: number,
  stepData: Record<string, any>,
) {
  // 1. Atualizar nutrition_profiles com os dados do passo
  const { error: updateError } = await supabase
    .from('nutrition_profiles')
    .update(stepData)
    .eq('id', nutritionProfileId)
    .eq('user_id', userId)

  if (updateError) {
    console.error('Erro ao salvar nutrition_profile:', updateError)
    throw updateError
  }

  // 2. Criar ou atualizar nutrition_onboarding_steps
  const { error: upsertError } = await supabase.from('nutrition_onboarding_steps').upsert(
    {
      nutrition_profile_id: nutritionProfileId,
      step_number: stepNumber,
      step_name: `Step ${stepNumber} Complete`,
      completed: true,
      completed_at: new Date().toISOString(),
      data: stepData,
      is_valid: true,
    },
    {
      onConflict: 'nutrition_profile_id,step_number',
    },
  )

  if (upsertError) {
    console.error('Erro ao salvar onboarding step:', upsertError)
    throw upsertError
  }

  return true
}
