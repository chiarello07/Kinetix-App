import { supabase } from '@/lib/supabase/client'

export async function awardBadge(
  userId: string,
  badgeType: string,
  points: number = 0,
  metadata: any = {},
) {
  try {
    const { data: existing } = await supabase
      .from('user_badges' as any)
      .select('id')
      .eq('user_id', userId)
      .eq('badge_type', badgeType)
      .single()

    if (!existing) {
      await supabase.from('user_badges' as any).insert({
        user_id: userId,
        badge_type: badgeType,
        metadata,
      })

      if (points > 0) {
        await awardPoints(
          userId,
          `${badgeType}_reward`,
          points,
          `Recompensa por conquista: ${badgeType}`,
        )
      }
    }
  } catch (error) {
    console.error('Failed to award badge', error)
  }
}

export async function awardPoints(
  userId: string,
  pointType: string,
  amount: number,
  reason: string,
) {
  try {
    await supabase.from('user_points' as any).insert({
      user_id: userId,
      point_type: pointType,
      amount,
      reason,
    })
  } catch (error) {
    console.error('Failed to award points', error)
  }
}

export async function processWorkoutGamification(
  userId: string,
  sessionId: string,
  borgRPE: number,
) {
  try {
    const { count: workoutCount } = await supabase
      .from('workout_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (workoutCount === 1) await awardBadge(userId, 'first_workout', 50)
    if (workoutCount === 10) await awardBadge(userId, '10_workouts', 100)
    if (workoutCount === 50) await awardBadge(userId, '50_workouts', 250)
    if (workoutCount === 100) await awardBadge(userId, '100_workouts', 500)

    if (borgRPE >= 8) {
      await awardPoints(userId, 'workout_with_high_borg', 25, `Treino intenso (RPE ${borgRPE})`)
    }

    await awardPoints(userId, 'workout_completed', 50, `Treino completado`)
  } catch (error) {
    console.error('Error processing workout gamification', error)
  }
}

export async function processFoodLogGamification(userId: string, logId: string) {
  try {
    const { count: mealsLogged } = await supabase
      .from('food_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (mealsLogged === 1) await awardBadge(userId, 'first_meal_logged', 50)
    if (mealsLogged === 30) await awardBadge(userId, '30_meals_logged', 100)
    if (mealsLogged === 100) await awardBadge(userId, '100_meals_logged', 250)

    await awardPoints(userId, 'meal_logged', 10, `Refeição registrada`)
  } catch (error) {
    console.error('Error processing food log gamification', error)
  }
}
