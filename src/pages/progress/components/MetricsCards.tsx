import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Dumbbell, Clock, Flame, Utensils, Beef, Wheat, Droplet } from 'lucide-react'

export function MetricsCardsWorkout({ metrics }: { metrics: any }) {
  if (!metrics) return null
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
        <Dumbbell className="h-5 w-5" /> Treino
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Reps"
          value={metrics.totalReps.toLocaleString()}
          sub="reps completadas"
          icon={Activity}
        />
        <MetricCard
          title="Carga Total"
          value={`${(metrics.totalWeight / 1000).toFixed(1)}k`}
          sub="kg levantados"
          icon={Dumbbell}
        />
        <MetricCard
          title="Tempo Total"
          value={`${Math.floor(metrics.totalTime / 3600)}h ${Math.floor((metrics.totalTime % 3600) / 60)}m`}
          sub="treinando"
          icon={Clock}
        />
        <MetricCard
          title="Queimadas"
          value={metrics.caloriesBurned.toLocaleString()}
          sub="kcal estimadas"
          icon={Flame}
        />
      </div>
    </div>
  )
}

export function MetricsCardsNutrition({ metrics }: { metrics: any }) {
  if (!metrics) return null
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
        <Utensils className="h-5 w-5" /> Nutrição
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Calorias Consumidas"
          value={metrics.caloriesConsumed.toLocaleString()}
          sub={`${metrics.adherenceRate}% aderência`}
          icon={Flame}
        />
        <MetricCard
          title="Proteína"
          value={`${metrics.proteinConsumed}g`}
          sub="consumidas"
          icon={Beef}
        />
        <MetricCard
          title="Carboidratos"
          value={`${metrics.carbsConsumed}g`}
          sub="consumidos"
          icon={Wheat}
        />
        <MetricCard
          title="Gorduras"
          value={`${metrics.fatConsumed}g`}
          sub="consumidas"
          icon={Droplet}
        />
      </div>
    </div>
  )
}

function MetricCard({ title, value, sub, icon: Icon }: any) {
  return (
    <Card className="shadow-subtle border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{sub}</p>
      </CardContent>
    </Card>
  )
}
