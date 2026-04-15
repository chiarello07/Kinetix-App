import { useState } from 'react'
import { INITIAL_DATA, OnboardingData } from './types'
import { canGoNext } from './utils'
import { StepForm } from './StepForm'
import { Summary } from './Summary'
import { PostTutorial } from './PostTutorial'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA)

  const handleUpdate = (updates: Partial<OnboardingData>) => setData((d) => ({ ...d, ...updates }))

  const handleSubmit = async () => {
    setStep(14)
    try {
      const payload = {
        ...data,
        imc: (Number(data.weight) / Math.pow(Number(data.height) / 100, 2)).toFixed(2),
        terms_agreed_at: new Date().toISOString(),
        terms_version: '1.0',
        user_agent: navigator.userAgent,
        ip_address: 'client-side-inferred',
      }

      // Mock API call to Supabase edge function / backend endpoint
      await fetch('/api/auth/onboarding/training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      // Simulate processing
      await new Promise((r) => setTimeout(r, 2000))
      setStep(15)
    } catch {
      setStep(13)
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
