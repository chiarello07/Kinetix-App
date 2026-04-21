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
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LineChart, Dumbbell, Utensils } from 'lucide-react'

export default function ProgressPage() {
  const { user } = useAuth()
  const [period, setPeriod] = useState('last30days')
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (!user) return
    fetchMetrics()
  }, [period, user])

  const fetchMetrics = async () => {
    setIsLoading(true)
    try {
      const { data: metricsData } = await supabase
        .from('progress_metrics')
        .select('*')
        .eq('user_id', user!.id)
        .order('date', { ascending: false })
        .limit(30)

      const workoutMetrics = {
        totalWorkouts:
          metricsData?.reduce((acc, curr) => acc + (curr.workouts_completed || 0), 0) || 0,
        totalReps: metricsData?.reduce((acc, curr) => acc + (curr.total_reps || 0), 0) || 0,
        totalVolume: metricsData?.reduce((acc, curr) => acc + (curr.total_weight || 0), 0) || 0,
        activeStreak: 0,
        personalRecords: 0,
      }

      const nutritionMetrics = {
        mealsLogged: metricsData?.reduce((acc, curr) => acc + (curr.meals_completed || 0), 0) || 0,
        adherence: metricsData?.length
          ? Math.round(
              metricsData.reduce((acc, curr) => acc + (curr.nutrition_adherence_rate || 0), 0) /
                metricsData.length,
            )
          : 0,
        totalCalories:
          metricsData?.reduce((acc, curr) => acc + (curr.total_calories_consumed || 0), 0) || 0,
        proteinGoalHit: 0,
        waterGoalHit: 0,
      }

      setData({
        metrics: {
          workout: workoutMetrics,
          nutrition: nutritionMetrics,
          calorieBalance: metricsData?.[0]?.calorie_balance || 0,
        },
        graphs: [],
        report: null,
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const hasData =
    data &&
    (data.metrics.workout.totalWorkouts > 0 ||
      data.metrics.nutrition.mealsLogged > 0 ||
      data.metrics.workout.totalVolume > 0 ||
      data.metrics.nutrition.totalCalories > 0)

  if (!isLoading && !hasData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 animate-fade-in-up">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary shadow-sm">
          <LineChart className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-3 tracking-tight">Seu progresso começa aqui!</h2>
        <p className="text-muted-foreground max-w-md mb-10 text-lg">
          Registre seus treinos e refeições para que a IA gere análises e gráficos inteligentes da
          sua evolução.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button asChild size="lg" className="h-14 px-8 font-bold text-lg">
            <Link to="/workouts">
              <Dumbbell className="w-5 h-5 mr-2" /> Iniciar Treino
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-8 font-bold text-lg">
            <Link to="/nutrition">
              <Utensils className="w-5 h-5 mr-2" /> Registrar Refeição
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 p-6 pb-24 max-w-6xl mx-auto animate-fade-in-up">
      <MonthlyUpdateSection />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seu Progresso</h1>
          <p className="text-muted-foreground mt-1">
            <br />
          </p>
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
