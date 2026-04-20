-- Índices para melhorar a performance das consultas do onboarding e login
CREATE INDEX IF NOT EXISTS idx_nutrition_profiles_user_id ON public.nutrition_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_nutrition_onboarding_steps_nutrition_profile_id ON public.nutrition_onboarding_steps(nutrition_profile_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(id);
