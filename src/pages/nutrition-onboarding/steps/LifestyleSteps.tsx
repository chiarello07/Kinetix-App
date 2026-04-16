import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SleepStep({ data, updateData }: any) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">Sono e Descanso</h2>
      <div className="grid gap-5 mt-2">
        <div className="grid gap-2">
          <Label>Horário de Acordar</Label>
          <Input
            type="time"
            className="h-12"
            value={data.wakeTime}
            onChange={(e) => updateData({ wakeTime: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label>Horário de Dormir</Label>
          <Input
            type="time"
            className="h-12"
            value={data.sleepTime}
            onChange={(e) => updateData({ sleepTime: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label>Qualidade do Sono</Label>
          <select
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={data.sleepQuality}
            onChange={(e) => updateData({ sleepQuality: e.target.value })}
          >
            <option value="">Selecione...</option>
            <option value="Ruim">Ruim (acorda cansado, insônia)</option>
            <option value="Razoável">Razoável (algumas interrupções)</option>
            <option value="Boa">Boa (dorme bem na maioria das vezes)</option>
            <option value="Excelente">Excelente (profundo e reparador)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export function ExerciseStep({ data, updateData }: any) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">Rotina de Exercícios</h2>
      <div className="grid gap-5 mt-2">
        <div className="grid gap-2">
          <Label>Tipo de Exercício Principal</Label>
          <Input
            placeholder="Ex: Musculação, Corrida, CrossFit"
            className="h-12"
            value={data.exerciseType}
            onChange={(e) => updateData({ exerciseType: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label>Frequência (dias por semana)</Label>
          <Input
            type="number"
            min="1"
            max="7"
            placeholder="Ex: 4"
            className="h-12"
            value={data.exerciseFrequency}
            onChange={(e) => updateData({ exerciseFrequency: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label>Duração média (minutos)</Label>
          <Input
            type="number"
            min="10"
            max="180"
            placeholder="Ex: 60"
            className="h-12"
            value={data.exerciseDuration}
            onChange={(e) => updateData({ exerciseDuration: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

export function WorkStep({ data, updateData }: any) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">Atividade Profissional</h2>
      <div className="grid gap-5 mt-2">
        <div className="grid gap-2">
          <Label>Nível de Atividade no Trabalho</Label>
          <select
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={data.workActivityLevel}
            onChange={(e) => updateData({ workActivityLevel: e.target.value })}
          >
            <option value="">Selecione...</option>
            <option value="Sedentário">Sedentário (ex: Escritório, Home Office)</option>
            <option value="Leve">Leve (ex: Professor, Vendedor loja)</option>
            <option value="Moderado">Moderado (ex: Entregador, Limpeza)</option>
            <option value="Pesado">Pesado (ex: Construção Civil)</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label>Horas de Trabalho por Dia</Label>
          <Input
            type="number"
            min="0"
            max="24"
            placeholder="Ex: 8"
            className="h-12"
            value={data.workHours}
            onChange={(e) => updateData({ workHours: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
