import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { Check, AlertCircle } from 'lucide-react'

export function ExerciseScreen({
  exercise,
  onComplete,
  totalExercises,
  currentIndex,
  onCancel,
}: any) {
  const [sets, setSets] = useState(
    Array.from({ length: exercise.plannedSets }).map((_, i) => ({
      setNumber: i + 1,
      repsCompleted: exercise.plannedReps,
      weightUsed: exercise.suggestedWeight || 0,
      completed: false,
    })),
  )

  const [restTimeLeft, setRestTimeLeft] = useState(0)

  useEffect(() => {
    setSets(
      Array.from({ length: exercise.plannedSets }).map((_, i) => ({
        setNumber: i + 1,
        repsCompleted: exercise.plannedReps,
        weightUsed: exercise.suggestedWeight || 0,
        completed: false,
      })),
    )
  }, [exercise])

  useEffect(() => {
    if (restTimeLeft > 0) {
      const timer = setInterval(() => setRestTimeLeft((t) => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [restTimeLeft])

  const handleCompleteSet = (index: number) => {
    const newSets = [...sets]
    newSets[index].completed = true
    setSets(newSets)
    if (index < sets.length - 1) setRestTimeLeft(exercise.plannedRest)
  }

  return (
    <div className="flex flex-col h-full bg-background animate-fade-in pb-24">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Exercício {currentIndex + 1} de {totalExercises}
          </span>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Sair
          </Button>
        </div>
        <Progress value={(currentIndex / totalExercises) * 100} className="h-2" />
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        <h2 className="text-3xl font-black tracking-tight">{exercise.exerciseName}</h2>

        <div className="aspect-video rounded-xl overflow-hidden bg-muted relative shadow-inner">
          <img
            src={exercise.imageUrl}
            alt={exercise.exerciseName}
            className="w-full h-full object-cover"
          />
          {exercise.videoUrl && (
            <Button className="absolute bottom-4 right-4 shadow-lg" size="sm">
              Ver Vídeo
            </Button>
          )}
        </div>

        <Card className="p-4 bg-primary/5 border-primary/20">
          <h4 className="font-semibold flex items-center gap-2 mb-3 text-primary">
            <AlertCircle className="w-5 h-5" /> Dicas de Execução
          </h4>
          <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5 font-medium">
            {exercise.executionTips.map((tip: string, i: number) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </Card>

        <div className="space-y-3">
          {sets.map((set, i) => (
            <Card
              key={i}
              className={`p-3 flex items-center gap-4 transition-all duration-300 ${set.completed ? 'bg-muted/50 opacity-75 grayscale-[0.2]' : 'shadow-subtle'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${set.completed ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              >
                {set.completed ? <Check className="w-4 h-4" /> : set.setNumber}
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">
                    Carga (kg)
                  </span>
                  <Input
                    type="number"
                    value={set.weightUsed}
                    disabled={set.completed}
                    onChange={(e) => {
                      const n = [...sets]
                      n[i].weightUsed = Number(e.target.value)
                      setSets(n)
                    }}
                    className="h-10 text-center font-bold text-lg bg-background"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">
                    Reps
                  </span>
                  <Input
                    type="number"
                    value={set.repsCompleted}
                    disabled={set.completed}
                    onChange={(e) => {
                      const n = [...sets]
                      n[i].repsCompleted = Number(e.target.value)
                      setSets(n)
                    }}
                    className="h-10 text-center font-bold text-lg bg-background"
                  />
                </div>
              </div>
              <Button
                size="icon"
                variant={set.completed ? 'secondary' : 'default'}
                disabled={set.completed}
                onClick={() => handleCompleteSet(i)}
                className="w-12 h-12 rounded-xl shrink-0"
              >
                <Check className="w-6 h-6" />
              </Button>
            </Card>
          ))}
        </div>

        {restTimeLeft > 0 && (
          <div className="fixed bottom-20 left-4 right-4 bg-primary text-primary-foreground p-4 rounded-xl shadow-2xl flex items-center justify-between animate-slide-up z-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-primary-foreground/30 flex items-center justify-center font-black text-xl tabular-nums">
                {restTimeLeft}
              </div>
              <div>
                <p className="font-bold">Descanso Ativo</p>
                <p className="text-xs opacity-90 font-medium">Prepare-se para a próxima série</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="font-bold"
              onClick={() => setRestTimeLeft(0)}
            >
              Pular
            </Button>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-10">
        <Button
          size="lg"
          className="w-full h-14 text-lg font-bold shadow-lg"
          disabled={!sets.every((s) => s.completed)}
          onClick={() => onComplete(sets)}
        >
          {currentIndex < totalExercises - 1 ? 'Próximo Exercício' : 'Finalizar Treino'}
        </Button>
      </div>
    </div>
  )
}
