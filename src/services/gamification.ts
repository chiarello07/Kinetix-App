import { supabase } from '@/lib/supabase/client'

export async function getGamificationProfile(userId: string) {
  let { data: profile } = await supabase
    .from('gamification_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (!profile) {
    const { data: newProfile } = await supabase
      .from('gamification_profiles')
      .insert({ user_id: userId })
      .select()
      .single()
    profile = newProfile
  }
  return profile
}

export async function addPoints(userId: string, points: number) {
  const profile = await getGamificationProfile(userId)
  const newPoints = profile.total_points + points
  const newLevel = Math.floor(newPoints / 1000) + 1

  await supabase
    .from('gamification_profiles')
    .update({
      total_points: newPoints,
      experience_points: newPoints,
      level: newLevel,
    })
    .eq('user_id', userId)
}
