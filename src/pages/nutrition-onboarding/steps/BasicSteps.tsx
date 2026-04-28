import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WeightHistoryStep({ data, updateData }: any) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Histórico de Peso</h2>
        <p className="text-muted-foreground">Para entendermos as flutuações do seu corpo.</p>
      </div>
      <div className="grid gap-5 mt-2">
        <div className="grid gap-2">
          <Label>Maior Peso Alcançado (kg)</Label>
          <Input
            type="number"
            min={data.weight || '30'}
            placeholder="Ex: 80"
            className="h-12"
            value={data.maxWeight}
            onChange={(e) => updateData({ maxWeight: e.target.value })}
          />
          {data.maxWeight && Number(data.maxWeight) < Number(data.weight) && (
            <span className="text-sm text-destructive">
              O peso máximo não pode ser menor que o atual.
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label>Menor Peso Alcançado (kg)</Label>
          <Input
            type="number"
            max={data.weight || '300'}
            placeholder="Ex: 60"
            className="h-12"
            value={data.minWeight}
            onChange={(e) => updateData({ minWeight: e.target.value })}
          />
          {data.minWeight && Number(data.minWeight) > Number(data.weight) && (
            <span className="text-sm text-destructive">
              O peso mínimo não pode ser maior que o atual.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
