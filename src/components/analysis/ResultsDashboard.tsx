import { useMemo } from 'react'
import type { AnalysisResult } from '@/lib/types/analysis'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Activity,
  Loader2,
  Dumbbell,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useWorkoutStore } from '@/stores/use-workout-store'
import { useNavigate } from 'react-router-dom'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface ResultsDashboardProps {
  result: AnalysisResult
  onReset: () => void
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  const { generateWorkout, isGenerating } = useWorkoutStore()
  const navigate = useNavigate()

  const handleGenerateWorkout = async () => {
    try {
      await generateWorkout(result.id, result.deviations)
      navigate('/workouts')
    } catch (e) {
      // Error handled in store
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 75) return 'text-blue-500'
    if (score >= 60) return 'text-amber-500'
    return 'text-red-500'
  }

  const getSeverityBadge = (severity: string) => {
    const styles = {
      Mild: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      Moderate: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      Severe: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    }
    return styles[severity as keyof typeof styles] || styles.Mild
  }

  const radarData = useMemo(() => {
    return Object.entries(result.angles).map(([key, value]) => ({
      angle: key.replace(/([A-Z])/g, ' $1').trim(),
      graus: Math.round(value),
    }))
  }, [result.angles])

  const chartConfig = {
    graus: {
      label: 'Graus (°)',
      color: 'hsl(var(--primary))',
    },
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in-up p-4 pb-20">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] to-[#4B0082]">
          Análise Inteligente Concluída
        </h2>
        <p className="text-muted-foreground text-lg">
          Confira os resultados da sua avaliação postural e biomecânica.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Score Card */}
        <Card className="flex flex-col overflow-hidden shadow-elevation border-t-4 border-t-[#FF1493]">
          <CardHeader className="text-center pb-2 bg-secondary/30">
            <CardTitle className="text-lg text-foreground uppercase tracking-wider flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF1493]" />
              Score Postural
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center flex-1 py-8">
            <div className="relative w-56 h-56 flex items-center justify-center my-4 drop-shadow-xl">
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-md"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${result.score * 2.83} 283`}
                  className={cn('transition-all duration-1000', getScoreColor(result.score))}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center flex flex-col items-center z-10 bg-background/50 rounded-full w-40 h-40 justify-center backdrop-blur-sm">
                <span
                  className={cn(
                    'text-5xl font-black tracking-tighter',
                    getScoreColor(result.score),
                  )}
                >
                  {result.score}
                  <span className="text-xl text-muted-foreground/50">/100</span>
                </span>
                <span className="text-xs font-bold uppercase mt-1 text-foreground/80">
                  {result.category}
                </span>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-4 max-w-xs text-sm">
              {result.score >= 80
                ? 'Bom alinhamento geral. Pequenos desvios detectados para correção.'
                : 'Desvios detectados. Recomendamos foco na correção postural.'}
            </p>

            {result.requiresMedicalClearance && (
              <div className="mt-6 flex items-center text-red-500 bg-red-50 dark:bg-red-950/30 px-4 py-3 rounded-lg text-sm font-medium w-full justify-center border border-red-200 dark:border-red-900/50">
                <AlertTriangle className="w-5 h-5 mr-2 shrink-0" />
                Avaliação médica recomendada antes do treino
              </div>
            )}
          </CardContent>
        </Card>

        {/* Angles Radar Chart */}
        <Card className="flex flex-col shadow-subtle border-t-4 border-t-[#4B0082]">
          <CardHeader className="bg-secondary/30">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#4B0082]" />
              Análise Biomecânica
            </CardTitle>
            <CardDescription>Mapeamento vetorial das articulações</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pt-6 px-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full mx-auto">
              <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                <PolarAngleAxis
                  dataKey="angle"
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 600 }}
                />
                <Radar
                  name="Graus"
                  dataKey="graus"
                  stroke="#4B0082"
                  fill="url(#colorGradient)"
                  fillOpacity={0.6}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF1493" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4B0082" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-2xl font-bold px-1 text-foreground/90 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2 text-[#FF1493]" />
          Desvios Detectados ({result.deviations.length})
        </h3>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {result.deviations.map((dev) => (
            <AccordionItem
              key={dev.id}
              value={dev.id}
              className="border bg-card rounded-lg px-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center justify-between w-full pr-4 gap-4">
                  <span className="font-semibold text-left line-clamp-2">{dev.name}</span>
                  <Badge
                    variant="outline"
                    className={cn('shrink-0 border-0 font-bold', getSeverityBadge(dev.severity))}
                  >
                    {dev.severity}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4 space-y-5">
                <div className="bg-secondary/30 p-4 rounded-md">
                  <p className="text-sm text-foreground/90">
                    {dev.description ||
                      'Desvio identificado pela IA com base no cruzamento de dados articulares e visuais.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center text-sm">
                    <BookOpen className="w-4 h-4 mr-2 text-[#FF1493]" />
                    Referência Científica
                  </h4>
                  <p className="text-sm italic pl-6 border-l-2 border-primary/30 py-1">
                    {dev.reference}
                  </p>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-semibold text-foreground mb-3 text-sm">
                    Recomendações Corretivas:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2">
                    {dev.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm leading-relaxed">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex flex-col md:flex-row justify-center pt-8 gap-4 pb-8">
        <Button
          size="lg"
          onClick={handleGenerateWorkout}
          disabled={isGenerating}
          className="w-full md:w-auto px-10 py-7 text-lg bg-gradient-to-r from-[#FF1493] to-[#4B0082] hover:opacity-90 shadow-xl shadow-primary/20 text-white font-bold rounded-full transition-transform active:scale-95"
        >
          {isGenerating ? (
            <Loader2 className="w-6 h-6 mr-3 animate-spin" />
          ) : (
            <Dumbbell className="w-6 h-6 mr-3" />
          )}
          {isGenerating ? 'Gerando Plano Personalizado...' : 'Acessar Meu Treino'}
        </Button>
      </div>
    </div>
  )
}
