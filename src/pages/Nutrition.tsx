import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Target, CheckCircle2, Camera, Mic, Type, Trash2 } from 'lucide-react'
import { AddFoodLogDialog } from '@/components/AddFoodLogDialog'
import { deleteFoodLog } from '@/services/food-logger'
import type { DailySummary, FoodLog } from '@/lib/types/food-logger'
import { cn } from '@/lib/utils'

export default function Nutrition() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [planId, setPlanId] = useState<string | null>(null)
  const [summary, setSummary] = useState<DailySummary | null>(null)
  const [logs, setLogs] = useState<FoodLog[]>([])
  const [loading, setLoading] = useState(true)

  const today = format(new Date(), 'yyyy-MM-dd')

  const loadData = async () => {
    if (!user) return
    setLoading(true)

    try {
      // 1. Ensure Profile & Plan for Demo purposes if missing
      let { data: profile } = await supabase
        .from('nutrition_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()
      if (!profile) {
        const { data: newProfile } = await supabase
          .from('nutrition_profiles')
          .insert({
            user_id: user.id,
            gender: 'male',
            date_of_birth: '1990-01-01',
            height_cm: 180,
            current_weight_kg: 80,
            target_weight_kg: 75,
            primary_goal: 'fat_loss',
            fitness_level: 'moderate',
            exercise_types: ['Musculação'],
          })
          .select()
          .single()
        profile = newProfile
      }

      let { data: plan } = await supabase
        .from('nutrition_plans')
        .select('id, target_calories')
        .eq('nutrition_profile_id', profile!.id)
        .eq('status', 'active')
        .maybeSingle()
      if (!plan) {
        const { data: newPlan } = await supabase
          .from('nutrition_plans')
          .insert({
            nutrition_profile_id: profile!.id,
            plan_name: 'Plano IA',
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 90 * 86400000).toISOString(),
            primary_goal: 'fat_loss',
            target_calories: 2200,
            protein_grams: 160,
            carbs_grams: 200,
            fat_grams: 65,
            status: 'active',
          })
          .select()
          .single()
        plan = newPlan
      }
      setPlanId(plan!.id)

      // 2. Fetch Daily Summary
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

      // 3. Fetch Food Logs
      const { data: logsData } = await supabase
        .from('food_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('log_date', today)
        .order('created_at', { ascending: false })
      if (logsData) {
        setLogs(logsData as any[])
      }
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
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">Sincronizando diário alimentar...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up pb-24 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diário de Nutrição IA</h1>
          <p className="text-sm text-muted-foreground mt-1 capitalize font-medium">
            {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
          </p>
        </div>
        <div className="hidden md:block">
          <AddFoodLogDialog planId={planId!} onLogAdded={loadData} />
        </div>
      </div>

      {summary ? (
        <Card
          className={cn(
            'text-primary-foreground border-none shadow-elevation overflow-hidden relative',
            summary.caloriesPercentage > 100
              ? 'bg-red-500'
              : 'bg-gradient-to-br from-[#FF1493] to-[#4B0082]',
          )}
        >
          <div className="absolute -top-10 -right-10 p-4 opacity-10 pointer-events-none">
            <Target className="w-48 h-48" />
          </div>
          <CardContent className="p-6 sm:p-8 relative z-10">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-sm font-medium opacity-90 mb-1">Calorias Restantes</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-6xl font-black tracking-tighter">
                    {Math.max(0, summary.caloriesRemaining)}
                  </h2>
                  <span className="text-base font-medium opacity-80 mb-1">kcal</span>
                </div>
              </div>
              <div className="text-right flex flex-col gap-1">
                <p className="text-sm opacity-90">
                  Consumo:{' '}
                  <span className="font-bold text-base">{summary.totalCaloriesConsumed}</span>
                </p>
                <p className="text-sm opacity-90">
                  Meta: <span className="font-bold text-base">{summary.targetCalories}</span>
                </p>
              </div>
            </div>

            <div className="space-y-5 mt-8 bg-black/10 p-5 rounded-2xl backdrop-blur-sm">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="flex items-center gap-2">
                    Proteína{' '}
                    <span className="opacity-70 text-xs">({summary.totalProteinConsumed}g)</span>
                  </span>
                  <span>{Math.round(summary.proteinPercentage)}%</span>
                </div>
                <Progress
                  value={Math.min(100, summary.proteinPercentage)}
                  className="h-2 bg-black/20 [&>div]:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="flex items-center gap-2">
                      Carbs{' '}
                      <span className="opacity-70 text-xs">({summary.totalCarbsConsumed}g)</span>
                    </span>
                    <span>{Math.round(summary.carbsPercentage)}%</span>
                  </div>
                  <Progress
                    value={Math.min(100, summary.carbsPercentage)}
                    className="h-2 bg-black/20 [&>div]:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="flex items-center gap-2">
                      Gordura{' '}
                      <span className="opacity-70 text-xs">({summary.totalFatConsumed}g)</span>
                    </span>
                    <span>{Math.round(summary.fatPercentage)}%</span>
                  </div>
                  <Progress
                    value={Math.min(100, summary.fatPercentage)}
                    className="h-2 bg-black/20 [&>div]:bg-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-muted/30 border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-muted-foreground opacity-70" />
            </div>
            <p className="text-foreground font-semibold text-lg">Nenhum registro hoje</p>
            <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-[250px]">
              Tire uma foto ou grave um áudio da sua refeição para começar o rastreamento.
            </p>
            <div className="md:hidden">
              <AddFoodLogDialog planId={planId!} onLogAdded={loadData} />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="font-semibold text-xl flex items-center gap-2">
          Refeições Registradas
          {logs.length > 0 && (
            <span className="bg-primary/10 text-primary text-xs font-bold py-1 px-2.5 rounded-full">
              {logs.length}
            </span>
          )}
        </h3>

        {logs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {logs.map((log) => (
              <Card
                key={log.id}
                className="shadow-subtle border-border/50 overflow-hidden hover:shadow-elevation transition-shadow"
              >
                <div className="w-1.5 bg-gradient-to-b from-[#FF1493] to-[#4B0082] h-full absolute left-0 top-0"></div>
                <CardContent className="p-5 pl-7">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        {log.input_method === 'photo' ? (
                          <Camera className="w-3.5 h-3.5" />
                        ) : log.input_method === 'audio' ? (
                          <Mic className="w-3.5 h-3.5" />
                        ) : (
                          <Type className="w-3.5 h-3.5" />
                        )}
                        {log.log_time?.substring(0, 5)}
                      </span>
                      {log.ai_confidence > 0.8 && (
                        <span className="flex items-center text-[10px] uppercase tracking-wider text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full font-bold">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> IA Confirmada
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-lg text-primary">
                        {log.total_calories} kcal
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteLog(log.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {log.foods.map((f: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm items-center border-b border-border/50 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="font-medium text-foreground">
                          {f.quantity}
                          {f.unit} {f.foodName}
                        </span>
                        <span className="text-muted-foreground text-xs font-medium bg-muted px-2 py-0.5 rounded">
                          {f.calories} kcal
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> P:{' '}
                      {log.total_protein_grams}g
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span> C:{' '}
                      {log.total_carbs_grams}g
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span> G:{' '}
                      {log.total_fat_grams}g
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          summary && (
            <div className="bg-muted/20 border border-dashed border-border/50 rounded-2xl p-8 flex flex-col items-center text-center">
              <p className="text-muted-foreground font-medium">
                Nenhuma refeição registrada ainda hoje.
              </p>
            </div>
          )
        )}
      </div>

      <div className="fixed bottom-24 right-6 z-50 md:hidden">
        <AddFoodLogDialog planId={planId!} onLogAdded={loadData} />
      </div>
    </div>
  )
}
