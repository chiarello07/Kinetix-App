ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_nutrition_profile_id uuid;
  v_dob date := '1990-01-01'::date;
  v_name text := '';
  v_avatar text := '';
BEGIN
  -- Safely parse date_of_birth
  BEGIN
    IF NEW.raw_user_meta_data->>'birth_date' IS NOT NULL AND NEW.raw_user_meta_data->>'birth_date' != '' THEN
      v_dob := (NEW.raw_user_meta_data->>'birth_date')::date;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    v_dob := '1990-01-01'::date;
  END;

  IF NEW.raw_user_meta_data->>'full_name' IS NOT NULL THEN
    v_name := NEW.raw_user_meta_data->>'full_name';
  END IF;

  IF NEW.raw_user_meta_data->>'avatar_url' IS NOT NULL THEN
    v_avatar := NEW.raw_user_meta_data->>'avatar_url';
  END IF;

  -- Create profile
  INSERT INTO public.profiles (id, is_premium, email, name, avatar_url)
  VALUES (NEW.id, false, NEW.email, v_name, v_avatar)
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

  -- Create nutrition_profile only if it doesn't exist
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

    -- Create onboarding step only if we just created the nutrition_profile
    IF v_nutrition_profile_id IS NOT NULL THEN
      INSERT INTO public.nutrition_onboarding_steps (
        nutrition_profile_id,
        step_number,
        step_name,
        completed,
        skipped,
        is_valid
      )
      VALUES (
        v_nutrition_profile_id,
        1,
        'Dados Pessoais',
        false,
        false,
        false
      );
    END IF;
  END IF;

  -- Create gamification profile
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
$function$;
