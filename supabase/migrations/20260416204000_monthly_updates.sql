DO $$
BEGIN
  -- Create monthly_reports table
  CREATE TABLE IF NOT EXISTS public.monthly_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    cycle_number INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    metrics JSONB NOT NULL,
    summary TEXT NOT NULL,
    recommendations JSONB NOT NULL,
    regenerated_training_plan_id UUID,
    regenerated_meal_plan_id UUID,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_monthly_reports_user_id ON public.monthly_reports(user_id);
  CREATE INDEX IF NOT EXISTS idx_monthly_reports_cycle ON public.monthly_reports(user_id, cycle_number DESC);

  -- Create monthly_metrics table
  CREATE TABLE IF NOT EXISTS public.monthly_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    cycle_number INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    workout_completion_rate DECIMAL(5,2),
    nutrition_adherence_rate DECIMAL(5,2),
    weight_change DECIMAL(5,2),
    progression_percent DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_monthly_metrics_user_cycle ON public.monthly_metrics(user_id, cycle_number);

  -- Drop and recreate policies
  DROP POLICY IF EXISTS "auth_all_monthly_reports" ON public.monthly_reports;
  DROP POLICY IF EXISTS "auth_all_monthly_metrics" ON public.monthly_metrics;

  ALTER TABLE public.monthly_reports ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.monthly_metrics ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "auth_all_monthly_reports" ON public.monthly_reports
    FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

  CREATE POLICY "auth_all_monthly_metrics" ON public.monthly_metrics
    FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
END $$;
