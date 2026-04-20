import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  signUp: (
    email: string,
    password: string,
    meta?: any,
  ) => Promise<{ success: boolean; error?: any; user?: User; message?: string }>
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean
    error?: any
    user?: User
    profile?: any
    nutritionProfile?: any
    onboardingCompleted?: boolean
    redirect?: string
  }>
  signOut: () => Promise<{ error: any }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, meta?: any) => {
    try {
      console.log('1. Tentando criar usuário no Auth com email:', email)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: meta,
        },
      })

      if (authError) {
        console.error('Erro ao criar usuário no Auth:', authError)
        return { success: false, error: authError.message }
      }

      if (!authData?.user) {
        return { success: false, error: 'Usuário não foi criado no Auth' }
      }

      const userId = authData.user.id
      console.log('3. ID do usuário:', userId)

      // Atualizar profile (geralmente criado por trigger)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_premium: false })
        .eq('id', userId)

      if (profileError) console.error('Erro ao atualizar profile:', profileError)

      // Criar registro em nutrition_profiles
      const { data: nutritionData, error: nutritionError } = await supabase
        .from('nutrition_profiles')
        .insert({
          user_id: userId,
          gender: 'outros',
          date_of_birth: meta?.birth_date || '1990-01-01',
          height_cm: 0,
          current_weight_kg: 0,
          target_weight_kg: 0,
          primary_goal: 'saude',
          fitness_level: 'sedentario',
          exercise_types: [],
          status: 'in_progress',
          onboarding_completed: false,
        })
        .select()
        .single()

      if (nutritionError) console.error('Erro ao criar nutrition_profile:', nutritionError)

      const nutritionProfileId = nutritionData?.id

      // Criar registro em gamification_profiles
      const { error: gamificationError } = await supabase.from('gamification_profiles').insert({
        user_id: userId,
        total_points: 0,
        level: 1,
        badges: [],
      })

      if (gamificationError) console.error('Erro ao criar gamification_profile:', gamificationError)

      // Criar primeiro passo do onboarding
      if (nutritionProfileId) {
        const { error: stepError } = await supabase.from('nutrition_onboarding_steps').insert({
          nutrition_profile_id: nutritionProfileId,
          step_number: 1,
          step_name: 'Dados Pessoais',
          completed: false,
          skipped: false,
          data: null,
          is_valid: false,
        })

        if (stepError) console.error('Erro ao criar onboarding step:', stepError)
      }

      return {
        success: true,
        user: authData.user,
        message: 'Conta criada com sucesso! Por favor, verifique seu email.',
      }
    } catch (error: any) {
      console.error('Erro no signup:', error)
      return { success: false, error: error.message || 'Erro ao criar conta' }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        console.error('Erro ao fazer login:', authError)
        return { success: false, error: authError.message }
      }

      if (!authData.user) {
        return { success: false, error: 'Usuário não encontrado' }
      }

      const userId = authData.user.id

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) console.error('Erro ao buscar profile:', profileError)

      await supabase
        .from('profiles')
        .update({ last_activity_at: new Date().toISOString() })
        .eq('id', userId)

      const { data: nutritionData, error: nutritionError } = await supabase
        .from('nutrition_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (nutritionError) console.error('Erro ao buscar nutrition_profile:', nutritionError)

      const onboardingCompleted = nutritionData?.onboarding_completed || false

      return {
        success: true,
        user: authData.user,
        profile: profileData,
        nutritionProfile: nutritionData,
        onboardingCompleted,
        redirect: onboardingCompleted ? '/' : '/onboarding',
      }
    } catch (error: any) {
      console.error('Erro no signin:', error)
      return { success: false, error: error.message || 'Erro ao fazer login' }
    }
  }
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
