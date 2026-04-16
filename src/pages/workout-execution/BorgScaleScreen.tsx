import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

export function BorgScaleScreen({ onComplete }: { onComplete: (rpe: number) => void }) {
  const [rpe, setRpe] = useState(5)

  const getRpeDescription = (val: number) => {
    if (val <= 2) return 'Muito leve (quase nenhum esforço)'
    if (val <= 4) return 'Leve (fácil manter)'
    if (val <= 6) return 'Moderado (confortavelmente difícil)'
    if (val <= 8) return 'Difícil (respiração ofegante)'
    if (val === 9) return 'Muito difícil (quase falha)'
    return 'Máximo (falha total)'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center animate-fade-in">
      <h1 className="text-4xl font-black mb-3 tracking-tight">Como foi seu esforço?</h1>
      <p className="text-muted-foreground mb-12 text-lg font-medium">
        De 0 a 10, avalie a intensidade geral do treino.
      </p>

      <div className="w-full max-w-xs mb-16">
        <div className="text-[120px] leading-none font-black mb-6 text-primary-gradient drop-shadow-sm transition-all">
          {rpe}
        </div>
        <p className="text-xl font-bold h-16 flex items-center justify-center text-primary">
          {getRpeDescription(rpe)}
        </p>

        <div className="px-2">
          <Slider
            value={[rpe]}
            onValueChange={(v) => setRpe(v[0])}
            max={10}
            step={1}
            className="mt-8 py-4 cursor-pointer"
          />
        </div>
        <div className="flex justify-between mt-2 px-2 text-sm font-black text-muted-foreground uppercase tracking-widest">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full max-w-xs h-14 text-lg font-bold shadow-xl"
        onClick={() => onComplete(rpe)}
      >
        Confirmar Avaliação
      </Button>
    </div>
  )
}
