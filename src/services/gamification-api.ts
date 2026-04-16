import { supabase } from '@/lib/supabase/client'

export const gamificationApi = {
  getBadges: async (userId: string) => {
    return supabase
      .from('user_badges' as any)
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })
  },
  getPoints: async (userId: string) => {
    return supabase
      .from('user_points' as any)
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })
  },
  getLeaderboards: async (period: 'weekly' | 'monthly' | 'all_time') => {
    return supabase
      .from('leaderboards' as any)
      .select('*')
      .eq('period', period)
      .order('rank', { ascending: true })
  },
  getChallenges: async () => {
    return supabase
      .from('challenges' as any)
      .select('*')
      .eq('is_active', true)
      .order('start_date', { ascending: false })
  },
  joinChallenge: async (userId: string, challengeId: string) => {
    return supabase.from('challenge_participations' as any).insert({
      user_id: userId,
      challenge_id: challengeId,
      progress: 0,
    })
  },
  getFriends: async (userId: string, status = 'accepted') => {
    return supabase
      .from('social_connections' as any)
      .select('*, friend:friend_id(*)')
      .eq('user_id', userId)
      .eq('status', status)
  },
  addFriend: async (userId: string, friendId: string) => {
    return supabase.from('social_connections' as any).insert({
      user_id: userId,
      friend_id: friendId,
      status: 'pending',
    })
  },
}
