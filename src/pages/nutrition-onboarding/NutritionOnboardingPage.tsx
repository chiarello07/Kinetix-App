import { useState } from 'react'
import { Link } from 'react-router-dom'
import { INITIAL_DATA, NutritionOnboardingData } from './types'
import { canGoNext } from './utils'
import { StepForm } from './StepForm'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { saveNutritionProfileStep } from '@/lib/utils/supabase-helpers'

export default function NutritionOnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<NutritionOnboardingData>(INITIAL_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleUpdate = (updates: Partial<NutritionOnboardingData>) =>
    setData((d) => ({ ...d, ...updates }))

  const { user } = useAuth()

  const mapStepToProfileData = (stepNum: number, currentData: any) => {
    switch (stepNum) {
      case 1:
        return {
          height_cm: Number(currentData.height) || 0,
          current_weight_kg: Number(currentData.weight) || 0,
          target_weight_kg: Number(currentData.targetWeight) || 0,
          gender: currentData.gender || 'outros',
          date_of_birth: currentData.birthDate || '1990-01-01',
        }
      case 2:
        return { primary_goal: currentData.goal }
      case 3:
        return { body_type: currentData.bodyType }
      case 4:
        return {
          max_weight_kg: Number(currentData.maxWeight) || null,
          min_weight_kg: Number(currentData.minWeight) || null,
          weight_history: currentData.weightHistory || {},
        }
      case 5:
        return {
          wake_up_time: currentData.wakeUpTime || null,
          sleep_time: currentData.sleepTime || null,
          sleep_quality: currentData.sleepQuality || null,
        }
      case 6:
        return { fitness_level: currentData.fitnessLevel }
      case 7:
        return {
          exercise_types: currentData.exerciseTypes || [],
          exercise_days_per_week: Number(currentData.exerciseDays) || null,
          exercise_duration_minutes: Number(currentData.exerciseDuration) || null,
        }
      case 8:
        return {
          profession: currentData.profession || null,
          work_activity_level: currentData.workActivityLevel || null,
          work_hours_per_day: Number(currentData.workHours) || null,
        }
      case 9:
        return {
          intestinal_function: currentData.intestinalFunction || null,
          bristol_scale_type: Number(currentData.bristolScale) || null,
          medications: currentData.medications || null,
          supplements: currentData.supplements || null,
          current_treatments: currentData.treatments || [],
          hereditary_diseases: currentData.diseases || [],
        }
      case 10:
        return {
          meals_per_day: Number(currentData.mealsPerDay) || null,
          preferred_meal_times: currentData.mealTimes || null,
          water_intake_liters: Number(currentData.waterIntake) || null,
        }
      case 11:
        return {
          favorite_fruits: currentData.fruits || [],
          favorite_vegetables: currentData.vegetables || [],
          favorite_breakfast_foods: currentData.breakfastFoods || [],
          favorite_lunch_foods: currentData.lunchFoods || [],
          favorite_dinner_foods: currentData.dinnerFoods || [],
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
          const stepData = mapStepToProfileData(11, data)
          await saveNutritionProfileStep(user.id, profile.id, 11, stepData)
          await supabase
            .from('nutrition_profiles')
            .update({
              onboarding_completed: true,
              onboarding_completion_date: new Date().toISOString(),
            })
            .eq('id', profile.id)
        }
      }
      setIsDone(true)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isDone) {
    return (
      <div className="max-w-[600px] mx-auto min-h-screen flex flex-col items-center justify-center px-5 py-6 bg-background">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
          <div className="w-8 h-8 bg-primary rounded-full" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">Perfil Criado!</h1>
        <p className="text-muted-foreground text-center mb-8">
          Seu plano nutricional personalizado está sendo gerado.
        </p>
        <Link to="/nutrition-assessments">
          <Button className="h-12 px-8 text-lg font-bold">Iniciar Avaliação Detalhada</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[600px] mx-auto min-h-screen flex flex-col px-5 py-6 bg-background w-full">
      {!isSubmitting && (
        <div className="mb-8">
          <div className="flex justify-between text-sm font-semibold mb-3 text-muted-foreground">
            <span>Passo {step} de 11</span>
            <span className="text-primary">{Math.round((step / 11) * 100)}%</span>
          </div>
          <Progress value={(step / 11) * 100} className="h-2.5 bg-primary/10" />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {isSubmitting ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in gap-6 text-primary">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-xl text-foreground">Salvando seu perfil...</p>
            <p className="text-muted-foreground text-center max-w-[250px]">
              Analisando seus dados clínicos e dietéticos.
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
          {step < 11 ? (
            <Button
              className="flex-[2] h-14 text-lg font-bold bg-primary text-primary-foreground transition-all disabled:opacity-50"
              disabled={!canGoNext(step, data)}
              onClick={handleNextStep}
            >
              Continuar
            </Button>
          ) : (
            <Button
              className="flex-[2] h-14 text-lg font-bold bg-primary text-primary-foreground transition-all disabled:opacity-50"
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
