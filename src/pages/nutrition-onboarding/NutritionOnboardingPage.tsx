import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { INITIAL_DATA, NutritionOnboardingData } from './types'
import { canGoNext } from './utils'
import { StepForm } from './StepForm'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { saveNutritionProfileStep } from '@/lib/utils/supabase-helpers'

const TOTAL_STEPS = 4

export default function NutritionOnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<NutritionOnboardingData>(INITIAL_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleUpdate = (updates: Partial<NutritionOnboardingData>) =>
    setData((d) => ({ ...d, ...updates }))

  const { user } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const mapStepToProfileData = (stepNum: number, currentData: NutritionOnboardingData) => {
    switch (stepNum) {
      case 1:
        return {
          body_type: currentData.bodyType,
          hereditary_diseases: currentData.diabetesHistory === 'Sim' ? ['Diabetes'] : [],
        }
      case 2:
        return {
          wake_up_time: currentData.wakeUpTime,
          sleep_time: currentData.sleepTime,
          profession: currentData.profession,
        }
      case 3:
        return {
          intestinal_function: currentData.intestinalFunction,
          bristol_scale_type: Number(currentData.bristolScale) || null,
          medications: currentData.medications,
        }
      case 4:
        return {
          meals_per_day: Number(currentData.mealsPerDay) || null,
          water_intake_liters: Number(currentData.waterIntake) || null,
          foods_cannot_live_without: [currentData.favoriteFoods],
        }
      default:
        return {}
    }
  }

  const handleNextStep = async () => {
    setIsSubmitting(true)
    try {
      if (user) {
        const { data: profile } = await supabase
          .from('nutrition_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()
        if (profile) {
          const stepData = mapStepToProfileData(step, data)
          await saveNutritionProfileStep(user.id, profile.id, step, stepData)
        }
      }
      setStep((s) => s + 1)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

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
          const stepData = mapStepToProfileData(4, data)
          await saveNutritionProfileStep(user.id, profile.id, 4, stepData)
          // Intestinal function serves as flag for diet completion in UI
          await supabase
            .from('nutrition_profiles')
            .update({
              ...stepData,
            })
            .eq('id', profile.id)
        }
      }
      navigate('/assessments')
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-[600px] mx-auto min-h-screen flex flex-col px-5 py-6 bg-background w-full">
      {!isSubmitting && (
        <div className="mb-8">
          <div className="flex justify-between text-sm font-semibold mb-3 text-muted-foreground">
            <span>
              Passo {step} de {TOTAL_STEPS}
            </span>
            <span className="text-primary">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
          </div>
          <Progress value={(step / TOTAL_STEPS) * 100} className="h-2.5 bg-primary/10" />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {isSubmitting ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in gap-6 text-primary">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-xl text-foreground">Salvando seus dados...</p>
            <p className="text-muted-foreground text-center max-w-[250px]">
              Sincronizando com seu perfil inteligente.
            </p>
          </div>
        ) : (
          <StepForm step={step} data={data} updateData={handleUpdate} />
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
          {step < TOTAL_STEPS ? (
            <Button
              className="flex-[2] h-14 text-lg font-bold bg-primary-gradient text-white shadow-lg transition-all disabled:opacity-50"
              disabled={!canGoNext(step, data)}
              onClick={handleNextStep}
            >
              Continuar
            </Button>
          ) : (
            <Button
              className="flex-[2] h-14 text-lg font-bold bg-primary-gradient text-white shadow-lg transition-all disabled:opacity-50"
              disabled={!canGoNext(step, data)}
              onClick={handleSubmit}
            >
              Finalizar
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
