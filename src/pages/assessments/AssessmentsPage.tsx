import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ClipboardList, Dumbbell, Utensils, BrainCircuit, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

export default function AssessmentsPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (user) {
      supabase
        .from('nutrition_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data)
        })
    }
  }, [user])

  const trainingCompleted = profile?.onboarding_completed
  const dietCompleted =
    profile?.intestinal_function !== null &&
    profile?.intestinal_function !== undefined &&
    profile?.intestinal_function !== ''

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-24 md:pb-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-sm">
          <ClipboardList className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análises</h1>
          <p className="text-muted-foreground">
            Central de questionários e avaliações inteligentes.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              <span className="flex items-center gap-2">
                <Dumbbell className="w-6 h-6 text-primary" /> Anamnese de Treino
              </span>
              {trainingCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </CardTitle>
            <CardDescription className="text-sm">
              Questionário inicial sobre seu histórico de treinos e objetivos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button asChild className="w-full h-12 font-bold shadow-sm flex-1">
                <Link to="/onboarding">
                  {trainingCompleted ? 'Refazer Questionário' : 'Responder Questionário'}
                </Link>
              </Button>
              {trainingCompleted && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-12 font-bold shadow-sm flex-1 border-primary/50 text-primary hover:bg-primary/5"
                    >
                      Ver Resultados
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Resultados da Anamnese de Treino</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/30 border p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                            Objetivo
                          </p>
                          <p className="font-semibold text-lg capitalize">
                            {profile?.primary_goal?.replace('_', ' ') || 'N/A'}
                          </p>
                        </div>
                        <div className="bg-secondary/30 border p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                            Frequência
                          </p>
                          <p className="font-semibold text-lg">
                            {profile?.exercise_days_per_week || 0} dias/sem
                          </p>
                        </div>
                        <div className="bg-secondary/30 border p-3 rounded-lg col-span-2">
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                            Nível de Experiência
                          </p>
                          <p className="font-semibold text-lg capitalize">
                            {profile?.fitness_level || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              <span className="flex items-center gap-2">
                <Utensils className="w-6 h-6 text-primary" /> Anamnese de Nutrição
              </span>
              {dietCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </CardTitle>
            <CardDescription className="text-sm">
              Mapeamento metabólico e alimentar para geração automática da sua dieta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 w-full">
              <Button asChild className="w-full h-12 font-bold shadow-sm">
                <Link to="/nutrition-onboarding">
                  {dietCompleted ? 'Refazer Questionário' : 'Responder Questionário'}
                </Link>
              </Button>
              {dietCompleted && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 font-bold shadow-sm border-primary/50 text-primary hover:bg-primary/5"
                    >
                      Ver Resultados
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Resultados da Anamnese Nutricional</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/30 border p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                            Biotipo
                          </p>
                          <p
                            className="font-semibold text-sm line-clamp-2"
                            title={profile?.body_type || 'N/A'}
                          >
                            {profile?.body_type?.split('(')[0] || 'N/A'}
                          </p>
                        </div>
                        <div className="bg-secondary/30 border p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                            Refeições
                          </p>
                          <p className="font-semibold text-lg">{profile?.meals_per_day || 0}/dia</p>
                        </div>
                        <div className="bg-secondary/30 border p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                            Água
                          </p>
                          <p className="font-semibold text-lg">
                            {profile?.water_intake_liters || 0} L
                          </p>
                        </div>
                        <div className="bg-secondary/30 border p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                            Risco Metabólico
                          </p>
                          {profile?.hereditary_diseases?.includes('Diabetes') ? (
                            <Badge variant="destructive" className="mt-1">
                              Atenção
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-green-500/10 text-green-500 hover:bg-green-500/20 mt-1"
                            >
                              Baixo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BrainCircuit className="w-6 h-6 text-primary" /> Análise Inteligente
            </CardTitle>
            <CardDescription className="text-sm">
              Captura e análise biomecânica com IA para gerar seu treino corretivo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full h-12 font-bold shadow-sm">
              <Link to="/analysis">Realizar Análise Corporal</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
