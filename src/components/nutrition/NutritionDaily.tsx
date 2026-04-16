import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { Loader2, BellRing } from 'lucide-react'
import { AddFoodLogDialog } from '@/components/AddFoodLogDialog'
import { deleteFoodLog } from '@/services/food-logger'
import type { DailySummary } from '@/lib/types/food-logger'
import { NutritionSummaryCard } from './NutritionSummaryCard'
import { NutritionLogsList } from './NutritionLogsList'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent } from '@/components/ui/card'

export function NutritionDaily() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [planId, setPlanId] = useState<string | null>(null)
  const [summary, setSummary] = useState<DailySummary | null>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const today = format(new Date(), 'yyyy-MM-dd')

  const loadData = async () => {
    if (!user) return
    setLoading(true)
    try {
      let { data: profile } = await supabase
        .from('nutrition_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()
      if (!profile) return setLoading(false)

      let { data: plan } = await supabase
        .from('nutrition_plans')
        .select('id, target_calories')
        .eq('nutrition_profile_id', profile.id)
        .eq('status', 'active')
        .maybeSingle()
      if (plan) setPlanId(plan.id)

      const { data: sumData } = await supabase
        .from('daily_summaries')
        .select('*')
        .eq('user_id', user.id)
        .eq('summary_date', today)
        .maybeSingle()
      if (sumData) {
        setSummary({
          ...sumData,
          totalCaloriesConsumed: Number(sumData.total_calories_consumed),
          targetCalories: Number(sumData.target_calories),
          caloriesRemaining: Number(sumData.calories_remaining),
          caloriesPercentage: Number(sumData.calories_percentage),
          proteinPercentage: Number(sumData.protein_percentage),
          carbsPercentage: Number(sumData.carbs_percentage),
          fatPercentage: Number(sumData.fat_percentage),
          totalProteinConsumed: Number(sumData.total_protein_consumed),
          totalCarbsConsumed: Number(sumData.total_carbs_consumed),
          totalFatConsumed: Number(sumData.total_fat_consumed),
        } as DailySummary)
      } else {
        setSummary(null)
      }

      const { data: logsData } = await supabase
        .from('food_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('log_date', today)
        .order('created_at', { ascending: false })
      if (logsData) setLogs(logsData)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [user])

  const handleDeleteLog = async (logId: string) => {
    if (!user) return
    try {
      await deleteFoodLog(logId, user.id, today)
      toast({ title: 'Refeição removida', description: 'O saldo calórico foi atualizado.' })
      loadData()
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível remover a refeição.',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex h-[40vh] flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">Sincronizando diário...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card className="bg-blue-500/10 border-none shadow-subtle">
        <CardContent className="p-4 flex items-start gap-3">
          <BellRing className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-700 dark:text-blue-400 text-sm">
              Lembrete de Hidratação
            </h4>
            <p className="text-xs text-blue-600/80 dark:text-blue-300/80 mt-1">
              Você já bebeu água hoje? Faltam 1.5L para atingir sua meta diária.
            </p>
          </div>
        </CardContent>
      </Card>

      <NutritionSummaryCard summary={summary} />
      <NutritionLogsList logs={logs} onDelete={handleDeleteLog} />

      <div className="fixed bottom-24 right-6 z-50 md:hidden">
        <AddFoodLogDialog planId={planId || ''} onLogAdded={loadData} />
      </div>

      <div className="hidden md:flex justify-end mt-4">
        <AddFoodLogDialog planId={planId || ''} onLogAdded={loadData} />
      </div>
    </div>
  )
}
