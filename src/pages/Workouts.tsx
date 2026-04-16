import { useState } from 'react'
import {
  Play,
  Clock,
  Dumbbell,
  Calendar,
  ArrowLeft,
  Target,
  Activity,
  AlertTriangle,
  Plus,
  Flame,
  HeartPulse,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { checkAccessControl, AccessControlResponse, startTrial } from '@/services/access-control'
import { PaywallModal } from '@/components/PaywallModal'
import { TrialBanner } from '@/components/TrialBanner'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useWorkoutStore } from '@/stores/use-workout-store'
import type { WorkoutPlan, TrainingSession } from '@/lib/types/workout'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const defaultRoutines = [
  { id: 'def-1', name: 'Superior Força', time: '45 min', intensity: 'Alta', img: 'black&dpr=2' },
  { id: 'def-2', name: 'Inferior Foco', time: '50 min', intensity: 'Alta', img: 'blue&dpr=2' },
  { id: 'def-3', name: 'Cardio HIIT', time: '20 min', intensity: 'Extrema', img: 'orange&dpr=2' },
  { id: 'def-4', name: 'Mobilidade', time: '15 min', intensity: 'Baixa', img: 'green&dpr=2' },
]

export default function Workouts() {
  const { plans, generateWorkout, isGenerating } = useWorkoutStore()
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null)
  const [activeRoutine, setActiveRoutine] = useState<string | null>(null)

  const [duration, setDuration] = useState('13')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPaywallOpen, setIsPaywallOpen] = useState(false)
  const [access, setAccess] = useState<AccessControlResponse | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      checkAccessControl(user.id, 5).then(setAccess)
    }
  }, [user])

  const handleGenerateClick = async () => {
    if (!user) return
    const res = await checkAccessControl(user.id, 10)
    if (!res.allowed) {
      if (res.action === 'show_paywall') {
        setIsPaywallOpen(true)
      } else if (res.action === 'show_trial_banner') {
        await startTrial(user.id)
        const newRes = await checkAccessControl(user.id, 10)
        setAccess(newRes)
        if (!newRes.allowed) setIsPaywallOpen(true)
      }
    } else {
      setIsDialogOpen(true)
    }
  }

  const handleGenerate = async () => {
    await generateWorkout({
      durationWeeks: parseInt(duration) as 13 | 26 | 52,
      trainingDays: ['Segunda', 'Quarta', 'Sexta'],
      focusAreas: ['Braços', 'Peito'],
      weightKg: 75,
      posturalScore: 55, // Forcing < 60 to demonstrate medical warning feature
      deviations: [
        { id: 'DE001', name: 'Cabeça Anteriorizada' },
        { id: 'DE004', name: 'Hiperlordose Lombar' },
      ],
    })
    setIsDialogOpen(false)
  }

  const renderSession = (session: TrainingSession) => (
    <Card key={session.id} className="mb-4 overflow-hidden border-l-4 border-l-primary shadow-sm">
      <CardHeader className="bg-muted/20 py-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> {session.dayOfWeek}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{session.name}</p>
          </div>
          <div className="flex gap-3 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {session.estimatedDurationMinutes}m
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" /> {session.estimatedCalories} kcal
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {['Warm-up', 'Main', 'Accessory', 'Cool-down'].map((category) => {
            const exList = session.exercises.filter((e) => e.category === category)
            if (exList.length === 0) return null
            return (
              <div key={category} className="p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  {category === 'Warm-up' ? (
                    <HeartPulse className="w-3 h-3 text-red-500" />
                  ) : category === 'Main' ? (
                    <Target className="w-3 h-3 text-primary" />
                  ) : category === 'Accessory' ? (
                    <Dumbbell className="w-3 h-3 text-blue-500" />
                  ) : (
                    <Activity className="w-3 h-3 text-green-500" />
                  )}
                  {category}
                </h4>
                <div className="space-y-3">
                  {exList.map((ex) => (
                    <div
                      key={ex.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-secondary/30 p-2 rounded-md"
                    >
                      <div>
                        <p className="font-medium text-sm">{ex.exercise.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{ex.notes}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:justify-end text-xs">
                        <Badge variant="outline" className="bg-background">
                          {ex.sets}x{ex.reps}
                        </Badge>
                        <Badge variant="outline" className="bg-background">
                          RPE {ex.rpe}
                        </Badge>
                        <Badge variant="outline" className="bg-background">
                          {ex.restTimeSeconds}s desc
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )

  if (activePlan) {
    return (
      <div className="flex flex-col h-full animate-fade-in pb-20 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => setActivePlan(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
              {activePlan.name}
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <Activity className="w-4 h-4" />
              {activePlan.periodizationType} Periodization • {activePlan.durationWeeks} Semanas
            </p>
          </div>
        </div>

        {activePlan.medicalClearanceRequired && (
          <Alert
            variant="destructive"
            className="mb-6 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900"
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Atenção Médica Necessária</AlertTitle>
            <AlertDescription>
              Seu score postural indica desvios significativos. É fortemente recomendado buscar
              liberação médica antes de iniciar este plano avançado.
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 border border-indigo-200 dark:border-indigo-800 rounded-xl p-5 mb-8">
          <h3 className="font-semibold flex items-center gap-2 text-indigo-900 dark:text-indigo-200 mb-3">
            <Target className="w-5 h-5" /> Foco do Plano
          </h3>
          <div className="flex flex-wrap gap-2">
            {activePlan.deviationsSnapshot.map((dev: any) => (
              <Badge key={dev.id} variant="secondary" className="bg-background/80">
                Correção: {dev.name}
              </Badge>
            ))}
            {activePlan.focusAreas.map((f) => (
              <Badge key={f} variant="outline" className="border-indigo-300 dark:border-indigo-700">
                Foco: {f}
              </Badge>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1 -mx-4 px-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {activePlan.mesocycles.map((meso) => (
              <AccordionItem
                key={meso.id}
                value={meso.id}
                className="border bg-card rounded-lg px-2 shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline py-4 px-2">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm text-muted-foreground font-medium mb-1">
                      Semana {meso.startWeek} a {meso.endWeek}
                    </span>
                    <span className="text-lg font-bold">{meso.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 px-2">
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {meso.microcycles.map((micro) => (
                      <AccordionItem
                        key={micro.id}
                        value={micro.id}
                        className="border-none bg-muted/30 rounded-md"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">Semana {micro.weekNumber}</span>
                            {micro.isDeload && (
                              <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              >
                                Deload
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="mt-4">{micro.sessions.map(renderSession)}</div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
    )
  }

  if (activeRoutine) {
    return (
      <div className="flex flex-col h-full animate-fade-in pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => setActiveRoutine(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{activeRoutine}</h1>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Modo de treino ativo não implementado no protótipo.
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 pb-20 animate-fade-in max-w-5xl mx-auto">
      {access?.allowed &&
        access.reason === 'trial_active' &&
        access.daysRemaining !== undefined && (
          <div className="mb-2">
            <TrialBanner
              daysRemaining={access.daysRemaining}
              onUpgrade={() => setIsPaywallOpen(true)}
            />
          </div>
        )}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        feature="Geração de Novos Planos de Treino"
        reason={access?.reason || 'trial_expired'}
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
            Meus Treinos
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Planos periodizados e rotinas focadas
          </p>
        </div>
        <div>
          <Button
            onClick={handleGenerateClick}
            className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:opacity-90 transition-opacity text-white shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" /> Gerar Novo Plano
          </Button>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Gerar Plano de Treino</DialogTitle>
              <DialogDescription>
                Selecione a duração para gerar um plano periodizado baseado na sua análise postural.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duração do Plano</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13">
                      13 Semanas (Trimestral) - Periodização Linear
                    </SelectItem>
                    <SelectItem value="26">
                      26 Semanas (Semestral) - Periodização Ondulatória
                    </SelectItem>
                    <SelectItem value="52">52 Semanas (Anual) - Periodização em Blocos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white"
              >
                {isGenerating ? 'Gerando...' : 'Gerar Plano'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {plans.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-2 text-indigo-900 dark:text-indigo-200">
            <Activity className="w-5 h-5 text-fuchsia-500" />
            Planos Periodizados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-fuchsia-500 bg-gradient-to-br from-background to-muted/20"
                onClick={() => setActivePlan(plan)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex flex-col gap-1 text-xs font-medium text-foreground/70">
                    <span className="flex items-center gap-1.5">
                      <Target className="w-3 h-3" /> {plan.periodizationType}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {plan.durationWeeks} semanas
                    </span>
                  </div>
                  {plan.medicalClearanceRequired && (
                    <Badge variant="destructive" className="mt-3 w-full justify-center">
                      Alerta Médico
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-2 text-indigo-900 dark:text-indigo-200">
          <Dumbbell className="w-5 h-5 text-indigo-500" />
          Rotinas Padrão
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultRoutines.map((routine) => (
            <Card
              key={routine.id}
              className="overflow-hidden border-none shadow-elevation group relative h-48 flex flex-col justify-end p-5 cursor-pointer"
              onClick={() => setActiveRoutine(routine.name)}
            >
              <img
                src={`https://img.usecurling.com/p/600/300?q=fitness&color=${routine.img}`}
                alt={routine.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative z-10 flex items-end justify-between">
                <div className="flex flex-col gap-1 text-white">
                  <h3 className="font-bold text-xl tracking-tight leading-none">{routine.name}</h3>
                  <div className="flex items-center gap-3 text-xs font-medium opacity-80">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {routine.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-3 h-3" /> {routine.intensity}
                    </span>
                  </div>
                </div>
                <Button
                  size="icon"
                  className="rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transform transition-transform group-hover:scale-110"
                >
                  <Play className="w-4 h-4 ml-0.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
