import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Target,
  Clock,
  Dumbbell,
  ChevronRight,
  Eye,
  Layers,
  TrendingUp,
  Activity,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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

  const currentWeek = 3
  const progressPercent = Math.min(100, Math.round((currentWeek / periodizationWeeks) * 100))

  const getPhaseDetails = () => {
    if (periodizationWeeks >= 24) {
      if (currentWeek <= 12)
        return {
          name: 'Bloco 1: Capacidade e Base',
          desc: 'Semanas 1-12 • Foco em capacidade de trabalho e base aeróbica/anaeróbica.',
          goal: 'Aumento da densidade mitocondrial e correção de assimetrias motoras.',
          next: 'Bloco 2: Especialização e Densidade (Intensidade máxima)',
          volume: 80,
          intensity: 60,
        }
      return {
        name: 'Bloco 2: Especialização',
        desc: 'Semanas 13-24 • Identificação de grupos com menor evolução e aumento de densidade.',
        goal: 'Hipertrofia miofibrilar e recrutamento de fibras tipo II.',
        next: 'Manutenção e Novos PRs',
        volume: 60,
        intensity: 90,
      }
    } else {
      if (currentWeek <= 4)
        return {
          name: 'Mês 1: Base e Adaptação',
          desc: 'Semanas 1-4 • Foco em técnica, adaptação anatômica e consistência.',
          goal: 'Construção de base de força nos exercícios Tier 1.',
          next: 'Mês 2: Progressão e Acúmulo de Volume',
          volume: 70,
          intensity: 65,
        }
      if (currentWeek <= 8)
        return {
          name: 'Mês 2: Desenvolvimento',
          desc: 'Semanas 5-8 • Aumento progressivo de volume.',
          goal: 'Hipertrofia máxima e resistência muscular localizada.',
          next: 'Mês 3: Intensificação e Pico de Performance',
          volume: 90,
          intensity: 75,
        }
      return {
        name: 'Mês 3: Consolidação',
        desc: 'Semanas 9-12 • Aumento de intensidade e redução de volume.',
        goal: 'Força máxima e pico de performance neural.',
        next: 'Deload Ativo e Novo Ciclo',
        volume: 50,
        intensity: 95,
      }
    }
  }

  const phase = getPhaseDetails()

  const trainingDaysArray = profile?.work_days?.length
    ? profile.work_days
    : ['Segunda', 'Terça', 'Quinta', 'Sexta'].slice(0, profile?.exercise_days_per_week || 4)

  const upcomingWorkouts = trainingDaysArray.map((day: string, i: number) => {
    const titles = [
      'Membros Inferiores (Tier 1)',
      'Peito, Ombros e Tríceps (Push)',
      'Costas e Bíceps (Pull)',
      'Full Body (Intensidade)',
      'Core e Mobilidade',
    ]
    return {
      day,
      title: titles[i % titles.length],
      duration: '50 min',
    }
  })

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-24 md:pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Periodização</h1>
          <p className="text-muted-foreground mt-1">
            Motor Kinetix: Resultados reais focados em performance.
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
            Plano Estratégico de {periodizationWeeks} Semanas
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
              <p className="text-sm font-medium text-muted-foreground">Foco Principal</p>
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
              <Badge className="bg-primary text-primary-foreground">Dia 1</Badge>
            </CardTitle>
            <CardDescription>Foco em Exercícios (Âncoras de Resultado)</CardDescription>
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
                    <DialogTitle>Membros Inferiores</DialogTitle>
                    <DialogDescription>
                      Priorize a sobrecarga progressiva e a execução impecável nos exercícios
                      âncora.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {[
                      {
                        name: 'Agachamento Livre com Barra',
                        sets: '4',
                        reps: '8-10',
                        tier: 'Tier 1',
                      },
                      { name: 'Leg Press 45º', sets: '3', reps: '10-12', tier: 'Tier 1' },
                      {
                        name: 'Levantamento Terra Romeno',
                        sets: '4',
                        reps: '8-10',
                        tier: 'Tier 1',
                      },
                      { name: 'Cadeira Extensora', sets: '3', reps: '12-15', tier: 'Tier 2' },
                      { name: 'Mesa Flexora', sets: '3', reps: '12-15', tier: 'Tier 2' },
                      { name: 'Prancha Isométrica', sets: '3', reps: '45s', tier: 'Tier 1' },
                    ].map((ex, i) => (
                      <div
                        key={i}
                        className="p-4 bg-secondary/30 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold">{ex.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {ex.sets} séries • {ex.reps} reps • RPE 8
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
              Dashboard Estratégico
            </CardTitle>
            <CardDescription>Acompanhamento do seu macrociclo atual.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-muted-foreground">Evolução do Ciclo</span>
                <span className="font-bold text-primary">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2 text-right">
                Semana {currentWeek} de {periodizationWeeks}
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full gap-2 font-bold border-primary/20 hover:bg-primary/5"
                >
                  <TrendingUp className="w-4 h-4" /> Ver Periodização Detalhada
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-primary">Macrociclo Kinetix</DialogTitle>
                  <DialogDescription>
                    Nenhuma sessão é isolada. Seu treino é um sistema de evolução contínua.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <div className="p-5 border border-primary/20 bg-primary/5 rounded-xl relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-lg text-foreground">{phase.name}</h4>
                      <Badge className="bg-primary text-primary-foreground">Atual</Badge>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-4">{phase.desc}</p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1">
                          Objetivo Fisiológico
                        </p>
                        <p className="text-sm bg-background p-3 rounded-md border border-border/50 font-medium">
                          <Activity className="w-4 h-4 inline-block mr-2 text-primary" />
                          {phase.goal}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1 font-medium">
                            <span>Volume Alvo</span>
                            <span>{phase.volume}%</span>
                          </div>
                          <Progress value={phase.volume} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1 font-medium">
                            <span>Intensidade Alvo</span>
                            <span>{phase.intensity}%</span>
                          </div>
                          <Progress
                            value={phase.intensity}
                            className="h-1.5 bg-secondary [&>div]:bg-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-xl bg-secondary/20">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" /> Próximo Bloco
                    </h4>
                    <p className="text-sm font-medium">
                      Prepare-se para:{' '}
                      <span className="text-foreground font-bold">{phase.next}</span>
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
          {upcomingWorkouts.map((workout, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-card rounded-xl border hover:border-primary/30 transition-colors group cursor-default"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center font-bold text-sm text-muted-foreground group-hover:text-primary transition-colors uppercase">
                  {workout.day.substring(0, 3)}
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {workout.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {workout.duration} • Foco em Tier 1
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
