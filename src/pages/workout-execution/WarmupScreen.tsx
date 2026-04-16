import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Timer, ArrowRight } from 'lucide-react'

export function WarmupScreen({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(300)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center animate-fade-in">
      <div className="w-24 h-24 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mb-8 shadow-inner border border-orange-500/20">
        <Timer className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-black mb-4 tracking-tight">Prepare-se para o treino!</h1>
      <p className="text-muted-foreground mb-8 text-lg max-w-xs mx-auto">
        Aquecimento recomendado: 5 min de mobilidade ou aeróbico leve.
      </p>

      <div className="text-7xl font-black mb-12 tabular-nums text-primary-gradient drop-shadow-sm">
        {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </div>

      <Button
        size="lg"
        className="w-full max-w-sm h-14 text-lg shadow-lg hover:shadow-primary/25 transition-all"
        onClick={onComplete}
      >
        Aquecimento concluído <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  )
}
