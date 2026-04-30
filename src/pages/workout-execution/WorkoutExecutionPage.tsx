import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, ArrowRight, Play, Pause, CheckCircle } from 'lucide-react'
import { BorgScaleScreen } from './BorgScaleScreen'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

export default function WorkoutExecutionPage() {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentSet, setCurrentSet] = useState(1)
  const [showBorg, setShowBorg] = useState(false)
  const [weights, setWeights] = useState<Record<number, string>>({ 1: '60', 2: '60', 3: '60' })
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (isPaused || showBorg) return
    const timer = setInterval(() => setTimeElapsed((t) => t + 1), 1000)
    return () => clearInterval(timer)
  }, [isPaused, showBorg])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    if (h > 0)
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleFinishWorkout = () => {
    setShowBorg(true)
  }

  const handleBorgComplete = async (rpe: number) => {
    if (user) {
      const today = new Date().toISOString().split('T')[0]
      const { data: existing } = await supabase
        .from('progress_metrics')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      if (existing) {
        await supabase
          .from('progress_metrics')
          .update({
            workouts_completed: (existing.workouts_completed || 0) + 1,
            total_time: (existing.total_time || 0) + Math.floor(timeElapsed / 60),
            avg_borg_rpe: rpe,
          })
          .eq('id', existing.id)
      } else {
        await supabase.from('progress_metrics').insert({
          user_id: user.id,
          date: today,
          workouts_completed: 1,
          total_time: Math.floor(timeElapsed / 60),
          avg_borg_rpe: rpe,
        })
      }
    }
    navigate('/progress')
  }

  if (showBorg) {
    return <BorgScaleScreen onComplete={handleBorgComplete} />
  }

  return (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center space-y-10 bg-background relative overflow-hidden pb-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

      <div className="text-center space-y-4 w-full max-w-md animate-fade-in-down mt-10">
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
                <div className="flex items-center gap-1 bg-background/50 rounded-md px-2 py-1">
                  <Input
                    type="number"
                    value={weights[set]}
                    onChange={(e) => setWeights({ ...weights, [set]: e.target.value })}
                    className={`w-16 h-8 text-center font-bold ${set === currentSet ? 'text-foreground' : ''}`}
                    disabled={set < currentSet}
                  />
                  <span className="text-sm font-medium">kg</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          className="w-full h-14 text-lg font-bold rounded-xl mt-4 flex items-center justify-center gap-2"
          onClick={() => {
            if (currentSet < 3) setCurrentSet((s) => s + 1)
            else handleFinishWorkout()
          }}
          variant={currentSet < 3 ? 'default' : 'secondary'}
        >
          {currentSet < 3 ? 'Próxima Série' : 'Concluir Exercício'}{' '}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-md border-t z-50">
        <Button
          className="w-full max-w-md mx-auto flex h-16 text-xl font-bold shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] bg-primary-gradient text-white animate-pulse-slow border-0 transition-transform active:scale-95"
          onClick={handleFinishWorkout}
        >
          <CheckCircle className="w-6 h-6 mr-2" />
          Finalizar Treino e Salvar
        </Button>
      </div>
    </div>
  )
}
