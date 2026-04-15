import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { OnboardingData } from '../types'

const HEALTH_OPTIONS = ['Lombar', 'Ombro', 'Joelho', 'Quadril', 'Nenhum']
const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

export function HealthStep({ data, updateData }: { data: OnboardingData; updateData: any }) {
  const handleToggle = (opt: string) => {
    if (opt === 'Nenhum') {
      updateData({ healthIssues: ['Nenhum'] })
      return
    }
    const current = data.healthIssues.filter((i) => i !== 'Nenhum')
    if (current.includes(opt)) {
      updateData({ healthIssues: current.filter((i) => i !== opt) })
    } else {
      updateData({ healthIssues: [...current, opt] })
    }
  }

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Alguma restrição ou dor?</h2>
        <p className="text-muted-foreground text-lg">
          Isso nos ajuda a adaptar seus exercícios e evitar lesões.
        </p>
      </div>

      <div className="grid gap-3 mt-2">
        {HEALTH_OPTIONS.map((opt) => {
          const isChecked = data.healthIssues.includes(opt)
          return (
            <Label
              key={opt}
              className={cn(
                'flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all',
                isChecked
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-muted hover:border-primary/30',
              )}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => handleToggle(opt)}
                className="hidden"
              />
              <div
                className={cn(
                  'w-6 h-6 rounded border-2 flex items-center justify-center shrink-0',
                  isChecked ? 'border-primary bg-primary' : 'border-muted-foreground/30',
                )}
              >
                {isChecked && <div className="w-3 h-3 bg-white rounded-sm" />}
              </div>
              <span className="text-lg font-medium">{opt}</span>
            </Label>
          )
        })}
      </div>
    </div>
  )
}

export function FrequencyStep({ data, updateData }: { data: OnboardingData; updateData: any }) {
  return (
    <div className="animate-fade-in flex flex-col gap-8">
      <h2 className="text-3xl font-bold text-foreground leading-tight">
        Quantos dias na semana quer treinar?
      </h2>

      <div className="flex flex-col items-center justify-center py-12">
        <span className="text-8xl font-bold text-primary-gradient">{data.frequency}</span>
        <span className="text-xl font-medium text-muted-foreground mt-4">dias por semana</span>
      </div>

      <div className="px-4">
        <Slider
          value={[data.frequency]}
          min={2}
          max={6}
          step={1}
          onValueChange={([val]) => {
            updateData({ frequency: val })
            if (data.trainingDays.length > val) {
              updateData({ trainingDays: data.trainingDays.slice(0, val) })
            }
          }}
          className="w-full"
        />
        <div className="flex justify-between text-base font-medium text-muted-foreground mt-4">
          <span>2 dias</span>
          <span>6 dias</span>
        </div>
      </div>
    </div>
  )
}

export function DaysStep({ data, updateData }: { data: OnboardingData; updateData: any }) {
  const handleToggle = (day: string) => {
    const isSelected = data.trainingDays.includes(day)
    if (isSelected) {
      updateData({ trainingDays: data.trainingDays.filter((d) => d !== day) })
    } else {
      if (data.trainingDays.length < data.frequency) {
        updateData({ trainingDays: [...data.trainingDays, day] })
      }
    }
  }

  const remaining = data.frequency - data.trainingDays.length

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Quais dias você prefere?</h2>
        <p className="text-muted-foreground text-lg">
          Selecione exatamente <strong>{data.frequency}</strong> dias.
          {remaining > 0 && (
            <span className="block mt-1 text-primary font-medium">Faltam {remaining} dias.</span>
          )}
          {remaining === 0 && (
            <span className="block mt-1 text-green-600 font-medium">
              Dias selecionados com sucesso!
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {DAYS.map((day) => {
          const isSelected = data.trainingDays.includes(day)
          const disabled = !isSelected && data.trainingDays.length >= data.frequency
          return (
            <Label
              key={day}
              className={cn(
                'flex items-center justify-center gap-3 p-5 rounded-xl border-2 transition-all text-lg font-medium',
                isSelected
                  ? 'border-primary bg-primary/5 text-primary shadow-sm'
                  : 'border-muted hover:border-primary/30',
                disabled ? 'opacity-40 cursor-not-allowed bg-muted/20' : 'cursor-pointer',
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => !disabled && handleToggle(day)}
                disabled={disabled}
                className="hidden"
              />
              {day}
            </Label>
          )
        })}
      </div>
    </div>
  )
}
