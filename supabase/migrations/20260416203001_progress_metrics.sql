DO $$
BEGIN
  -- Create progress_metrics table
  CREATE TABLE IF NOT EXISTS public.progress_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    week_of_year INTEGER,
    month_of_year INTEGER,
    year INTEGER,
    total_reps INTEGER DEFAULT 0,
    total_weight INTEGER DEFAULT 0,
    total_time INTEGER DEFAULT 0,
    calories_burned INTEGER DEFAULT 0,
    avg_borg_rpe DECIMAL(3,1),
    workouts_completed INTEGER DEFAULT 0,
    total_calories_consumed INTEGER DEFAULT 0,
    total_protein_consumed DECIMAL(7,2) DEFAULT 0,
    total_carbs_consumed DECIMAL(7,2) DEFAULT 0,
    total_fat_consumed DECIMAL(7,2) DEFAULT 0,
    nutrition_adherence_rate DECIMAL(3,1) DEFAULT 0,
    meals_completed INTEGER DEFAULT 0,
    calorie_balance INTEGER DEFAULT 0,
    balance_status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, date)
  );

  CREATE INDEX IF NOT EXISTS idx_progress_metrics_user_id ON public.progress_metrics(user_id);
  CREATE INDEX IF NOT EXISTS idx_progress_metrics_date ON public.progress_metrics(date DESC);

  -- Drop and recreate policies
  DROP POLICY IF EXISTS "Users can view their own progress metrics" ON public.progress_metrics;
  DROP POLICY IF EXISTS "Users can manage their own progress metrics" ON public.progress_metrics;

  ALTER TABLE public.progress_metrics ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "Users can view their own progress metrics" ON public.progress_metrics
    FOR SELECT TO authenticated USING (user_id = auth.uid());

  CREATE POLICY "Users can manage their own progress metrics" ON public.progress_metrics
    FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
END $$;

CREATE OR REPLACE FUNCTION public.update_progress_metrics_integrated() RETURNS trigger AS $$
DECLARE
  target_user_id UUID;
  target_date DATE;
BEGIN
  -- Determine target user and date based on table
  IF TG_TABLE_NAME = 'workout_sessions' THEN
    target_user_id := NEW.user_id;
    target_date := NEW.workout_date;
  ELSIF TG_TABLE_NAME = 'food_logs' THEN
    target_user_id := NEW.user_id;
    target_date := NEW.log_date;
  ELSE
    RETURN NEW;
  END IF;

  INSERT INTO public.progress_metrics (
    user_id, date, week_of_year, month_of_year, year
  )
  VALUES (
    target_user_id, target_date,
    EXTRACT(WEEK FROM target_date),
    EXTRACT(MONTH FROM target_date),
    EXTRACT(YEAR FROM target_date)
  )
  ON CONFLICT (user_id, date) DO UPDATE SET updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$
BEGIN
  -- Triggers for workout_sessions
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'workout_sessions') THEN
    DROP TRIGGER IF EXISTS workout_sessions_progress_trigger ON public.workout_sessions;
    CREATE TRIGGER workout_sessions_progress_trigger AFTER INSERT OR UPDATE ON public.workout_sessions FOR EACH ROW EXECUTE FUNCTION public.update_progress_metrics_integrated();
  END IF;

  -- Triggers for food_logs
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'food_logs') THEN
    DROP TRIGGER IF EXISTS food_logs_progress_trigger ON public.food_logs;
    CREATE TRIGGER food_logs_progress_trigger AFTER INSERT OR UPDATE ON public.food_logs FOR EACH ROW EXECUTE FUNCTION public.update_progress_metrics_integrated();
  END IF;
END $$;
