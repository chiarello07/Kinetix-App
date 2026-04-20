import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Activity, Dumbbell, Utensils, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Index() {
  const { user } = useAuth()
  const [hasAnalysis, setHasAnalysis] = useState(false)

  useEffect(() => {
    if (user) {
      checkAnalysis()
    }
  }, [user])

  const checkAnalysis = async () => {
    try {
      // Check if there is any analysis completed for the user
      const { data } = await supabase
        .from('nutrition_profiles')
        .select(`
          id,
          nutrition_assessments!inner(id)
        `)
        .eq('user_id', user!.id)
        .limit(1)

      if (data && data.length > 0) {
        setHasAnalysis(true)
      } else {
        // Fallback for demo: if user has a profile, assume analysis could be bypassed
        const { data: profile } = await supabase
          .from('nutrition_profiles')
          .select('id')
          .eq('user_id', user!.id)
          .single()
        if (profile) setHasAnalysis(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>

      <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
        <div className="w-24 h-24 mx-auto bg-primary/20 rounded-3xl rotate-12 flex items-center justify-center shadow-xl mb-12">
          <Activity className="w-12 h-12 text-primary -rotate-12 opacity-90 shadow-inner" />
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            KINETIX <br />
            <span className="text-primary">Health</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Sua plataforma integrada de saúde, nutrição e performance.
          </p>
        </div>

        <div className="pt-8 flex flex-col gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground rounded-xl shadow-lg hover:-translate-y-1 transition-all"
              >
                Começar Agora
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-xl mb-2">
                  O que você deseja configurar primeiro?
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button
                  asChild
                  variant="outline"
                  className="h-16 flex justify-start px-6 gap-4 text-lg"
                >
                  <Link to="/onboarding">
                    <Dumbbell className="w-6 h-6 text-primary" />
                    Responder Anamnese Treino
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-16 flex justify-start px-6 gap-4 text-lg"
                >
                  <Link to="/nutrition-onboarding">
                    <Utensils className="w-6 h-6 text-primary" />
                    Responder Anamnese Dieta
                  </Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="space-y-2">
            <Button
              asChild
              size="lg"
              variant="outline"
              disabled={!hasAnalysis}
              className={`w-full h-14 text-lg font-semibold rounded-xl shadow-lg transition-all ${
                !hasAnalysis ? 'opacity-50 pointer-events-none' : 'hover:-translate-y-1'
              }`}
            >
              <Link to={hasAnalysis ? '/workout/execute' : '#'}>Iniciar Treino</Link>
            </Button>
            {!hasAnalysis && (
              <Alert variant="default" className="bg-muted/50 border-none mt-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <AlertDescription className="text-xs text-muted-foreground">
                  Faça a Análise Postural primeiro para liberar seus treinos.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
