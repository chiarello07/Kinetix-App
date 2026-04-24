import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { NutritionOnboardingData } from '../types'

export function MetabolicStep({
  data,
  updateData,
}: {
  data: NutritionOnboardingData
  updateData: any
}) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">Rastreamento Metabólico</h2>
      <p className="text-muted-foreground text-lg">
        Informações essenciais para mapearmos o seu perfil biológico.
      </p>

      <div className="grid gap-3 mt-2">
        <Label className="text-lg">Tem histórico de diabetes na família?</Label>
        <RadioGroup
          value={data.diabetesHistory}
          onValueChange={(v) => updateData({ diabetesHistory: v })}
          className="grid grid-cols-2 gap-3 mt-2"
        >
          {['Sim', 'Não'].map((opt) => (
            <Label
              key={opt}
              className={cn(
                'flex items-center justify-center gap-2 p-5 rounded-xl border-2 cursor-pointer transition-all',
                data.diabetesHistory === opt
                  ? 'border-primary bg-primary/5 text-primary shadow-sm'
                  : 'border-muted hover:border-primary/30',
              )}
            >
              <RadioGroupItem value={opt} className="hidden" />
              <span className="text-lg font-bold">{opt}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="grid gap-3 mt-6">
        <Label className="text-lg">Como você descreve seu tipo de corpo (Biotipo)?</Label>
        <RadioGroup
          value={data.bodyType}
          onValueChange={(v) => updateData({ bodyType: v })}
          className="grid gap-3 mt-2"
        >
          {[
            'Ectomorfo (Dificuldade em ganhar peso)',
            'Mesomorfo (Ganha massa e perde gordura com facilidade)',
            'Endomorfo (Facilidade em ganhar peso/gordura)',
          ].map((opt) => (
            <Label
              key={opt}
              className={cn(
                'flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all',
                data.bodyType === opt
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-muted hover:border-primary/30',
              )}
            >
              <RadioGroupItem value={opt} className="hidden" />
              <div
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0',
                  data.bodyType === opt ? 'border-primary' : 'border-muted-foreground/30',
                )}
              >
                {data.bodyType === opt && <div className="w-3 h-3 bg-primary rounded-full" />}
              </div>
              <span className="text-base font-medium">{opt}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
