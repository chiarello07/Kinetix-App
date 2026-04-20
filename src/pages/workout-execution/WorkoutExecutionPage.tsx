import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, ArrowRight, Play, Pause } from 'lucide-react'

export default function WorkoutExecutionPage() {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentSet, setCurrentSet] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => setTimeElapsed((t) => t + 1), 1000)
    return () => clearInterval(timer)
  }, [isPaused])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    if (h > 0)
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center space-y-10 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

      <div className="text-center space-y-4 w-full max-w-md animate-fade-in-down">
        <h1 className="text-4xl font-extrabold tracking-tight">Treino em Andamento</h1>
        <div className="bg-card border-2 border-primary/20 shadow-elevation rounded-3xl p-8 flex flex-col items-center justify-center relative">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            Tempo Total
          </p>
          <div className="text-7xl font-black font-mono tabular-nums text-primary tracking-tighter">
            {formatTime(timeElapsed)}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full text-muted-foreground hover:text-primary"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="w-full max-w-md p-6 bg-card border rounded-3xl shadow-subtle space-y-6 animate-fade-in-up">
        <div>
          <h2 className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">
            Exercício Atual
          </h2>
          <p className="text-3xl font-bold flex items-center gap-2">
            Agachamento Livre <Dumbbell className="w-6 h-6 text-muted-foreground" />
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((set) => (
            <div
              key={set}
              className={`flex justify-between items-center p-4 rounded-2xl transition-colors ${
                set < currentSet
                  ? 'bg-primary/10 text-primary opacity-50'
                  : set === currentSet
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary/40 text-muted-foreground'
              }`}
            >
              <span className="font-semibold text-lg">Série {set}</span>
              <div className="flex items-center gap-4">
                <span className="font-bold text-xl">12 Reps</span>
                <span className="font-medium opacity-80">60 kg</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          className="w-full h-14 text-lg font-bold rounded-xl mt-4 flex items-center justify-center gap-2"
          onClick={() => {
            if (currentSet < 3) setCurrentSet((s) => s + 1)
            else navigate('/')
          }}
        >
          {currentSet < 3 ? 'Próxima Série' : 'Concluir Exercício'}{' '}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      <Button variant="link" className="text-muted-foreground" onClick={() => navigate('/')}>
        Finalizar Treino e Salvar
      </Button>
    </div>
  )
}
