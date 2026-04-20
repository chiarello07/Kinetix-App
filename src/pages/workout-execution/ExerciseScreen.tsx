import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock } from 'lucide-react'

export function ExerciseScreen({
  exercise,
  totalExercises,
  currentIndex,
  onComplete,
  onCancel,
}: any) {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleFinishSets = () => {
    const completed = Array.from({ length: exercise.plannedSets }).map((_, i) => ({
      setNumber: i + 1,
      repsCompleted: exercise.plannedReps,
      weightUsed: exercise.suggestedWeight || 0,
    }))
    onComplete(completed)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-10 border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onCancel} className="text-muted-foreground">
            Cancelar
          </Button>
        </div>
        <div className="flex items-center gap-2 font-mono text-xl font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-inner">
          <Clock className="w-5 h-5" /> {formatTime(elapsedTime)}
        </div>
      </div>

      <div className="flex-1 p-6 max-w-lg mx-auto w-full flex flex-col gap-6 animate-fade-in pb-24">
        <div className="text-center space-y-2">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Exercício {currentIndex + 1} de {totalExercises}
          </span>
          <h2 className="text-3xl font-bold tracking-tight">{exercise.exerciseName}</h2>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-card aspect-video relative">
          <img
            src={exercise.imageUrl}
            alt={exercise.exerciseName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-secondary/30 p-4 rounded-xl space-y-3">
          <h3 className="font-semibold text-lg border-b pb-2">Dicas de Execução</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {exercise.executionTips.map((tip: string, i: number) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-primary/5 p-3 rounded-lg text-center border border-primary/10">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Séries</p>
            <p className="text-2xl font-black text-primary">{exercise.plannedSets}</p>
          </div>
          <div className="bg-primary/5 p-3 rounded-lg text-center border border-primary/10">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Reps</p>
            <p className="text-2xl font-black text-primary">{exercise.plannedReps}</p>
          </div>
          <div className="bg-primary/5 p-3 rounded-lg text-center border border-primary/10">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Carga Sug.</p>
            <p className="text-2xl font-black text-primary">{exercise.suggestedWeight}kg</p>
          </div>
        </div>

        <div className="pt-6 mt-auto">
          <Button
            size="lg"
            className="w-full h-16 text-lg font-bold shadow-lg bg-primary hover:bg-primary/90"
            onClick={handleFinishSets}
          >
            <CheckCircle className="w-6 h-6 mr-2" />
            {currentIndex < totalExercises - 1 ? 'Próximo Exercício' : 'Finalizar Treino'}
          </Button>
        </div>
      </div>
    </div>
  )
}
