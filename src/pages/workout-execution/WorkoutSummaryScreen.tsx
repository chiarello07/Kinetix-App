import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Flame, Clock, BarChart3, Dumbbell, Activity, Check } from 'lucide-react'

export function WorkoutSummaryScreen({ summary, onFinish }: any) {
  const {
    totalTime,
    totalVolume,
    totalWeight,
    caloriesBurned,
    borgRPE,
    message,
    nutritionSummary,
    exercisesSummary,
  } = summary

  return (
    <div className="p-4 pb-24 animate-fade-in max-w-lg mx-auto bg-background">
      <div className="text-center mb-8 pt-8">
        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Check className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black mb-3 tracking-tight">Treino Concluído!</h1>
        <p className="text-muted-foreground font-medium text-lg leading-relaxed">{message}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <MetricCard
          icon={<Clock className="w-5 h-5" />}
          label="Tempo"
          value={`${Math.round(totalTime / 60)} min`}
        />
        <MetricCard
          icon={<BarChart3 className="w-5 h-5" />}
          label="Volume"
          value={`${totalVolume} reps`}
        />
        <MetricCard
          icon={<Dumbbell className="w-5 h-5" />}
          label="Carga"
          value={`${totalWeight} kg`}
        />
        <MetricCard
          icon={<Flame className="w-5 h-5" />}
          label="Queima"
          value={`~${caloriesBurned} kcal`}
        />
        <MetricCard
          icon={<Activity className="w-5 h-5" />}
          label="Esforço (RPE)"
          value={`${borgRPE}/10`}
          className="col-span-2 bg-primary/5 border-primary/20"
          valueClass="text-primary"
        />
      </div>

      {nutritionSummary && (
        <Card className="p-5 mb-8 border-primary/30 bg-primary/5 shadow-subtle">
          <h3 className="font-black flex items-center gap-2 mb-5 text-xl tracking-tight text-primary">
            <Activity className="w-6 h-6" /> Balanço Nutricional
          </h3>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-muted-foreground">Queimadas (Treino):</span>
              <span className="font-black text-green-600 text-base">+{caloriesBurned} kcal</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-muted-foreground">Consumidas (Refeições):</span>
              <span className="font-black text-red-500 text-base">
                -{nutritionSummary.caloriesConsumed} kcal
              </span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between items-center font-black text-lg">
              <span>Balanço Líquido:</span>
              <span
                className={
                  nutritionSummary.caloriesBalance < 0 ? 'text-orange-500' : 'text-blue-500'
                }
              >
                {nutritionSummary.caloriesBalance > 0 ? '+' : ''}
                {nutritionSummary.caloriesBalance} kcal
              </span>
            </div>
            <div className="text-sm text-center p-3 bg-background rounded-lg font-bold uppercase tracking-widest mt-2 border shadow-sm">
              Status:{' '}
              <span className="text-primary">
                {nutritionSummary.balanceStatus === 'deficit'
                  ? 'Deficit Calórico'
                  : nutritionSummary.balanceStatus === 'maintenance'
                    ? 'Manutenção'
                    : 'Superávit'}
              </span>
            </div>
          </div>

          <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">
            Aderência de Macros
          </h4>
          <div className="space-y-4 mb-8">
            <MacroProgress label="Proteína" value={nutritionSummary.macrosAdherence.protein} />
            <MacroProgress label="Carboidrato" value={nutritionSummary.macrosAdherence.carbs} />
            <MacroProgress label="Gordura" value={nutritionSummary.macrosAdherence.fat} />
          </div>

          <div className="bg-background p-4 rounded-xl border shadow-sm text-sm">
            <span className="font-black block mb-2 text-primary flex items-center gap-2">
              💡 Recomendação Pro:
            </span>
            <span className="text-muted-foreground font-medium leading-relaxed">
              {nutritionSummary.nutritionRecommendation}
            </span>
          </div>
        </Card>
      )}

      <div className="mb-8">
        <h3 className="font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground">
          Resumo dos Exercícios
        </h3>
        <div className="space-y-2">
          {exercisesSummary?.map((ex: any, i: number) => (
            <div
              key={i}
              className="flex justify-between text-sm font-medium p-3 bg-secondary/30 rounded-lg"
            >
              <span className="truncate pr-4">{ex.name}</span>
              <span className="shrink-0 tabular-nums">
                {ex.sets}×{ex.reps} @ {ex.weight}kg
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-10">
        <Button size="lg" className="w-full h-14 text-lg font-bold shadow-xl" onClick={onFinish}>
          Finalizar e Salvar <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

function MacroProgress({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-2 font-bold uppercase tracking-wide">
        <span>{label}</span>
        <span className="text-primary">{value}%</span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  )
}

function MetricCard({ icon, label, value, className = '', valueClass = '' }: any) {
  return (
    <Card
      className={`p-5 flex flex-col items-center justify-center text-center shadow-subtle ${className}`}
    >
      <div className="text-muted-foreground mb-3">{icon}</div>
      <div className={`text-2xl font-black tabular-nums tracking-tight ${valueClass}`}>{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
        {label}
      </div>
    </Card>
  )
}
