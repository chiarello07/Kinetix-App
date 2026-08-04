-- 1. Enable RLS on profiles and nutrition_profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_profiles ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing RLS policies for profiles
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profiles" ON public.profiles;
DROP POLICY IF EXISTS "profiles_read_authenticated" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_authenticated" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profiles" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_authenticated" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_authenticated" ON public.profiles;

-- Create clean RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT TO authenticated USING (id = auth.uid());

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_delete_own" ON public.profiles
  FOR DELETE TO authenticated USING (id = auth.uid());

-- 3. Drop existing RLS policies for nutrition_profiles
DROP POLICY IF EXISTS "nutrition_profiles_select_own" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "Users can view their own nutrition_profiles" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "Users can access their own nutrition_profiles" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "nutrition_profiles_read_authenticated" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "nutrition_profiles_insert_own" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "Users can create their own nutrition_profiles" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "Users can insert their own nutrition_profiles" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "nutrition_profiles_insert_authenticated" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "nutrition_profiles_update_own" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "Users can update their own nutrition_profiles" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "nutrition_profiles_update_authenticated" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "nutrition_profiles_delete_authenticated" ON public.nutrition_profiles;

-- Create clean RLS policies for nutrition_profiles
CREATE POLICY "nutrition_profiles_select_own" ON public.nutrition_profiles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "nutrition_profiles_insert_own" ON public.nutrition_profiles
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "nutrition_profiles_update_own" ON public.nutrition_profiles
  FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "nutrition_profiles_delete_own" ON public.nutrition_profiles
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- 4. Update handle_new_user function to guarantee default records
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_nutrition_profile_id uuid;
  v_dob date := '1990-01-01'::date;
  v_name text;
BEGIN
  v_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1));

  BEGIN
    IF NEW.raw_user_meta_data->>'birth_date' IS NOT NULL AND NEW.raw_user_meta_data->>'birth_date' != '' THEN
      v_dob := (NEW.raw_user_meta_data->>'birth_date')::date;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    v_dob := '1990-01-01'::date;
  END;

  INSERT INTO public.profiles (id, email, name, is_premium)
  VALUES (NEW.id, NEW.email, v_name, false)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(public.profiles.name, EXCLUDED.name);

  IF NOT EXISTS (SELECT 1 FROM public.nutrition_profiles WHERE user_id = NEW.id) THEN
    INSERT INTO public.nutrition_profiles (
      user_id,
      gender,
      date_of_birth,
      height_cm,
      current_weight_kg,
      target_weight_kg,
      primary_goal,
      fitness_level,
      exercise_types,
      status,
      onboarding_completed
    )
    VALUES (
      NEW.id,
      'outros',
      v_dob,
      0,
      0,
      0,
      'saude',
      'sedentario',
      ARRAY[]::text[],
      'in_progress',
      false
    )
    RETURNING id INTO v_nutrition_profile_id;
  END IF;

  INSERT INTO public.gamification_profiles (
    user_id,
    total_points,
    level,
    badges
  )
  VALUES (
    NEW.id,
    0,
    1,
    '[]'::jsonb
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Reattach trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Backfill profiles and nutrition_profiles for existing auth users
DO $$
DECLARE
  u RECORD;
BEGIN
  FOR u IN (SELECT id, email, raw_user_meta_data FROM auth.users) LOOP
    INSERT INTO public.profiles (id, email, name, is_premium)
    VALUES (
      u.id,
      u.email,
      COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
      false
    )
    ON CONFLICT (id) DO NOTHING;

    IF NOT EXISTS (SELECT 1 FROM public.nutrition_profiles WHERE user_id = u.id) THEN
      INSERT INTO public.nutrition_profiles (
        user_id,
        gender,
        date_of_birth,
        height_cm,
        current_weight_kg,
        target_weight_kg,
        primary_goal,
        fitness_level,
        exercise_types,
        status,
        onboarding_completed
      )
      VALUES (
        u.id,
        'outros',
        '1990-01-01'::date,
        0,
        0,
        0,
        'saude',
        'sedentario',
        ARRAY[]::text[],
        'in_progress',
        false
      );
    END IF;
  END LOOP;
END $$;

-- 6. Seed user christianochiarello@gmail.com
DO $$
DECLARE
  seed_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'christianochiarello@gmail.com') THEN
    seed_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      seed_user_id,
      '00000000-0000-0000-0000-000000000000',
      'christianochiarello@gmail.com',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Christiano Chiarello", "full_name": "Christiano Chiarello"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL,
      '', '', ''
    );

    INSERT INTO public.profiles (id, email, name, is_premium)
    VALUES (seed_user_id, 'christianochiarello@gmail.com', 'Christiano Chiarello', true)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.nutrition_profiles (
      user_id, gender, date_of_birth, height_cm, current_weight_kg, target_weight_kg,
      primary_goal, fitness_level, exercise_types, status, onboarding_completed
    ) VALUES (
      seed_user_id, 'Masculino', '1990-01-01'::date, 178, 78, 75,
      'perda_peso', 'intermediario', ARRAY['musculacao', 'corrida']::text[], 'active', true
    ) ON CONFLICT DO NOTHING;
  END IF;
END $$;
