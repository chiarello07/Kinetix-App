import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { WeightHistoryStep } from './steps/BasicSteps'
import { MetabolicStep } from './steps/MetabolicStep'
import { NutritionOnboardingData } from './types'

export default function NutritionOnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<NutritionOnboardingData>({
    maxWeight: '',
    minWeight: '',
    diabetesHistory: '',
    bodyType: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const handleUpdate = (updates: Partial<NutritionOnboardingData>) =>
    setData((d) => ({ ...d, ...updates }))

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      if (user) {
        const { data: profile } = await supabase
          .from('nutrition_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (profile) {
          await supabase
            .from('nutrition_profiles')
            .update({
              max_weight_kg: Number(data.maxWeight),
              min_weight_kg: Number(data.minWeight),
              body_type: data.bodyType,
              intestinal_function: 'regular',
            })
            .eq('id', profile.id)
        }
      }

      setTimeout(() => {
        setIsSubmitting(false)
        navigate('/nutrition')
      }, 3000)
    } catch (e) {
      console.error(e)
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WeightHistoryStep data={data} updateData={handleUpdate} />
      case 2:
        return <MetabolicStep data={data} updateData={handleUpdate} />
      case 3:
        return (
          <div className="animate-fade-in flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Hábitos Alimentares</h2>
            <p className="text-muted-foreground text-lg">Conte-nos sobre sua rotina atual.</p>
          </div>
        )
      case 4:
        return (
          <div className="animate-fade-in flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Consumo de Água</h2>
            <p className="text-muted-foreground text-lg">Como é sua hidratação?</p>
          </div>
        )
      case 5:
        return (
          <div className="animate-fade-in flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Preferências</h2>
            <p className="text-muted-foreground text-lg">O que você gosta de comer?</p>
          </div>
        )
      case 6:
        return (
          <div className="animate-fade-in flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Revisão Final</h2>
            <p className="text-muted-foreground text-lg">
              Pronto para gerar sua análise nutricional?
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-[600px] mx-auto min-h-screen flex flex-col px-5 py-6 bg-background w-full">
      {!isSubmitting && (
        <div className="mb-8">
          <div className="flex justify-between text-sm font-semibold mb-3 text-muted-foreground">
            <span>Passo {step} de 6</span>
            <span className="text-primary">{Math.round((step / 6) * 100)}%</span>
          </div>
          <Progress value={(step / 6) * 100} className="h-2.5 bg-primary/10" />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {isSubmitting ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in gap-6 text-primary mt-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-xl text-foreground">Analisando seu perfil metabólico...</p>
            <p className="text-muted-foreground text-center max-w-[250px]">
              Nossa inteligência artificial está processando seus dados para gerar o melhor plano
              nutricional.
            </p>
          </div>
        ) : (
          renderStep()
        )}
      </div>

      {!isSubmitting && (
        <div className="mt-8 flex gap-4 sticky bottom-4 bg-background pt-4 pb-2 z-10 border-t">
          {step > 1 && (
            <Button
              variant="outline"
              className="flex-1 h-14 text-lg font-semibold"
              onClick={() => setStep((s) => s - 1)}
            >
              Voltar
            </Button>
          )}
          {step < 6 ? (
            <Button
              className="flex-[2] h-14 text-lg font-bold bg-primary-gradient text-white border-0 shadow-lg hover:shadow-primary/30 transition-all"
              onClick={() => setStep((s) => s + 1)}
            >
              Continuar
            </Button>
          ) : (
            <Button
              className="flex-[2] h-14 text-lg font-bold bg-primary-gradient text-white border-0 shadow-lg hover:shadow-primary/30 transition-all"
              onClick={handleSubmit}
            >
              Finalizar Avaliação
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
