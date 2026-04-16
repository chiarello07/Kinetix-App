import type { AnalysisResult } from '@/lib/types/analysis'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, BookOpen, CheckCircle, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useWorkoutStore } from '@/stores/use-workout-store'
import { useNavigate } from 'react-router-dom'
import { Loader2, Dumbbell } from 'lucide-react'

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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in p-4 pb-20">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Score Card */}
        <Card className="flex-1 bg-gradient-to-br from-card to-card/50 shadow-elevation border-t-4 border-t-[#FF1493]">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg text-muted-foreground uppercase tracking-wider">
              Score Postural
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pb-8">
            <div className="relative w-48 h-48 flex items-center justify-center my-4">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/30"
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
                />
              </svg>
              <div className="text-center flex flex-col items-center">
                <span
                  className={cn(
                    'text-6xl font-black tracking-tighter',
                    getScoreColor(result.score),
                  )}
                >
                  {result.score}
                </span>
                <span className="text-sm font-semibold uppercase mt-1 text-muted-foreground">
                  {result.category}
                </span>
              </div>
            </div>

            {result.requiresMedicalClearance && (
              <div className="mt-4 flex items-center text-red-500 bg-red-50 dark:bg-red-950/30 px-4 py-2 rounded-lg text-sm font-medium w-full justify-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Avaliação médica recomendada
              </div>
            )}
          </CardContent>
        </Card>

        {/* Angles Card */}
        <Card className="flex-1 shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-[#4B0082]" />
              Ângulos Biomecânicos
            </CardTitle>
            <CardDescription>Cálculos trigonométricos baseados em IA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result.angles).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center border-b pb-2 last:border-0"
              >
                <span className="text-sm font-medium capitalize text-muted-foreground">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="font-bold text-lg">{value.toFixed(1)}°</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold px-1 text-foreground/90 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2 text-[#FF1493]" />
          Desvios Encontrados ({result.deviations.length})
        </h3>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {result.deviations.map((dev) => (
            <AccordionItem
              key={dev.id}
              value={dev.id}
              className="border bg-card rounded-lg px-4 shadow-sm"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-semibold text-left">{dev.name}</span>
                  <Badge
                    variant="outline"
                    className={cn('ml-4 border-0 font-bold', getSeverityBadge(dev.severity))}
                  >
                    {dev.severity}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center text-sm">
                    <BookOpen className="w-4 h-4 mr-2 text-[#FF1493]" />
                    Referência Científica
                  </h4>
                  <p className="text-sm italic pl-6">{dev.reference}</p>
                </div>
                <div className="pt-2 border-t">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">
                    Recomendações Corretivas:
                  </h4>
                  <ul className="list-disc pl-6 space-y-1">
                    {dev.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm">
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

      <div className="flex flex-col md:flex-row justify-center pt-8 gap-4">
        <Button
          size="lg"
          onClick={handleGenerateWorkout}
          disabled={isGenerating}
          className="w-full md:w-auto px-8 bg-gradient-to-r from-[#FF1493] to-[#4B0082] hover:opacity-90 shadow-lg text-white font-bold"
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Dumbbell className="w-5 h-5 mr-2" />
          )}
          {isGenerating ? 'Gerando Plano Científico...' : 'Gerar Treino Corretivo'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          className="w-full md:w-auto px-8"
          disabled={isGenerating}
        >
          Nova Análise
        </Button>
      </div>
    </div>
  )
}
