import { useState, useEffect } from 'react'
import { Play, Pause, CheckSquare, X, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

interface ActiveWorkoutProps {
  workoutName: string
  onClose: () => void
}

export function ActiveWorkout({ workoutName, onClose }: ActiveWorkoutProps) {
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentExercise, setCurrentExercise] = useState(0)
  const { toast } = useToast()

  const exercises = [
    { name: 'Supino Reto', sets: 3, reps: '10-12' },
    { name: 'Crucifixo Inclinado', sets: 3, reps: '12-15' },
    { name: 'Desenvolvimento', sets: 4, reps: '10' },
  ]

  useEffect(() => {
    let interval: any
    if (isPlaying) {
      interval = setInterval(() => setTime((t) => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((c) => c + 1)
    } else {
      toast({
        title: 'Treino Concluído! 🎉',
        description: `Você finalizou o ${workoutName} em ${formatTime(time)}.`,
      })
      onClose()
    }
  }

  const progress = ((currentExercise + 1) / exercises.length) * 100

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in-up">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-bold">{workoutName}</h2>
            <div className="flex items-center gap-1 text-xs font-medium text-primary">
              <Timer className="w-3 h-3" /> {formatTime(time)}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
          {isPlaying ? 'Pausar' : 'Continuar'}
        </Button>
      </div>

      <div className="p-4">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground text-center mt-2">
          Exercício {currentExercise + 1} de {exercises.length}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <div className="text-center py-8">
          <h1 className="text-3xl font-black tracking-tight mb-2">
            {exercises[currentExercise].name}
          </h1>
          <p className="text-muted-foreground">
            {exercises[currentExercise].sets} Séries • {exercises[currentExercise].reps} Reps
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {Array.from({ length: exercises[currentExercise].sets }).map((_, i) => (
            <Card key={i} className="shadow-subtle">
              <CardContent className="p-3 flex items-center justify-between">
                <span className="font-semibold text-muted-foreground w-6">{i + 1}</span>
                <div className="flex items-center gap-4 flex-1 justify-center px-4">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-muted-foreground uppercase">Peso (kg)</span>
                    <input
                      type="number"
                      placeholder="--"
                      className="w-16 text-center font-bold bg-transparent border-b focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-muted-foreground uppercase">Reps</span>
                    <input
                      type="number"
                      placeholder="--"
                      className="w-16 text-center font-bold bg-transparent border-b focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <CheckSquare className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-4 bg-background border-t pb-safe">
        <Button size="lg" className="w-full text-lg h-14 shadow-lg" onClick={handleNext}>
          {currentExercise < exercises.length - 1 ? 'Próximo Exercício' : 'Finalizar Treino'}
        </Button>
      </div>
    </div>
  )
}
