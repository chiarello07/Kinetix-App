-- Create Food Database (Local Cache)
CREATE TABLE IF NOT EXISTS public.food_database (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usda_fdc_id VARCHAR(100) UNIQUE,
    food_name VARCHAR(255) NOT NULL,
    food_category VARCHAR(100),
    brand_name VARCHAR(255),
    calories_per_100g DECIMAL(8,2),
    protein_per_100g DECIMAL(6,2),
    carbs_per_100g DECIMAL(6,2),
    fat_per_100g DECIMAL(6,2),
    fiber_per_100g DECIMAL(6,2),
    sugar_per_100g DECIMAL(6,2),
    micronutrients JSONB,
    allergens TEXT[],
    is_processed BOOLEAN DEFAULT FALSE,
    glycemic_index INTEGER,
    last_synced TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_food_database_food_name ON public.food_database(food_name);
CREATE INDEX IF NOT EXISTS idx_food_database_category ON public.food_database(food_category);

-- Create Food Logs Table
CREATE TABLE IF NOT EXISTS public.food_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nutrition_plan_id UUID NOT NULL REFERENCES public.nutrition_plans(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    log_time TIME,
    meal_type VARCHAR(50),
    input_method VARCHAR(50) NOT NULL,
    input_data JSONB,
    foods JSONB NOT NULL,
    total_calories DECIMAL(8,2),
    total_protein_grams DECIMAL(6,2),
    total_carbs_grams DECIMAL(6,2),
    total_fat_grams DECIMAL(6,2),
    ai_confidence DECIMAL(3,2),
    ai_analysis JSONB,
    confirmed BOOLEAN DEFAULT FALSE,
    confirmed_at TIMESTAMP,
    edited BOOLEAN DEFAULT FALSE,
    edited_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_food_logs_user_id ON public.food_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_food_logs_log_date ON public.food_logs(log_date);
CREATE INDEX IF NOT EXISTS idx_food_logs_nutrition_plan_id ON public.food_logs(nutrition_plan_id);

-- Create Daily Summaries Table
CREATE TABLE IF NOT EXISTS public.daily_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nutrition_plan_id UUID NOT NULL REFERENCES public.nutrition_plans(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    summary_date DATE NOT NULL,
    total_calories_consumed DECIMAL(8,2) DEFAULT 0,
    total_protein_consumed DECIMAL(6,2) DEFAULT 0,
    total_carbs_consumed DECIMAL(6,2) DEFAULT 0,
    total_fat_consumed DECIMAL(6,2) DEFAULT 0,
    target_calories DECIMAL(8,2),
    target_protein DECIMAL(6,2),
    target_carbs DECIMAL(6,2),
    target_fat DECIMAL(6,2),
    calories_remaining DECIMAL(8,2),
    protein_remaining DECIMAL(6,2),
    carbs_remaining DECIMAL(6,2),
    fat_remaining DECIMAL(6,2),
    calories_percentage DECIMAL(5,2),
    protein_percentage DECIMAL(5,2),
    carbs_percentage DECIMAL(5,2),
    fat_percentage DECIMAL(5,2),
    meals_logged INTEGER DEFAULT 0,
    meal_logs JSONB DEFAULT '[]'::jsonb,
    completed BOOLEAN DEFAULT FALSE,
    exceeded BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, summary_date)
);

CREATE INDEX IF NOT EXISTS idx_daily_summaries_user_id ON public.daily_summaries(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_summaries_summary_date ON public.daily_summaries(summary_date);

-- Create AI Identifications Table
CREATE TABLE IF NOT EXISTS public.ai_food_identifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    food_log_id UUID NOT NULL REFERENCES public.food_logs(id) ON DELETE CASCADE,
    input_type VARCHAR(50),
    input_url TEXT,
    identified_foods JSONB,
    raw_ai_response JSONB,
    user_confirmed BOOLEAN DEFAULT FALSE,
    user_corrections JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_food_identifications_food_log_id ON public.ai_food_identifications(food_log_id);

-- RLS Policies
ALTER TABLE public.food_database ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_food_db" ON public.food_database;
CREATE POLICY "public_read_food_db" ON public.food_database FOR SELECT USING (true);

ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "auth_all_food_logs" ON public.food_logs;
CREATE POLICY "auth_all_food_logs" ON public.food_logs FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

ALTER TABLE public.daily_summaries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "auth_all_daily_summaries" ON public.daily_summaries;
CREATE POLICY "auth_all_daily_summaries" ON public.daily_summaries FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

ALTER TABLE public.ai_food_identifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "auth_all_ai_food_identifications" ON public.ai_food_identifications;
CREATE POLICY "auth_all_ai_food_identifications" ON public.ai_food_identifications FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.food_logs fl WHERE fl.id = ai_food_identifications.food_log_id AND fl.user_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public.food_logs fl WHERE fl.id = ai_food_identifications.food_log_id AND fl.user_id = auth.uid())
);

-- Seed Basic Food Database
INSERT INTO public.food_database (usda_fdc_id, food_name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g) VALUES
('1', 'Frango Grelhado', 165, 31, 0, 3.6),
('2', 'Arroz Branco Cozido', 130, 2.7, 28, 0.3),
('3', 'Ovo Cozido', 155, 13, 1.1, 11),
('4', 'Banana', 89, 1.1, 23, 0.3),
('5', 'Aveia', 389, 16.9, 66.3, 6.9),
('6', 'Maçã', 52, 0.3, 14, 0.2),
('7', 'Pão Integral', 247, 13, 41, 4.2),
('8', 'Leite Integral', 61, 3.2, 4.8, 3.3),
('9', 'Batata Doce Cozida', 86, 1.6, 20, 0.1),
('10', 'Azeite de Oliva', 884, 0, 0, 100)
ON CONFLICT (usda_fdc_id) DO NOTHING;
