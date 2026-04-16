DO $$
BEGIN

CREATE TABLE IF NOT EXISTS public.nutrition_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    gender VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    height_cm DECIMAL(5,2) NOT NULL,
    current_weight_kg DECIMAL(6,2) NOT NULL,
    target_weight_kg DECIMAL(6,2) NOT NULL,
    primary_goal VARCHAR(50) NOT NULL,
    goal_description TEXT,
    body_type VARCHAR(50),
    body_type_image_url TEXT,
    body_type_confidence DECIMAL(3,2),
    max_weight_kg DECIMAL(6,2),
    min_weight_kg DECIMAL(6,2),
    weight_history JSONB,
    wake_up_time TIME,
    sleep_time TIME,
    sleep_quality VARCHAR(20),
    fitness_level VARCHAR(50) NOT NULL,
    fitness_level_description TEXT,
    exercise_types TEXT[] NOT NULL,
    exercise_days_per_week INTEGER,
    exercise_duration_minutes INTEGER,
    profession VARCHAR(255),
    work_activity_level VARCHAR(50),
    work_days TEXT[],
    work_hours_per_day INTEGER,
    hereditary_diseases TEXT[],
    current_treatments TEXT[],
    medications JSONB,
    supplements JSONB,
    intestinal_function VARCHAR(50),
    bristol_scale_type INTEGER,
    food_allergies TEXT[],
    food_intolerances TEXT[],
    meals_per_day INTEGER,
    preferred_meal_times JSONB,
    water_intake_liters DECIMAL(4,2),
    foods_to_avoid TEXT[],
    foods_cannot_live_without TEXT[],
    favorite_fruits TEXT[],
    favorite_vegetables TEXT[],
    favorite_breakfast_foods TEXT[],
    favorite_lunch_foods TEXT[],
    favorite_snack_foods TEXT[],
    favorite_dinner_foods TEXT[],
    favorite_supper_foods TEXT[],
    onboarding_completed BOOLEAN DEFAULT FALSE,
    onboarding_completion_date TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'in_progress',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.nutrition_onboarding_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nutrition_profile_id UUID NOT NULL REFERENCES public.nutrition_profiles(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL CHECK (step_number BETWEEN 1 AND 11),
    step_name VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    skipped BOOLEAN DEFAULT FALSE,
    data JSONB,
    validation_errors TEXT[],
    is_valid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.nutrition_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nutrition_profile_id UUID NOT NULL REFERENCES public.nutrition_profiles(id) ON DELETE CASCADE,
    assessment_type VARCHAR(50) NOT NULL,
    assessment_name VARCHAR(255) NOT NULL,
    responses JSONB NOT NULL,
    total_score INTEGER,
    max_score INTEGER,
    score_percentage DECIMAL(5,2),
    interpretation VARCHAR(50),
    interpretation_text TEXT,
    recommendations TEXT[],
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nutrition_assessment_id UUID NOT NULL REFERENCES public.nutrition_assessments(id) ON DELETE CASCADE,
    question_id VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    question_category VARCHAR(100),
    answer_type VARCHAR(50),
    answer_value TEXT,
    answer_score INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

END $$;

-- Drop policies if exists
DROP POLICY IF EXISTS "Users can view their own nutrition_profiles" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "Users can insert their own nutrition_profiles" ON public.nutrition_profiles;
DROP POLICY IF EXISTS "Users can update their own nutrition_profiles" ON public.nutrition_profiles;

DROP POLICY IF EXISTS "Users can view their own nutrition_assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Users can insert their own nutrition_assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Users can update their own nutrition_assessments" ON public.nutrition_assessments;

-- Enable RLS
ALTER TABLE public.nutrition_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_onboarding_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;

-- Add basic RLS policies
CREATE POLICY "Users can view their own nutrition_profiles" ON public.nutrition_profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own nutrition_profiles" ON public.nutrition_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own nutrition_profiles" ON public.nutrition_profiles FOR UPDATE USING (true);

CREATE POLICY "Users can view their own nutrition_assessments" ON public.nutrition_assessments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own nutrition_assessments" ON public.nutrition_assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own nutrition_assessments" ON public.nutrition_assessments FOR UPDATE USING (true);

CREATE POLICY "Users can view their own assessment_responses" ON public.assessment_responses FOR SELECT USING (true);
CREATE POLICY "Users can insert their own assessment_responses" ON public.assessment_responses FOR INSERT WITH CHECK (true);
