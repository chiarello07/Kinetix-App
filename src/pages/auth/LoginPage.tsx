import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export function LoginPage() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) return 'A senha deve ter pelo menos 8 caracteres.'
    if (!/[A-Z]/.test(pwd)) return 'A senha deve ter pelo menos 1 letra maiúscula.'
    if (!/[a-z]/.test(pwd)) return 'A senha deve ter pelo menos 1 letra minúscula.'
    if (!/[0-9]/.test(pwd)) return 'A senha deve ter pelo menos 1 número.'
    if (!/[!@#$%^&*]/.test(pwd))
      return 'A senha deve ter pelo menos 1 caractere especial (!@#$%^&*).'
    return null
  }

  const getErrorMessage = (err: any) => {
    const msg = err.message || ''
    if (msg.includes('already registered')) return 'Este e-mail já está cadastrado.'
    if (msg.includes('Invalid email')) return 'Formato de e-mail inválido.'
    return 'Ocorreu um erro. Verifique seus dados e tente novamente.'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!isLogin) {
      const pwdError = validatePassword(password)
      if (pwdError) {
        setError(pwdError)
        setLoading(false)
        return
      }
    }

    const { error: authError } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password, { full_name: fullName, phone, birth_date: birthDate })

    if (authError) {
      setError(getErrorMessage(authError))
    } else {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        await supabase
          .from('profiles')
          .update({ last_activity_at: new Date().toISOString() })
          .eq('id', session.user.id)
        const { data: profile } = await supabase
          .from('nutrition_profiles')
          .select('onboarding_completed')
          .eq('user_id', session.user.id)
          .single()
        if (profile && profile.onboarding_completed) {
          navigate('/')
        } else {
          navigate('/nutrition-onboarding')
        }
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <Card className="w-full max-w-md shadow-elevation border-primary/20 animate-fade-in-up">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
            <Activity className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">KINETIX</CardTitle>
          <CardDescription>
            {isLogin ? 'Faça login na sua conta' : 'Crie sua conta para começar'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2 animate-fade-in">
                  <Input
                    type="text"
                    placeholder="Nome Completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 animate-fade-in">
                  <Input
                    type="tel"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 animate-fade-in">
                  <Input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
              {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full mt-2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
