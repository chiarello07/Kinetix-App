import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getMonthlyReports, executeMonthlyUpdate } from '@/services/monthly-update'
import { useAuth } from '@/hooks/use-auth'
import { Sparkles, CalendarDays, Loader2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function MonthlyUpdateSection() {
  const { user } = useAuth()
  const [reports, setReports] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      loadReports()
    }
  }, [user?.id])

  const loadReports = async () => {
    try {
      const data = await getMonthlyReports(user!.id)
      setReports(data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    toast.info('Analisando seus dados e gerando relatório mensal...')
    try {
      await executeMonthlyUpdate(user!.id)
      toast.success('Atualização Mensal concluída!')
      await loadReports()
    } catch (error) {
      toast.error('Erro ao gerar atualização.')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) return null

  const latestReport = reports[0]

  return (
    <Card className="mb-8 border-primary/20 bg-primary/5 shadow-sm overflow-hidden relative animate-fade-in-up">
      <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
        <Sparkles className="w-32 h-32" />
      </div>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-primary">
              <CalendarDays className="w-5 h-5" />
              Atualização Mensal Inteligente
            </CardTitle>
            <CardDescription className="text-primary/80 mt-1">
              Análise completa com IA dos seus últimos 30 dias de progresso.
            </CardDescription>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="shrink-0 gap-2 shadow-sm"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {reports.length > 0 ? 'Gerar Novo Relatório' : 'Iniciar Primeira Análise'}
          </Button>
        </div>
      </CardHeader>

      {latestReport && (
        <CardContent>
          <div className="bg-background rounded-xl p-4 border shadow-sm relative z-10">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 pb-4 border-b">
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Último Relatório
                </h4>
                <p className="font-medium">
                  Ciclo {latestReport.cycle_number} •{' '}
                  {new Date(latestReport.end_date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center md:text-right">
                  <p className="text-xs text-muted-foreground">Progresso</p>
                  <p className="font-bold text-green-500">
                    +{latestReport.metrics?.workout?.progressionPercent || 0}%
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-xs text-muted-foreground">Aderência</p>
                  <p className="font-bold text-blue-500">
                    {latestReport.metrics?.nutrition?.adherenceRate || 0}%
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {latestReport.summary}
            </p>

            <Button variant="outline" asChild className="w-full sm:w-auto gap-2">
              <Link to={`/monthly-report/${latestReport.id}`}>
                Ver Análise Completa <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
