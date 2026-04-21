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

      // The database trigger 'handle_new_user' takes care of creating:
      // - profiles
      // - nutrition_profiles
      // - nutrition_onboarding_steps
      // - gamification_profiles

      return {
        success: true,
        user: authData.user,
        message: 'Conta criada com sucesso!',
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
