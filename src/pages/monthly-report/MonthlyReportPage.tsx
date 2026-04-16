import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getMonthlyReport } from '@/services/monthly-update'
import {
  ArrowLeft,
  Download,
  Target,
  TrendingUp,
  Utensils,
  HeartPulse,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MonthlyReportPage() {
  const { reportId } = useParams()
  const [report, setReport] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (reportId) {
      getMonthlyReport(reportId)
        .then((data) => {
          setReport(data)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setIsLoading(false)
        })
    }
  }, [reportId])

  if (isLoading) {
    return (
      <div className="p-8 text-center animate-pulse mt-20 text-muted-foreground">
        Carregando relatório mensal...
      </div>
    )
  }

  if (!report) {
    return (
      <div className="p-8 text-center mt-20 text-muted-foreground">Relatório não encontrado.</div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/progress"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao Progresso
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Relatório Mensal</h1>
          <p className="text-muted-foreground">
            Ciclo {report.period.cycleNumber} •{' '}
            {new Date(report.period.startDate).toLocaleDateString('pt-BR')} a{' '}
            {new Date(report.period.endDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <Button variant="outline" className="gap-2 shrink-0">
          <Download className="w-4 h-4" /> Baixar PDF
        </Button>
      </div>

      <Card className="bg-primary/5 border-primary/20 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            Resumo Executivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base leading-relaxed">{report.summary}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Treino
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Aderência</span>
              <span className="font-semibold">{report.metrics.workout.completionRate}%</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Volume Total</span>
              <span className="font-semibold">{report.metrics.workout.totalReps} reps</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Carga Total</span>
              <span className="font-semibold">{report.metrics.workout.totalWeight} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Progressão</span>
              <span className="font-semibold text-green-500">
                +{report.metrics.workout.progressionPercent}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              Nutrição
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Aderência</span>
              <span className="font-semibold">{report.metrics.nutrition.adherenceRate}%</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Média Calorias</span>
              <span className="font-semibold">
                {report.metrics.nutrition.caloriesConsumed} kcal/dia
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Consistência</span>
              <span className="font-semibold">
                {report.metrics.nutrition.mealPatterns.consistency}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Alimento Frequente</span>
              <span className="font-semibold">
                {report.metrics.nutrition.topFoods[0]?.name || '-'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Biométricos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Peso Inicial</span>
              <span className="font-semibold">{report.metrics.biometrics.weightInitial} kg</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Peso Final</span>
              <span className="font-semibold">{report.metrics.biometrics.weightFinal} kg</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Mudança</span>
              <span
                className={cn(
                  'font-semibold',
                  report.metrics.biometrics.weightChange < 0 ? 'text-green-500' : 'text-orange-500',
                )}
              >
                {report.metrics.biometrics.weightChange} kg (
                {report.metrics.biometrics.weightChangePercent}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Ritmo</span>
              <span className="font-semibold">
                {report.metrics.biometrics.velocityKgPerWeek} kg/sem
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              Saúde e Hábitos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Média Sono</span>
              <span className="font-semibold">{report.metrics.health.avgSleepHours}h / noite</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Hidratação</span>
              <span className="font-semibold">
                {report.metrics.health.avgHydrationLiters} L / dia
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Impacto Sono/Treino</span>
              <span className="font-semibold text-green-500">
                Alto ({(report.metrics.patterns.sleepImpactOnPerformance * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Dias de Maior Aderência</span>
              <span className="font-semibold capitalize">
                {report.metrics.patterns.bestAdherenceDays.join(', ')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">💡 Insights e Análises</h2>
        <div className="grid gap-3">
          {report.metrics.insights.map((insight: any, i: number) => (
            <div
              key={i}
              className="flex gap-3 p-4 rounded-xl border bg-card text-card-foreground shadow-sm"
            >
              <div className="text-xl shrink-0">{insight.icon}</div>
              <div>
                <p className="text-sm font-medium">{insight.message}</p>
                {insight.actionable && (
                  <span className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Recomendação Prática
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">🎯 Próximos Passos</h2>
        <div className="grid gap-3">
          {report.recommendations.map((rec: any, i: number) => (
            <Card key={i}>
              <CardContent className="p-4 flex gap-3">
                <div className="mt-0.5 shrink-0">
                  {rec.priority === 'high' ? (
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    {rec.category}
                  </p>
                  <p className="text-sm">{rec.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {(report.metrics.regenerationDecision.shouldRegenerateTraining ||
        report.metrics.regenerationDecision.shouldRegenerateNutrition) && (
        <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Atualização Automática Gerada</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Com base nos seus resultados deste ciclo, otimizamos sua rotina.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div>
              <p className="font-semibold mb-2">Motivos da regeneração:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-primary-foreground/90 ml-4">
                {report.metrics.regenerationDecision.reasons.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              {report.metrics.regenerationDecision.shouldRegenerateTraining && (
                <Button variant="secondary" asChild>
                  <Link to="/workouts">Ver Novo Treino</Link>
                </Button>
              )}
              {report.metrics.regenerationDecision.shouldRegenerateNutrition && (
                <Button variant="secondary" asChild>
                  <Link to="/nutrition">Ver Novo Cardápio</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
