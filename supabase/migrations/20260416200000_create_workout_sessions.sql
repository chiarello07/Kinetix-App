CREATE TABLE IF NOT EXISTS public.workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  training_plan_id VARCHAR(255) NOT NULL,
  day_index INTEGER NOT NULL,
  workout_date DATE NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  exercises_completed JSONB NOT NULL,
  total_time INTEGER NOT NULL,
  total_rest_time INTEGER NOT NULL,
  total_session_time INTEGER NOT NULL,
  total_volume INTEGER NOT NULL,
  total_weight INTEGER NOT NULL,
  calories_burned INTEGER,
  borg_rpe INTEGER NOT NULL CHECK (borg_rpe BETWEEN 0 AND 10),
  nutrition_integration JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own workout sessions" ON public.workout_sessions;
CREATE POLICY "Users can manage their own workout sessions" ON public.workout_sessions
  FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_workout_sessions_user_id ON public.workout_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_workout_date ON public.workout_sessions(workout_date DESC);
