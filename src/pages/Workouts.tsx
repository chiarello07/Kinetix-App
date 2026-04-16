import { useState } from 'react'
import { Play, Clock, Dumbbell, Calendar, ArrowLeft, Target, Activity } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useWorkoutStore } from '@/stores/use-workout-store'
import type { WorkoutPlan } from '@/lib/types/workout'
import { ScrollArea } from '@/components/ui/scroll-area'

const defaultRoutines = [
  { id: 'def-1', name: 'Superior Força', time: '45 min', intensity: 'Alta', img: 'black&dpr=2' },
  { id: 'def-2', name: 'Inferior Foco', time: '50 min', intensity: 'Alta', img: 'blue&dpr=2' },
  { id: 'def-3', name: 'Cardio HIIT', time: '20 min', intensity: 'Extrema', img: 'orange&dpr=2' },
  { id: 'def-4', name: 'Mobilidade', time: '15 min', intensity: 'Baixa', img: 'green&dpr=2' },
]

export default function Workouts() {
  const { plans } = useWorkoutStore()
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null)
  const [activeRoutine, setActiveRoutine] = useState<string | null>(null)

  if (activePlan) {
    return (
      <div className="flex flex-col h-full animate-fade-in pb-20 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => setActivePlan(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{activePlan.name}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Gerado em {new Date(activePlan.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="bg-[#4B0082]/10 dark:bg-[#4B0082]/20 border border-[#4B0082]/20 rounded-xl p-4 mb-6">
          <h3 className="font-semibold flex items-center gap-2 text-[#4B0082] dark:text-[#E6E6FA] mb-2">
            <Target className="w-5 h-5" /> Foco Corretivo
          </h3>
          <div className="flex flex-wrap gap-2">
            {activePlan.deviationsSnapshot.map((dev) => (
              <Badge key={dev.id} variant="secondary" className="bg-background/50 border-none">
                {dev.name}
              </Badge>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1 -mx-4 px-4">
          <div className="space-y-4">
            {activePlan.exercises.map((presc, idx) => (
              <Card key={`${presc.exerciseId}-${idx}`} className="overflow-hidden shadow-sm">
                <CardHeader className="py-4 bg-muted/30 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs font-mono">
                          {presc.exerciseId}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                          {presc.exercise.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{presc.exercise.name}</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl">
                        {presc.sets} x {presc.reps}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {presc.restTimeSeconds}s desc.
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-4 space-y-3">
                  <p className="text-sm text-foreground/80">{presc.exercise.description}</p>

                  <div>
                    <span className="text-xs font-semibold uppercase text-muted-foreground">
                      Músculos Alvo:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {presc.exercise.targetMuscles.map((m) => (
                        <span key={m} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg flex gap-3 items-start border border-blue-100 dark:border-blue-900">
                    <Activity className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-900 dark:text-blue-200">
                      <strong>Execução:</strong> {presc.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Meus Treinos</h1>
        <p className="text-base text-muted-foreground mt-1">
          Sua central de exercícios e correções
        </p>
      </div>

      {plans.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-2">
            <Activity className="w-5 h-5 text-[#FF1493]" />
            Treinos Corretivos Gerados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-[#FF1493]"
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
                  <div className="flex gap-2 text-xs font-medium text-foreground/70">
                    <span>{plan.exercises.length} Exercícios</span>
                    <span>•</span>
                    <span>Foco em {plan.deviationsSnapshot.length} desvios</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-2">
          <Dumbbell className="w-5 h-5 text-[#4B0082]" />
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
