import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Play, TrendingUp, Calendar } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'

export default function Index() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      supabase
        .from('nutrition_profiles')
        .select('onboarding_completed')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          setProfile(data)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const hasOnboarding = profile?.onboarding_completed

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in-up py-12">
      <div className="w-24 h-24 bg-gradient-to-br from-[#FF1493] to-[#4B0082] rounded-3xl flex items-center justify-center shadow-xl shadow-primary/20 mb-8 transform -rotate-6">
        <span className="text-4xl font-black text-white rotate-6">K</span>
      </div>

      <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
        KINETIX <span className="text-[#FF1493]">App</span>
      </h1>

      {!hasOnboarding ? (
        <>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-[1.23rem]">
            Sua plataforma integrada de saúde, treinos personalizados e dieta inteligente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <Button
              asChild
              size="lg"
              className="w-full text-lg h-14 bg-foreground text-background hover:bg-foreground/90 font-bold shadow-lg"
            >
              <Link to="/analysis">
                Começar Agora <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full text-lg h-14 font-bold border-2 border-[#FF1493]/20 hover:border-[#FF1493]/50 hover:bg-[#FF1493]/5 text-foreground"
            >
              <Link to="/workout/execute">
                <Play className="w-5 h-5 mr-2 text-[#FF1493]" /> Iniciar Treino Hoje
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full max-w-4xl mx-auto mt-4 animate-fade-in">
          <p className="text-muted-foreground mb-8 text-lg">
            Seu motor de treinamento e periodização está ativo. O que vamos fazer hoje?
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card
              className="group cursor-pointer hover:border-primary/50 transition-colors bg-card"
              onClick={() => navigate('/workout/execute')}
            >
              <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Iniciar Treino</h3>
                  <p className="text-sm text-muted-foreground">
                    Registre sua sessão diária e esforço.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="group cursor-pointer hover:border-foreground/30 transition-colors bg-card"
              onClick={() => navigate('/workouts')}
            >
              <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Periodização</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize o planejamento e macrociclo.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="group cursor-pointer hover:border-foreground/30 transition-colors bg-card"
              onClick={() => navigate('/progress')}
            >
              <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Progresso</h3>
                  <p className="text-sm text-muted-foreground">Acompanhe seus resultados reais.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
