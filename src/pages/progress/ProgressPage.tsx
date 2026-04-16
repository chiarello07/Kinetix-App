import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MetricsCardsWorkout, MetricsCardsNutrition } from './components/MetricsCards'
import { CalorieBalanceCard } from './components/CalorieBalanceCard'
import { ProgressGraphs } from './components/ProgressGraphs'
import { MonthlyReportSection } from './components/MonthlyReportSection'
import { MonthlyUpdateSection } from './components/MonthlyUpdateSection'
import { mockMetrics, mockReport, mockGraphs } from './data'

export default function ProgressPage() {
  const [period, setPeriod] = useState('last30days')
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)
    // Simulating API call latency
    const timer = setTimeout(() => {
      setData({ metrics: mockMetrics, report: mockReport, graphs: mockGraphs })
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [period])

  return (
    <div className="flex flex-col gap-2 p-6 pb-24 max-w-6xl mx-auto animate-fade-in-up">
      <MonthlyUpdateSection />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seu Progresso</h1>
          <p className="text-muted-foreground mt-1">Treino + Nutrição Integrados</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px] shadow-sm">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7days">Últimos 7 dias</SelectItem>
            <SelectItem value="last30days">Últimos 30 dias</SelectItem>
            <SelectItem value="all">Todo o período</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading || !data ? (
        <div className="py-20 text-center text-muted-foreground animate-pulse">
          Calculando suas métricas integradas...
        </div>
      ) : (
        <div className="animate-fade-in">
          <MetricsCardsWorkout metrics={data.metrics.workout} />
          <MetricsCardsNutrition metrics={data.metrics.nutrition} />
          <CalorieBalanceCard balance={data.metrics.calorieBalance} />
          <ProgressGraphs graphs={data.graphs} />
          <MonthlyReportSection report={data.report} />
        </div>
      )}
    </div>
  )
}
