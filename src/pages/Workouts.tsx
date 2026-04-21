import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dumbbell, BrainCircuit, Activity, CalendarDays } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

export default function Workouts() {
  const { user } = useAuth()
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchPlans()
  }, [user])

  const fetchPlans = async () => {
    try {
      const { data } = await supabase
        .from('periodization')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) {
        setPlans(data)
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
          <Dumbbell className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Treinos</h1>
          <p className="text-muted-foreground">Seus planos de treino e avaliações biomecânicas.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BrainCircuit className="w-6 h-6 text-primary" /> Análise Inteligente
            </CardTitle>
            <CardDescription className="text-sm">
              Faça a captura ou upload das suas fotos para a IA gerar um treino corretivo e
              hipertrófico personalizado.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end border-t pt-4">
            <Button asChild className="font-bold shadow-sm px-8">
              <Link to="/analysis">{plans.length > 0 ? 'Refazer Análise' : 'Fazer Análise'}</Link>
            </Button>
          </CardContent>
        </Card>

        {loading ? (
          <div className="md:col-span-2 text-center p-8 text-muted-foreground animate-pulse">
            Carregando planos...
          </div>
        ) : plans.length > 0 ? (
          plans.map((plan) => (
            <Card
              key={plan.id}
              className="hover:shadow-md transition-shadow border-primary/10 bg-card"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-primary" /> {plan.name}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2">{plan.objective}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <CalendarDays className="w-4 h-4" /> {plan.weeks} semanas de duração
                </div>
                <Button asChild className="w-full font-semibold">
                  <Link to="/workout/execute">Visualizar / Iniciar Treino</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="md:col-span-2 p-12 text-center border rounded-xl bg-secondary/20">
            <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum treino gerado ainda
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
              Faça sua Análise Inteligente para que possamos construir seu plano de treinamento
              personalizado.
            </p>
            <Button asChild variant="outline">
              <Link to="/analysis">Iniciar Análise Agora</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
