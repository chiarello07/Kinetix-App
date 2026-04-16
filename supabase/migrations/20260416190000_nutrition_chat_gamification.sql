DO $$
BEGIN
  -- Create Gamification Profiles
  CREATE TABLE IF NOT EXISTS public.gamification_profiles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
      total_points INTEGER DEFAULT 0,
      points_this_week INTEGER DEFAULT 0,
      points_this_month INTEGER DEFAULT 0,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      experience_points INTEGER DEFAULT 0,
      badges JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Create Chat Messages
  CREATE TABLE IF NOT EXISTS public.nutrition_chat_messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      role VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );
END $$;

DROP POLICY IF EXISTS "auth_all_gamification_profiles" ON public.gamification_profiles;
CREATE POLICY "auth_all_gamification_profiles" ON public.gamification_profiles FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "auth_all_nutrition_chat_messages" ON public.nutrition_chat_messages;
CREATE POLICY "auth_all_nutrition_chat_messages" ON public.nutrition_chat_messages FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

ALTER TABLE public.gamification_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_chat_messages ENABLE ROW LEVEL SECURITY;
