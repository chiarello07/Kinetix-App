import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NutritionOnboardingData } from '../types'

export function DietaryStep({
  data,
  updateData,
}: {
  data: NutritionOnboardingData
  updateData: any
}) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">Hábitos Alimentares</h2>
      <p className="text-muted-foreground text-lg">
        Detalhes finais para calcularmos sua dieta perfeita.
      </p>

      <div className="grid gap-5 mt-2">
        <div className="grid gap-2">
          <Label className="text-base">Quantas refeições costuma fazer por dia?</Label>
          <Input
            type="number"
            min="1"
            max="8"
            className="h-14 text-lg"
            placeholder="Ex: 4"
            value={data.mealsPerDay}
            onChange={(e) => updateData({ mealsPerDay: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-base">Quantos litros de água bebe por dia?</Label>
          <Input
            type="number"
            step="0.5"
            className="h-14 text-lg"
            placeholder="Ex: 2.5"
            value={data.waterIntake}
            onChange={(e) => updateData({ waterIntake: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-base">Alimentos Favoritos (O que não pode faltar?)</Label>
          <Input
            className="h-14 text-lg"
            placeholder="Ex: Arroz, feijão, frango, chocolate"
            value={data.favoriteFoods}
            onChange={(e) => updateData({ favoriteFoods: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
