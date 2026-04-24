import { useState } from 'react'
import { INITIAL_DATA, OnboardingData } from './types'
import { canGoNext } from './utils'
import { StepForm } from './StepForm'
import { Summary } from './Summary'
import { PostTutorial } from './PostTutorial'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA)
  const { user } = useAuth()

  const handleUpdate = (updates: Partial<OnboardingData>) => setData((d) => ({ ...d, ...updates }))

  const handleSubmit = async () => {
    setStep(14) // isSubmitting state
    try {
      if (user) {
        await supabase.from('profiles').update({ name: data.name }).eq('id', user.id)
        await supabase.auth.updateUser({ data: { full_name: data.name } })

        const { data: profile } = await supabase
          .from('nutrition_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()

        let dob = new Date().toISOString().split('T')[0]
        if (data.age) {
          const d = new Date()
          d.setFullYear(d.getFullYear() - Number(data.age))
          dob = d.toISOString().split('T')[0]
        }

        if (profile) {
          await supabase
            .from('nutrition_profiles')
            .update({
              gender: data.gender,
              current_weight_kg: Number(data.weight),
              target_weight_kg: Number(data.targetWeight),
              height_cm: Number(data.height),
              primary_goal: data.goal,
              fitness_level: data.experience,
              exercise_days_per_week: data.frequency,
              date_of_birth: dob,
              onboarding_completed: true,
              onboarding_completion_date: new Date().toISOString(),
            })
            .eq('id', profile.id)
        }
      }
      setStep(15) // Tutorial
    } catch (e) {
      console.error(e)
      setStep(13) // Back to summary on error
    }
  }

  if (step === 15) return <PostTutorial />

  const isSummary = step === 13
  const isSubmitting = step === 14

  return (
    <div className="max-w-[600px] mx-auto min-h-screen flex flex-col px-5 py-6 bg-background w-full">
      {!isSummary && !isSubmitting && (
        <div className="mb-8">
          <div className="flex justify-between text-sm font-semibold mb-3 text-muted-foreground">
            <span>Passo {step} de 12</span>
            <span className="text-primary">{Math.round((step / 12) * 100)}%</span>
          </div>
          <Progress value={(step / 12) * 100} className="h-2.5 bg-primary/10" />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {isSubmitting ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in gap-6 text-primary">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-xl text-foreground">Salvando seu perfil...</p>
            <p className="text-muted-foreground text-center max-w-[250px]">
              Preparando a configuração inicial do seu plano.
            </p>
          </div>
        ) : isSummary ? (
          <Summary data={data} onEdit={setStep} onSubmit={handleSubmit} />
        ) : (
          <StepForm step={step} data={data} updateData={handleUpdate} />
        )}
      </div>

      {!isSummary && !isSubmitting && (
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
          <Button
            className="flex-[2] h-14 text-lg font-bold bg-primary-gradient text-white border-0 shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50"
            disabled={!canGoNext(step, data)}
            onClick={() => setStep((s) => s + 1)}
          >
            Continuar
          </Button>
        </div>
      )}
    </div>
  )
}
