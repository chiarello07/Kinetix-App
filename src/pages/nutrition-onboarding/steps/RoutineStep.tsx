import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NutritionOnboardingData } from '../types'

export function RoutineStep({
  data,
  updateData,
}: {
  data: NutritionOnboardingData
  updateData: any
}) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">Sua Rotina Diária</h2>
      <p className="text-muted-foreground text-lg">
        Como o seu dia se estrutura para encaixarmos os melhores horários de refeição.
      </p>

      <div className="grid grid-cols-2 gap-5 mt-2">
        <div className="grid gap-2">
          <Label className="text-base">Horário que acorda</Label>
          <Input
            type="time"
            className="h-14 text-lg"
            value={data.wakeUpTime}
            onChange={(e) => updateData({ wakeUpTime: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-base">Horário que dorme</Label>
          <Input
            type="time"
            className="h-14 text-lg"
            value={data.sleepTime}
            onChange={(e) => updateData({ sleepTime: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-2 mt-4">
        <Label className="text-base">Profissão / Ocupação atual</Label>
        <Input
          className="h-14 text-lg"
          placeholder="Ex: Estudante, Engenheiro, Médico..."
          value={data.profession}
          onChange={(e) => updateData({ profession: e.target.value })}
        />
      </div>
    </div>
  )
}
