import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Target, Clock, Dumbbell, ChevronRight, Eye, Layers } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function Workouts() {
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
            Sua periodização e rotina de treinos focada em resultados.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end">
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

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-primary/20 shadow-md bg-card overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <CardHeader>
            <CardTitle className="text-xl flex items-center justify-between">
              <span>Treino de Hoje</span>
              <Badge className="bg-primary text-primary-foreground">Atual</Badge>
            </CardTitle>
            <CardDescription>Membros Inferiores (Foco em Força e Hipertrofia)</CardDescription>
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

            <div className="flex flex-col sm:flex-row gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full gap-2 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    <Eye className="w-5 h-5" /> Visualizar Treino
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Treino do Dia: Inferiores</DialogTitle>
                    <DialogDescription>
                      Exercícios baseados nos princípios de Tier 1 para máximo resultado.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {[
                      { name: 'Agachamento Livre com Barra', sets: '4', reps: '8-10' },
                      { name: 'Leg Press 45º', sets: '3', reps: '10-12' },
                      { name: 'Cadeira Extensora', sets: '3', reps: '12-15' },
                      { name: 'Levantamento Terra Romeno', sets: '4', reps: '8-10' },
                      { name: 'Mesa Flexora', sets: '3', reps: '12-15' },
                      { name: 'Panturrilha Sentado', sets: '4', reps: '15-20' },
                    ].map((ex, i) => (
                      <div
                        key={i}
                        className="p-4 bg-secondary/30 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-bold">{ex.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {ex.sets} séries de {ex.reps} reps
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm bg-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Sua Periodização
            </CardTitle>
            <CardDescription>
              Planejamento estratégico de {periodizationWeeks} semanas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              O motor de treino do Kinetix divide sua evolução em blocos estruturados (mesociclos)
              para garantir progresso contínuo e evitar platôs.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full gap-2 font-bold border-primary/20 hover:bg-primary/5"
                >
                  <Calendar className="w-4 h-4" /> Detalhes do Ciclo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Macro e Mesociclos</DialogTitle>
                  <DialogDescription>
                    Evolução estruturada para seu objetivo de{' '}
                    {profile?.primary_goal || 'Hipertrofia'}.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1 h-full bg-primary"></div>
                    <h4 className="font-bold text-primary mb-1">Meso 1: Construção de Base</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Semanas 1-4 • Atual
                    </p>
                    <p className="text-sm mt-2 leading-relaxed">
                      Foco no aprendizado motor e construção de força nos exercícios Tier 1. Volume
                      moderado e progressão linear de cargas.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg opacity-80">
                    <h4 className="font-bold mb-1">Meso 2: Hipertrofia Tensional</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Semanas 5-8
                    </p>
                    <p className="text-sm mt-2 leading-relaxed">
                      Aumento do volume total de treino. Maior foco na conexão mente-músculo e
                      exaustão metabólica.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg opacity-80">
                    <h4 className="font-bold mb-1">Meso 3: Intensificação e Choque</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Semanas 9-12
                    </p>
                    <p className="text-sm mt-2 leading-relaxed">
                      Redução do volume e aumento drástico da intensidade. Aplicação de técnicas
                      avançadas e proximidade total à falha mecânica.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <div className="pt-2">
        <h2 className="text-xl font-bold mb-4">Próximos Treinos do Microciclo</h2>
        <div className="grid gap-3">
          {[
            { day: 'Amanhã', title: 'Peito, Ombros e Tríceps (Push)', duration: '55 min' },
            { day: 'Quinta', title: 'Costas e Bíceps (Pull)', duration: '50 min' },
            { day: 'Sábado', title: 'Full Body (Intensidade)', duration: '45 min' },
          ].map((workout, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-card rounded-xl border hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center font-bold text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {workout.day === 'Amanhã' ? 'Qua' : workout.day === 'Quinta' ? 'Qui' : 'Sáb'}
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
