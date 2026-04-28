import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Utensils, ClipboardList, CheckCircle2, Apple } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

export default function Nutrition() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [assessment, setAssessment] = useState<any>(null)
  const [plan, setPlan] = useState<any>(null)

  useEffect(() => {
    if (user) loadData()
  }, [user])

  const loadData = async () => {
    try {
      const { data: profile } = await supabase
        .from('nutrition_profiles')
        .select('id')
        .eq('user_id', user!.id)
        .single()

      if (profile) {
        const { data: latestAssessment } = await supabase
          .from('nutrition_assessments')
          .select('*')
          .eq('nutrition_profile_id', profile.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (latestAssessment) setAssessment(latestAssessment)

        const { data: latestPlan } = await supabase
          .from('nutrition_plans')
          .select('*')
          .eq('nutrition_profile_id', profile.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (latestPlan) setPlan(latestPlan)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-24 md:pb-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-sm">
          <Utensils className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nutrição</h1>
          <p className="text-muted-foreground">Gerencie sua dieta e avaliações nutricionais.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ClipboardList className="w-6 h-6 text-primary" /> Avaliação Detalhada
              </CardTitle>
              <CardDescription className="text-sm">
                Rastreamento metabólico completo para otimizar sua dieta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assessment ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-400">
                        Avaliação Concluída
                      </p>
                      <p className="text-sm text-green-600/80 dark:text-green-500/80 mt-1">
                        Score: {assessment.score_percentage}% - {assessment.interpretation}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Button asChild className="w-full h-12 font-bold shadow-sm">
                  <Link to="/nutrition-assessments">Iniciar Avaliação Detalhada</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Apple className="w-6 h-6 text-primary" /> Plano Nutricional
              </CardTitle>
              <CardDescription className="text-sm">
                Acesse seu plano de refeições e suplementação personalizado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {plan ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="font-semibold text-foreground">Plano Ativo</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Objetivo: {plan.primary_goal} • {Math.round(plan.target_calories)} kcal
                    </p>
                  </div>
                  <Button asChild className="w-full font-semibold">
                    <Link to="/nutrition-plan">Ver Plano Completo</Link>
                  </Button>
                </div>
              ) : (
                <Button asChild className="w-full h-12 font-bold shadow-sm">
                  <Link to="/nutrition-plan">Gerar Plano Nutricional</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
