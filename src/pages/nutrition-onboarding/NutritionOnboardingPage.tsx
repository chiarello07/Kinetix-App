import { useState } from 'react'
import { Link } from 'react-router-dom'
import { INITIAL_DATA, NutritionOnboardingData } from './types'
import { canGoNext } from './utils'
import { StepForm } from './StepForm'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export default function NutritionOnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<NutritionOnboardingData>(INITIAL_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleUpdate = (updates: Partial<NutritionOnboardingData>) =>
    setData((d) => ({ ...d, ...updates }))

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const payload = {
        ...data,
        submitted_at: new Date().toISOString(),
      }

      await fetch('/api/nutrition/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      await new Promise((r) => setTimeout(r, 2000))
      setIsDone(true)
    } catch {
      // fallback on error
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
        <Link to="/dashboard">
          <Button className="h-12 px-8 text-lg font-bold">Ir para o Dashboard</Button>
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
              onClick={() => setStep((s) => s + 1)}
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
