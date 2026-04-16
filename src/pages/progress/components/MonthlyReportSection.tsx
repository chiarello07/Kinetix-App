import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MonthlyReportSection({ report }: { report: any }) {
  if (!report) return null

  return (
    <Card className="mt-8 shadow-subtle border-border/50 overflow-hidden">
      <CardHeader className="bg-muted/30 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Relatório Mensal Integrado</CardTitle>
            <CardDescription>{report.period.label}</CardDescription>
          </div>
          <Button variant="outline" className="shrink-0 gap-2">
            <Download className="h-4 w-4" /> Baixar PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-b">
          <div className="p-6 space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Treino
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Completados:</span>{' '}
                <span className="font-medium">
                  {report.workout.workoutsCompleted}/{report.workout.totalWorkouts}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Volume Total:</span>{' '}
                <span className="font-medium">{report.workout.totalReps} reps</span>
              </li>
              <li className="flex justify-between">
                <span>Carga Total:</span>{' '}
                <span className="font-medium">{report.workout.totalWeight} kg</span>
              </li>
              <li className="flex justify-between">
                <span>Queimadas:</span>{' '}
                <span className="font-medium">{report.workout.caloriesBurned} kcal</span>
              </li>
            </ul>
          </div>
          <div className="p-6 space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Nutrição
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Aderência:</span>{' '}
                <span className="font-medium">{report.nutrition.adherenceRate}%</span>
              </li>
              <li className="flex justify-between">
                <span>Consumidas:</span>{' '}
                <span className="font-medium">{report.nutrition.caloriesConsumed} kcal</span>
              </li>
              <li className="flex justify-between">
                <span>Proteína:</span>{' '}
                <span className="font-medium">{report.nutrition.proteinConsumed}g</span>
              </li>
              <li className="flex justify-between">
                <span>Refeições:</span>{' '}
                <span className="font-medium">
                  {report.nutrition.mealsCompleted}/{report.nutrition.mealsLogged}
                </span>
              </li>
            </ul>
          </div>
          <div className="p-6 space-y-4 bg-muted/10">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Comparação (vs Sem 1)
            </h3>
            <ul className="space-y-3 text-sm">
              <ComparisonItem label="Volume" val={report.comparison.repsChange} />
              <ComparisonItem label="Carga" val={report.comparison.weightChange} />
              <ComparisonItem label="Tempo" val={report.comparison.timeChange} />
              <ComparisonItem label="Aderência" val={report.comparison.nutritionAdherenceChange} />
            </ul>
          </div>
        </div>

        <div className="p-6 bg-background">
          <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider">
            Insights e Recomendações
          </h3>
          <div className="grid gap-3">
            {report.insights.map((insight: any, i: number) => (
              <div
                key={i}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl border',
                  insight.type === 'positive'
                    ? 'bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-400'
                    : insight.type === 'warning'
                      ? 'bg-orange-500/5 border-orange-500/20 text-orange-700 dark:text-orange-400'
                      : 'bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-400',
                )}
              >
                <span className="text-lg leading-none">{insight.icon}</span>
                <p className="text-sm font-medium">{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ComparisonItem({ label, val }: { label: string; val: number }) {
  const isPos = val > 0
  return (
    <li className="flex justify-between items-center">
      <span>{label}:</span>
      <span
        className={cn(
          'font-medium flex items-center gap-1',
          isPos ? 'text-green-500' : 'text-red-500',
        )}
      >
        {isPos ? '+' : ''}
        {val}%
      </span>
    </li>
  )
}
