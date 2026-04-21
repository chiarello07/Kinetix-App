import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Apple,
  Droplet,
  Flame,
  Activity,
  BrainCircuit,
  ChevronLeft,
  Zap,
  Beef,
  Wheat,
  Sandwich,
  CheckCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { generateNutritionPlan } from '@/services/nutrition-plan'
import { cn } from '@/lib/utils'

export default function NutritionPlanPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [profileId, setProfileId] = useState<string | null>(null)
  const [plan, setPlan] = useState<any>(null)
  const [meals, setMeals] = useState<any[]>([])
  const [supplements, setSupplements] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('nutrition_profiles')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (profile) {
        setProfileId(profile.id)
        const { data: latestPlan } = await supabase
          .from('nutrition_plans')
          .select('*')
          .eq('nutrition_profile_id', profile.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (latestPlan) {
          setPlan(latestPlan)
          const { data: mealData } = await supabase
            .from('meal_plans')
            .select('*')
            .eq('nutrition_plan_id', latestPlan.id)
            .order('meal_number', { ascending: true })

          setMeals(mealData || [])

          const { data: suppData } = await supabase
            .from('supplementation_plans')
            .select('*')
            .eq('nutrition_plan_id', latestPlan.id)

          setSupplements(suppData || [])
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!profileId) {
      toast.error('Nenhum perfil nutricional encontrado. Faça o onboarding primeiro.')
      return
    }
    setGenerating(true)
    try {
      await generateNutritionPlan(profileId)
      toast.success('Plano gerado com sucesso!')
      await loadData()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao gerar plano. Tente novamente mais tarde.')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground font-medium">Carregando plano...</p>
      </div>
    )
  }

  if (generating) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 animate-fade-in">
        <BrainCircuit className="w-16 h-16 text-primary animate-pulse mb-6" />
        <h2 className="text-2xl font-bold mb-2">Calculando Nutrientes</h2>
        <p className="text-muted-foreground text-center max-w-sm">
          Estamos cruzando seus dados metabólicos, estilo de vida e objetivos para criar o cardápio
          perfeito.
        </p>
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="max-w-[600px] mx-auto min-h-[60vh] flex flex-col items-center justify-center px-4 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Apple className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Seu Plano Nutricional</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Transforme seus dados de onboarding e anamnese em um plano de refeições completo e
          periodizado.
        </p>
        <Button
          onClick={handleGenerate}
          size="lg"
          className="h-14 px-8 text-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
        >
          <Activity className="mr-2 h-5 w-5" />
          Gerar Plano Agora
        </Button>
      </div>
    )
  }

  const mealTypeMap: Record<string, string> = {
    breakfast: 'Café da Manhã',
    lunch: 'Almoço',
    snack: 'Lanche',
    dinner: 'Jantar',
    supper: 'Ceia',
  }

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6 pb-24 space-y-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/nutrition')}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Plano Nutricional</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">
            Objetivo: {plan.primary_goal}
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 rounded-xl h-14">
          <TabsTrigger value="overview" className="rounded-lg h-full font-semibold">
            Resumo
          </TabsTrigger>
          <TabsTrigger value="meals" className="rounded-lg h-full font-semibold">
            Cardápio
          </TabsTrigger>
          <TabsTrigger value="supplements" className="rounded-lg h-full font-semibold">
            Suplementos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-primary text-primary-foreground border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-primary-foreground/80 font-medium mb-1">Alvo Diário</p>
                    <p className="text-4xl font-bold">
                      {Math.round(plan.target_calories)}{' '}
                      <span className="text-xl font-normal opacity-80">kcal</span>
                    </p>
                  </div>
                  <div className="p-3 bg-primary-foreground/20 rounded-xl">
                    <Flame className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm opacity-90 pt-2 border-t border-primary-foreground/10">
                  <span className="flex items-center gap-1">
                    <Activity className="w-4 h-4" /> GET:{' '}
                    {Math.round(plan.total_daily_energy_expenditure)} kcal
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4" /> GEB: {Math.round(plan.basal_metabolic_rate)} kcal
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-subtle">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Hidratação Mínima</p>
                    <p className="text-3xl font-bold text-foreground">
                      {plan.water_liters_per_day?.toFixed(1)}{' '}
                      <span className="text-xl font-normal text-muted-foreground">L/dia</span>
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                    <Droplet className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Volume calculado e ajustado para seu nível de atividade física.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 shadow-subtle">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Distribuição de Macronutrientes</CardTitle>
              <CardDescription>
                Divisão calculada para otimizar sua resposta metabólica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold flex items-center gap-2">
                    <Beef className="w-4 h-4 text-rose-500" /> Proteínas
                  </span>
                  <span className="font-bold">{Math.round(plan.protein_grams)}g</span>
                </div>
                <Progress value={30} className="h-2 bg-muted" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold flex items-center gap-2">
                    <Wheat className="w-4 h-4 text-amber-500" /> Carboidratos
                  </span>
                  <span className="font-bold">{Math.round(plan.carbs_grams)}g</span>
                </div>
                <Progress value={45} className="h-2 bg-muted" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-yellow-500" /> Gorduras
                  </span>
                  <span className="font-bold">{Math.round(plan.fat_grams)}g</span>
                </div>
                <Progress value={25} className="h-2 bg-muted" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meals" className="space-y-6 animate-fade-in-up">
          {meals.map((meal) => (
            <Card key={meal.id} className="border-border/50 shadow-subtle overflow-hidden">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                <div className="flex justify-between items-center mb-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sandwich className="w-5 h-5 text-primary" />
                    {mealTypeMap[meal.meal_type] || meal.meal_type}
                  </CardTitle>
                  <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {Math.round(meal.calories)} kcal
                  </span>
                </div>
                <CardDescription className="text-xs font-medium">
                  P: {Math.round(meal.protein_grams)}g • C: {Math.round(meal.carbs_grams)}g • G:{' '}
                  {Math.round(meal.fat_grams)}g
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {meal.meal_options?.map((opt: any) => (
                    <div key={opt.optionNumber} className="p-4 hover:bg-muted/20 transition-colors">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                        Opção {opt.optionNumber}
                      </p>
                      <ul className="space-y-3">
                        {opt.foods?.map((food: any, idx: number) => (
                          <li key={idx} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span className="font-medium text-foreground">{food.foodName}</span>
                            </div>
                            <span className="text-muted-foreground font-medium px-2 py-0.5 bg-muted rounded-md">
                              {food.quantity} {food.unit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="supplements" className="space-y-4 animate-fade-in-up">
          {supplements.length === 0 ? (
            <div className="text-center p-8 bg-muted/30 rounded-xl border border-dashed border-border/50">
              <Activity className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground font-medium">
                Nenhuma suplementação obrigatória para o seu perfil no momento.
              </p>
            </div>
          ) : (
            supplements.map((supp) => (
              <Card
                key={supp.id}
                className="border-border/50 shadow-subtle hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'p-3 rounded-xl shrink-0 mt-1',
                        supp.supplement_type === 'performance'
                          ? 'bg-amber-500/10 text-amber-500'
                          : supp.supplement_type === 'vitamin'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-emerald-500/10 text-emerald-500',
                      )}
                    >
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground">
                        {supp.supplement_name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {supp.rationale}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-2 flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3" />
                        Ref: {supp.scientific_reference}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right bg-muted/50 p-3 rounded-lg min-w-[120px] w-full sm:w-auto border border-border/50">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Dose Recomendada
                    </p>
                    <p className="font-extrabold text-xl text-foreground">
                      {supp.dosage}{' '}
                      <span className="text-sm font-medium text-muted-foreground">
                        {supp.dosage_unit}
                      </span>
                    </p>
                    <p className="text-xs text-primary font-bold mt-1 uppercase tracking-wider">
                      {supp.frequency}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
