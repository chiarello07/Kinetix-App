import { Button } from '@/components/ui/button'
import { Edit2 } from 'lucide-react'
import { OnboardingData } from './types'

interface Props {
  data: OnboardingData
  onEdit: (step: number) => void
  onSubmit: () => void
}

export function Summary({ data, onEdit, onSubmit }: Props) {
  const sections = [
    {
      title: 'Dados Básicos',
      step: 1,
      content: `${data.gender}, ${data.goal}, Foco em ${data.motivation}`,
    },
    {
      title: 'Treino e Foco',
      step: 4,
      content: `Foco: ${data.focusAreas.join(', ')} | Exp: ${data.experience}`,
    },
    {
      title: 'Biometria',
      step: 7,
      content: `${data.height}cm, ${data.weight}kg, ${data.age} anos. Alvo: ${data.targetWeight}kg`,
    },
    {
      title: 'Rotina Semanal',
      step: 10,
      content: `${data.frequency}x na semana (${data.trainingDays.join(', ')})`,
    },
    { title: 'Restrições e Saúde', step: 9, content: data.healthIssues.join(', ') },
    { title: 'Identificação', step: 12, content: data.name },
  ]

  return (
    <div className="animate-fade-in flex flex-col gap-6 pb-28">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Resumo do Perfil</h2>
        <p className="text-muted-foreground text-lg">
          Revise seus dados antes de gerar seu plano de treino personalizado.
        </p>
      </div>

      <div className="grid gap-4 mt-2">
        {sections.map((sec) => (
          <div
            key={sec.title}
            className="p-5 rounded-xl border bg-card shadow-sm flex items-start justify-between gap-4 group"
          >
            <div>
              <h3 className="font-semibold text-sm text-primary uppercase tracking-wider">
                {sec.title}
              </h3>
              <p className="text-lg font-medium mt-1.5 leading-snug">{sec.content}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(sec.step)}
              className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t max-w-[600px] mx-auto z-10">
        <Button
          className="w-full h-14 text-lg font-bold bg-primary-gradient text-white shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
          onClick={onSubmit}
        >
          Confirmar e Gerar Plano
        </Button>
      </div>
    </div>
  )
}
