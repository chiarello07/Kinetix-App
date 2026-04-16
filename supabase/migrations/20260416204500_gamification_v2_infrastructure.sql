DO $$
BEGIN
  -- user_badges
  CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    badge_type VARCHAR(50) NOT NULL,
    earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_type)
  );

  CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);
  CREATE INDEX IF NOT EXISTS idx_user_badges_badge_type ON public.user_badges(badge_type);
  CREATE INDEX IF NOT EXISTS idx_user_badges_earned_at ON public.user_badges(earned_at DESC);

  -- user_points
  CREATE TABLE IF NOT EXISTS public.user_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    point_type VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL CHECK (amount > 0),
    reason TEXT,
    earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_user_points_user_id ON public.user_points(user_id);
  CREATE INDEX IF NOT EXISTS idx_user_points_point_type ON public.user_points(point_type);
  CREATE INDEX IF NOT EXISTS idx_user_points_earned_at ON public.user_points(earned_at DESC);

  -- leaderboards
  CREATE TABLE IF NOT EXISTS public.leaderboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_name VARCHAR(255),
    user_avatar TEXT,
    rank INTEGER NOT NULL,
    total_points INTEGER NOT NULL DEFAULT 0,
    period VARCHAR(20) NOT NULL CHECK (period IN ('weekly', 'monthly', 'all_time')),
    workouts_completed INTEGER DEFAULT 0,
    meals_logged INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    nutrition_adherence DECIMAL(5,2) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, period)
  );

  CREATE INDEX IF NOT EXISTS idx_leaderboards_rank ON public.leaderboards(rank);
  CREATE INDEX IF NOT EXISTS idx_leaderboards_period ON public.leaderboards(period);
  CREATE INDEX IF NOT EXISTS idx_leaderboards_total_points ON public.leaderboards(total_points DESC);
  CREATE INDEX IF NOT EXISTS idx_leaderboards_user_id ON public.leaderboards(user_id);

  -- social_connections
  CREATE TABLE IF NOT EXISTS public.social_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    friend_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'accepted', 'blocked')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    CHECK (user_id != friend_id)
  );

  CREATE INDEX IF NOT EXISTS idx_social_connections_user_id ON public.social_connections(user_id);
  CREATE INDEX IF NOT EXISTS idx_social_connections_friend_id ON public.social_connections(friend_id);
  CREATE INDEX IF NOT EXISTS idx_social_connections_status ON public.social_connections(status);

  -- challenges
  CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    rules TEXT,
    reward_points INTEGER NOT NULL DEFAULT 100,
    reward_badge VARCHAR(50),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('consistency', 'strength', 'endurance', 'posture', 'nutrition', 'balanced')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CHECK (end_date > start_date)
  );

  CREATE INDEX IF NOT EXISTS idx_challenges_start_date ON public.challenges(start_date);
  CREATE INDEX IF NOT EXISTS idx_challenges_end_date ON public.challenges(end_date);
  CREATE INDEX IF NOT EXISTS idx_challenges_is_active ON public.challenges(is_active);
  CREATE INDEX IF NOT EXISTS idx_challenges_category ON public.challenges(category);

  -- challenge_participations
  CREATE TABLE IF NOT EXISTS public.challenge_participations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    progress_details JSONB,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, challenge_id)
  );

  CREATE INDEX IF NOT EXISTS idx_challenge_participations_user_id ON public.challenge_participations(user_id);
  CREATE INDEX IF NOT EXISTS idx_challenge_participations_challenge_id ON public.challenge_participations(challenge_id);
  CREATE INDEX IF NOT EXISTS idx_challenge_participations_completed_at ON public.challenge_participations(completed_at);

  -- RLS
  ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.leaderboards ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.social_connections ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.challenge_participations ENABLE ROW LEVEL SECURITY;

  DROP POLICY IF EXISTS "auth_all_user_badges" ON public.user_badges;
  CREATE POLICY "auth_all_user_badges" ON public.user_badges FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

  DROP POLICY IF EXISTS "auth_all_user_points" ON public.user_points;
  CREATE POLICY "auth_all_user_points" ON public.user_points FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

  DROP POLICY IF EXISTS "auth_all_leaderboards" ON public.leaderboards;
  CREATE POLICY "auth_all_leaderboards" ON public.leaderboards FOR SELECT TO authenticated USING (true);
  
  DROP POLICY IF EXISTS "auth_manage_leaderboards" ON public.leaderboards;
  CREATE POLICY "auth_manage_leaderboards" ON public.leaderboards FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

  DROP POLICY IF EXISTS "auth_all_social_connections" ON public.social_connections;
  CREATE POLICY "auth_all_social_connections" ON public.social_connections FOR ALL TO authenticated USING (user_id = auth.uid() OR friend_id = auth.uid()) WITH CHECK (user_id = auth.uid() OR friend_id = auth.uid());

  DROP POLICY IF EXISTS "auth_select_challenges" ON public.challenges;
  CREATE POLICY "auth_select_challenges" ON public.challenges FOR SELECT TO authenticated USING (true);

  DROP POLICY IF EXISTS "auth_all_challenge_participations" ON public.challenge_participations;
  CREATE POLICY "auth_all_challenge_participations" ON public.challenge_participations FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

  -- Stored procedure for updating leaderboards
  CREATE OR REPLACE FUNCTION public.update_all_leaderboards()
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $func$
  DECLARE
    p_period VARCHAR;
    v_start_date TIMESTAMPTZ;
  BEGIN
    FOREACH p_period IN ARRAY ARRAY['weekly', 'monthly', 'all_time']
    LOOP
      IF p_period = 'weekly' THEN
        v_start_date := NOW() - INTERVAL '7 days';
      ELSIF p_period = 'monthly' THEN
        v_start_date := NOW() - INTERVAL '1 month';
      ELSE
        v_start_date := '2020-01-01'::TIMESTAMPTZ;
      END IF;

      INSERT INTO public.leaderboards (user_id, rank, total_points, period, updated_at)
      SELECT 
        up.user_id,
        ROW_NUMBER() OVER(ORDER BY SUM(up.amount) DESC) as rank,
        SUM(up.amount) as total_points,
        p_period,
        NOW()
      FROM public.user_points up
      WHERE up.earned_at >= v_start_date
      GROUP BY up.user_id
      ON CONFLICT (user_id, period) DO UPDATE 
      SET rank = EXCLUDED.rank, 
          total_points = EXCLUDED.total_points, 
          updated_at = EXCLUDED.updated_at;
    END LOOP;
  END;
  $func$;

END $$;
