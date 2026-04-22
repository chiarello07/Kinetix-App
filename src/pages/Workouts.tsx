import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, BrainCircuit, Activity, CalendarDays, Target, Flame, Crown } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

export default function Workouts() {
  const { user } = useAuth()
  const [plans, setPlans] = useState<any[]>([])
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchPlans()
  }, [user])

  const fetchPlans = async () => {
    try {
      const { data } = await supabase
        .from('periodization')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) {
        setPlans(data)
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_premium, subscription_id')
        .eq('id', user!.id)
        .single()

      if (profile?.subscription_id) {
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('id', profile.subscription_id)
          .single()
        if (subData) {
          setSubscription(subData)
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getPlanBadge = () => {
    if (!subscription || subscription.status !== 'active') return 'Plano Grátis'
    const b = subscription.billing_period
    if (b === 'anual') return 'Premium Anual'
    if (b === 'semestral') return 'Premium Semestral'
    if (b === 'trimestral') return 'Premium Trimestral'
    return 'Premium Mensal'
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in-up pb-24 md:pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-[#FF1493]/20 to-[#4B0082]/20 rounded-xl text-[#FF1493] shadow-sm">
            <Dumbbell className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meus Treinos</h1>
            <p className="text-muted-foreground">Sua periodização e evolução diária.</p>
          </div>
        </div>

        <Badge
          className={cn(
            'px-4 py-1.5 shadow-md flex items-center gap-2 text-sm border-0 font-bold',
            subscription?.status === 'active'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
              : 'bg-secondary text-foreground',
          )}
        >
          {subscription?.status === 'active' && <Crown className="w-4 h-4" />}
          {getPlanBadge()}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-3 hover:shadow-md transition-all border-l-4 border-l-[#FF1493] bg-gradient-to-r from-card to-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <BrainCircuit className="w-6 h-6 text-[#FF1493]" /> Análise Inteligente IA
            </CardTitle>
            <CardDescription className="text-sm">
              Refaça sua análise postural a qualquer momento para adaptar seu treino à sua evolução
              biomecânica.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end pt-4">
            <Button
              asChild
              className="font-bold shadow-sm px-8 bg-foreground text-background hover:bg-foreground/90"
            >
              <Link to="/analysis">
                {plans.length > 0 ? 'Refazer Análise Postural' : 'Fazer Primeira Análise'}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {loading ? (
          <div className="md:col-span-3 text-center p-12 text-muted-foreground animate-pulse">
            Carregando periodização...
          </div>
        ) : plans.length > 0 ? (
          <>
            <div className="md:col-span-3 mt-4">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Periodização Atual
              </h2>
            </div>

            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={cn(
                  'hover:shadow-md transition-shadow bg-card flex flex-col',
                  index === 0
                    ? 'border-primary shadow-subtle relative'
                    : 'border-border/50 opacity-80',
                )}
              >
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-[#FF1493] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> FASE ATUAL
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">{plan.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2 min-h-[40px]">
                    {plan.objective}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-md">
                      <CalendarDays className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">{plan.weeks} Semanas</span> de
                      duração
                    </div>
                    {plan.phase && (
                      <div className="flex items-center gap-2 p-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Foco: {plan.phase}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t bg-secondary/10">
                  <Button
                    asChild
                    className="w-full font-bold shadow-sm"
                    variant={index === 0 ? 'default' : 'outline'}
                  >
                    <Link to="/workout/execute">Visualizar / Iniciar Treino</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </>
        ) : (
          <div className="md:col-span-3 p-12 text-center border-2 border-dashed rounded-xl bg-secondary/10 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Dumbbell className="w-10 h-10 text-primary opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Nenhum treino gerado ainda</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              Faça sua Análise Inteligente para que nossa IA possa construir seu plano de
              treinamento totalmente personalizado com base nos seus ângulos.
            </p>
            <Button
              asChild
              size="lg"
              className="font-bold px-8 shadow-lg bg-gradient-to-r from-[#FF1493] to-[#4B0082]"
            >
              <Link to="/analysis">Iniciar Análise Agora</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
