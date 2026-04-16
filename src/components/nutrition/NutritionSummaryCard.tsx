import { Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { DailySummary } from '@/lib/types/food-logger'
import { cn } from '@/lib/utils'

export function NutritionSummaryCard({ summary }: { summary: DailySummary | null }) {
  if (!summary) {
    return (
      <Card className="bg-muted/30 border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-muted-foreground opacity-70" />
          </div>
          <p className="text-foreground font-semibold text-lg">Nenhum registro hoje</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">
            Tire uma foto ou grave um áudio da sua refeição para começar o rastreamento.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'text-primary-foreground border-none shadow-elevation overflow-hidden relative',
        summary.caloriesPercentage > 100
          ? 'bg-red-500'
          : 'bg-gradient-to-br from-[#FF1493] to-[#4B0082]',
      )}
    >
      <div className="absolute -top-10 -right-10 p-4 opacity-10 pointer-events-none">
        <Target className="w-48 h-48" />
      </div>
      <CardContent className="p-6 sm:p-8 relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-sm font-medium opacity-90 mb-1">Calorias Restantes</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-6xl font-black tracking-tighter">
                {Math.max(0, summary.caloriesRemaining)}
              </h2>
              <span className="text-base font-medium opacity-80 mb-1">kcal</span>
            </div>
          </div>
          <div className="text-right flex flex-col gap-1">
            <p className="text-sm opacity-90">
              Consumo: <span className="font-bold text-base">{summary.totalCaloriesConsumed}</span>
            </p>
            <p className="text-sm opacity-90">
              Meta: <span className="font-bold text-base">{summary.targetCalories}</span>
            </p>
          </div>
        </div>

        <div className="space-y-5 mt-8 bg-black/10 p-5 rounded-2xl backdrop-blur-sm">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                Proteína{' '}
                <span className="opacity-70 text-xs">({summary.totalProteinConsumed}g)</span>
              </span>
              <span>{Math.round(summary.proteinPercentage)}%</span>
            </div>
            <Progress
              value={Math.min(100, summary.proteinPercentage)}
              className="h-2 bg-black/20 [&>div]:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="flex items-center gap-2">
                  Carbs <span className="opacity-70 text-xs">({summary.totalCarbsConsumed}g)</span>
                </span>
                <span>{Math.round(summary.carbsPercentage)}%</span>
              </div>
              <Progress
                value={Math.min(100, summary.carbsPercentage)}
                className="h-2 bg-black/20 [&>div]:bg-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="flex items-center gap-2">
                  Gordura <span className="opacity-70 text-xs">({summary.totalFatConsumed}g)</span>
                </span>
                <span>{Math.round(summary.fatPercentage)}%</span>
              </div>
              <Progress
                value={Math.min(100, summary.fatPercentage)}
                className="h-2 bg-black/20 [&>div]:bg-white"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
