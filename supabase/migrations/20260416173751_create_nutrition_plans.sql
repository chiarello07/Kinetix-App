CREATE TABLE IF NOT EXISTS public.foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  calories_per_100g DECIMAL(8,2),
  protein_per_100g DECIMAL(6,2),
  carbs_per_100g DECIMAL(6,2),
  fat_per_100g DECIMAL(6,2),
  fiber_per_100g DECIMAL(6,2),
  micronutrients JSONB,
  allergens TEXT[],
  is_processed BOOLEAN DEFAULT FALSE,
  glycemic_index INTEGER,
  glycemic_load INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.nutrition_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nutrition_profile_id UUID NOT NULL REFERENCES public.nutrition_profiles(id) ON DELETE CASCADE,
  plan_name VARCHAR(255) NOT NULL,
  plan_description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration_days INTEGER,
  primary_goal VARCHAR(50) NOT NULL,
  basal_metabolic_rate DECIMAL(8,2),
  total_daily_energy_expenditure DECIMAL(8,2),
  activity_factor DECIMAL(3,2),
  target_calories DECIMAL(8,2),
  protein_grams DECIMAL(6,2),
  carbs_grams DECIMAL(6,2),
  fat_grams DECIMAL(6,2),
  micronutrients JSONB,
  water_liters_per_day DECIMAL(4,2),
  meals_per_day INTEGER,
  meal_times JSONB,
  metabolic_adjustment DECIMAL(5,2),
  dysbiosis_adjustments TEXT[],
  eating_behavior_notes TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nutrition_plan_id UUID NOT NULL REFERENCES public.nutrition_plans(id) ON DELETE CASCADE,
  meal_type VARCHAR(50) NOT NULL,
  meal_number INTEGER,
  scheduled_time TIME,
  calories DECIMAL(8,2),
  protein_grams DECIMAL(6,2),
  carbs_grams DECIMAL(6,2),
  fat_grams DECIMAL(6,2),
  meal_options JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.meal_foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID NOT NULL REFERENCES public.meal_plans(id) ON DELETE CASCADE,
  food_id UUID REFERENCES public.foods(id),
  food_name VARCHAR(255) NOT NULL,
  food_category VARCHAR(50),
  quantity DECIMAL(6,2),
  unit VARCHAR(20),
  calories DECIMAL(8,2),
  protein_grams DECIMAL(6,2),
  carbs_grams DECIMAL(6,2),
  fat_grams DECIMAL(6,2),
  fiber_grams DECIMAL(6,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.food_substitutes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_food_id UUID NOT NULL REFERENCES public.meal_foods(id) ON DELETE CASCADE,
  substitute_food_name VARCHAR(255) NOT NULL,
  substitute_quantity DECIMAL(6,2),
  substitute_unit VARCHAR(20),
  equivalent_calories DECIMAL(8,2),
  equivalent_protein DECIMAL(6,2),
  equivalent_carbs DECIMAL(6,2),
  equivalent_fat DECIMAL(6,2),
  substitution_ratio DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.supplementation_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nutrition_plan_id UUID NOT NULL REFERENCES public.nutrition_plans(id) ON DELETE CASCADE,
  supplement_name VARCHAR(255) NOT NULL,
  supplement_type VARCHAR(50),
  dosage DECIMAL(6,2),
  dosage_unit VARCHAR(20),
  frequency VARCHAR(50),
  rationale TEXT,
  scientific_reference VARCHAR(255),
  recommended BOOLEAN DEFAULT TRUE,
  optional BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_substitutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplementation_plans ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  DROP POLICY IF EXISTS "public_select" ON public.foods;
  CREATE POLICY "public_select" ON public.foods FOR SELECT USING (true);

  DROP POLICY IF EXISTS "authenticated_all" ON public.nutrition_plans;
  CREATE POLICY "authenticated_all" ON public.nutrition_plans FOR ALL TO authenticated USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "authenticated_all" ON public.meal_plans;
  CREATE POLICY "authenticated_all" ON public.meal_plans FOR ALL TO authenticated USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "authenticated_all" ON public.meal_foods;
  CREATE POLICY "authenticated_all" ON public.meal_foods FOR ALL TO authenticated USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "authenticated_all" ON public.food_substitutes;
  CREATE POLICY "authenticated_all" ON public.food_substitutes FOR ALL TO authenticated USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "authenticated_all" ON public.supplementation_plans;
  CREATE POLICY "authenticated_all" ON public.supplementation_plans FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Fix missing RLS on nutrition_onboarding_steps
  DROP POLICY IF EXISTS "authenticated_all" ON public.nutrition_onboarding_steps;
  CREATE POLICY "authenticated_all" ON public.nutrition_onboarding_steps FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;
