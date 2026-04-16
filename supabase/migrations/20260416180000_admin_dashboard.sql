DO $$
BEGIN

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'moderator',
  permissions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  admin_email VARCHAR(255),
  action VARCHAR(50) NOT NULL,
  entity VARCHAR(50) NOT NULL,
  entity_id VARCHAR(255),
  old_value JSONB,
  new_value JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  entity VARCHAR(50) NOT NULL,
  entity_id VARCHAR(255),
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  tier VARCHAR(50) NOT NULL,
  primary_muscles TEXT[] NOT NULL,
  secondary_muscles TEXT[],
  corrective_for UUID[] DEFAULT '{}'::UUID[],
  contraindicated_for UUID[] DEFAULT '{}'::UUID[],
  safety_notes TEXT,
  progression_cues TEXT,
  scientific_reference TEXT,
  video_url VARCHAR(255),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.deviations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  region VARCHAR(100),
  affected_muscles TEXT[],
  weak_muscles TEXT[],
  tight_muscles TEXT[],
  scientific_reference TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.periodization (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  weeks INT NOT NULL,
  objective TEXT NOT NULL,
  parameters JSONB NOT NULL,
  cardio TEXT,
  expectations TEXT,
  phase VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.decision_matrix (
  deviation_id UUID REFERENCES public.deviations(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE,
  priority INT DEFAULT 1,
  PRIMARY KEY (deviation_id, exercise_id)
);

CREATE TABLE IF NOT EXISTS public.app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(255) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP DEFAULT NOW();

END $$;

-- RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deviations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.periodization ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decision_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_all_admin_users" ON public.admin_users;
CREATE POLICY "auth_all_admin_users" ON public.admin_users FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_all_audit_log" ON public.audit_log;
CREATE POLICY "auth_all_audit_log" ON public.audit_log FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_all_user_activity_log" ON public.user_activity_log;
CREATE POLICY "auth_all_user_activity_log" ON public.user_activity_log FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_all_exercises" ON public.exercises;
CREATE POLICY "auth_all_exercises" ON public.exercises FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "public_read_exercises" ON public.exercises;
CREATE POLICY "public_read_exercises" ON public.exercises FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "auth_all_deviations" ON public.deviations;
CREATE POLICY "auth_all_deviations" ON public.deviations FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "public_read_deviations" ON public.deviations;
CREATE POLICY "public_read_deviations" ON public.deviations FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "auth_all_periodization" ON public.periodization;
CREATE POLICY "auth_all_periodization" ON public.periodization FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "public_read_periodization" ON public.periodization;
CREATE POLICY "public_read_periodization" ON public.periodization FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "auth_all_decision_matrix" ON public.decision_matrix;
CREATE POLICY "auth_all_decision_matrix" ON public.decision_matrix FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_all_app_settings" ON public.app_settings;
CREATE POLICY "auth_all_app_settings" ON public.app_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "public_read_app_settings" ON public.app_settings;
CREATE POLICY "public_read_app_settings" ON public.app_settings FOR SELECT TO public USING (true);

INSERT INTO public.app_settings (setting_key, setting_value, description)
VALUES 
('maintenance_mode', '{"enabled": false, "message": "Estamos em manutenção."}'::jsonb, 'Configurações do modo de manutenção'),
('integrations', '{"stripe_api_key": "", "sendgrid_api_key": ""}'::jsonb, 'Chaves de API para integrações')
ON CONFLICT (setting_key) DO NOTHING;
