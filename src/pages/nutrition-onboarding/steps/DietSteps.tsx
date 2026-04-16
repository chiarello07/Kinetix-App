import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

export function HabitsStep({ data, updateData }: any) {
  const mealsCount = Number(data.mealsPerDay) || 3

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">Hábitos Alimentares</h2>
      <div className="grid gap-5 mt-2">
        <div className="grid gap-2">
          <Label>Refeições por dia (3 a 6)</Label>
          <Input
            type="number"
            min="3"
            max="6"
            className="h-12 text-lg"
            value={data.mealsPerDay}
            onChange={(e) => updateData({ mealsPerDay: e.target.value })}
          />
        </div>

        <div className="grid gap-3 bg-muted/20 p-5 rounded-xl border">
          <Label className="text-base mb-2">Horários das Refeições</Label>
          {Array.from({ length: mealsCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-24 font-medium">Refeição {i + 1}</span>
              <Input
                type="time"
                className="flex-1 h-12"
                value={data.mealTimes[i] || ''}
                onChange={(e) =>
                  updateData({ mealTimes: { ...data.mealTimes, [i]: e.target.value } })
                }
              />
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <Label>Consumo de Água (Litros/dia)</Label>
          <Input
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="Ex: 2.5"
            className="h-12"
            value={data.waterIntake}
            onChange={(e) => updateData({ waterIntake: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

const FRUITS = ['Banana', 'Maçã', 'Laranja', 'Morango', 'Uva', 'Mamão', 'Melancia', 'Abacaxi']
const VEGS = [
  'Alface',
  'Tomate',
  'Cenoura',
  'Brócolis',
  'Couve',
  'Abobrinha',
  'Espinafre',
  'Batata Doce',
]
const MEAL_OPTIONS = ['Ovo', 'Frango', 'Carne', 'Peixe', 'Pão', 'Arroz', 'Feijão', 'Leite', 'Aveia']

export function PreferencesStep({ data, updateData }: any) {
  const toggleArray = (arr: string[], val: string, max: number) => {
    if (arr.includes(val)) return arr.filter((i) => i !== val)
    if (arr.length < max) return [...arr, val]
    return arr
  }

  const toggleMealPref = (meal: string, food: string) => {
    const current = data.mealPreferences[meal] || []
    updateData({
      mealPreferences: {
        ...data.mealPreferences,
        [meal]: current.includes(food)
          ? current.filter((i: string) => i !== food)
          : [...current, food],
      },
    })
  }

  return (
    <div className="animate-fade-in flex flex-col gap-6 h-full">
      <h2 className="text-3xl font-bold text-foreground">Preferências</h2>
      <ScrollArea className="flex-1 pr-4 -mr-4 h-[50vh]">
        <div className="space-y-8 pb-8">
          <div className="space-y-3">
            <Label className="text-base">
              Escolha 3 Frutas Favoritas ({data.favFruits.length}/3)
            </Label>
            <div className="flex flex-wrap gap-2">
              {FRUITS.map((f) => (
                <Badge
                  key={f}
                  variant={data.favFruits.includes(f) ? 'default' : 'outline'}
                  className="cursor-pointer text-sm py-1.5 px-3"
                  onClick={() => updateData({ favFruits: toggleArray(data.favFruits, f, 3) })}
                >
                  {f}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base">
              Escolha 3 Vegetais Favoritos ({data.favVegetables.length}/3)
            </Label>
            <div className="flex flex-wrap gap-2">
              {VEGS.map((v) => (
                <Badge
                  key={v}
                  variant={data.favVegetables.includes(v) ? 'default' : 'outline'}
                  className="cursor-pointer text-sm py-1.5 px-3"
                  onClick={() =>
                    updateData({ favVegetables: toggleArray(data.favVegetables, v, 3) })
                  }
                >
                  {v}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base">O que gosta de comer em cada refeição?</Label>
            {['Café da Manhã', 'Almoço', 'Jantar'].map((meal) => (
              <div key={meal} className="p-4 rounded-xl border bg-muted/10 space-y-3">
                <span className="font-semibold">{meal}</span>
                <div className="flex flex-wrap gap-2">
                  {MEAL_OPTIONS.map((opt) => {
                    const isSelected = data.mealPreferences[meal]?.includes(opt)
                    return (
                      <Badge
                        key={opt}
                        variant={isSelected ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => toggleMealPref(meal, opt)}
                      >
                        {opt}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
