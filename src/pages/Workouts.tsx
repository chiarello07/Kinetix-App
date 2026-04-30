import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Calendar, Target, Clock, Dumbbell, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'

export default function Workouts() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    if (user) {
      supabase
        .from('nutrition_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data)
        })
      supabase
        .from('profiles')
        .select('subscription_id')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.subscription_id) {
            supabase
              .from('subscriptions')
              .select('*')
              .eq('id', data.subscription_id)
              .single()
              .then(({ data: subData }) => {
                if (subData) setSubscription(subData)
              })
          }
        })
    }
  }, [user])

  const planName = subscription ? `Premium ${subscription.billing_period}` : 'Plano Grátis'
  const periodizationWeeks =
    subscription?.billing_period === 'anual'
      ? 52
      : subscription?.billing_period === 'semestral'
        ? 24
        : subscription?.billing_period === 'trimestral'
          ? 12
          : 4

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-24 md:pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Treinos</h1>
          <p className="text-muted-foreground mt-1">
            Sua periodização e rotina de treinos inteligente.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Badge
            variant="secondary"
            className="px-3 py-1 font-semibold text-sm bg-primary/10 text-primary border-0"
          >
            {planName}
          </Badge>
          <span className="text-xs text-muted-foreground mt-1">
            Periodização de {periodizationWeeks} Semanas
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-secondary/30 border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-background rounded-full shadow-sm text-primary">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Foco</p>
              <p className="font-bold capitalize">
                {profile?.primary_goal?.replace('_', ' ') || 'Hipertrofia'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-background rounded-full shadow-sm text-primary">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Frequência</p>
              <p className="font-bold">{profile?.exercise_days_per_week || 4}x por semana</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-background rounded-full shadow-sm text-primary">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nível</p>
              <p className="font-bold capitalize">{profile?.fitness_level || 'Intermediário'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 shadow-md bg-gradient-to-br from-card to-card/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            <span>Treino do Dia: Membros Inferiores</span>
            <Badge className="bg-primary text-primary-foreground">Hoje</Badge>
          </CardTitle>
          <CardDescription className="text-base">
            Foco em força e correção de assimetria pélvica.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-md">
              <Clock className="w-4 h-4 text-muted-foreground" /> 50 min
            </div>
            <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-md">
              <Dumbbell className="w-4 h-4 text-muted-foreground" /> 6 Exercícios
            </div>
          </div>

          <Button
            className="w-full h-14 text-lg font-bold bg-primary-gradient text-white shadow-lg hover:shadow-primary/30 gap-2"
            onClick={() => navigate('/workout/execute')}
          >
            <Play className="w-5 h-5 fill-current" /> Visualizar Treino
          </Button>
        </CardContent>
      </Card>

      <div className="pt-6">
        <h2 className="text-xl font-bold mb-4">Próximos Treinos</h2>
        <div className="grid gap-3">
          {[
            { day: 'Amanhã', title: 'Costas e Bíceps', duration: '45 min' },
            { day: 'Quinta', title: 'Descanso Ativo', duration: '20 min' },
            { day: 'Sexta', title: 'Peitoral e Tríceps', duration: '50 min' },
          ].map((workout, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-card rounded-xl border hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center font-bold text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {workout.day === 'Amanhã' ? 'Qui' : workout.day === 'Quinta' ? 'Sex' : 'Sab'}
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {workout.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{workout.duration}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
