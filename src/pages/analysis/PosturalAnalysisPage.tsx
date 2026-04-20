import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, CheckCircle2, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { toast } from '@/hooks/use-toast'

export default function PosturalAnalysisPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0: front, 1: left, 2: right, 3: back, 4: processing, 5: results
  const [isProcessing, setIsProcessing] = useState(false)

  const views = ['Frontal', 'Lateral Esquerda', 'Lateral Direita', 'Posterior']

  const handleCapture = () => {
    if (step < 3) setStep((s) => s + 1)
    else setStep(4)
  }

  const processAnalysis = async () => {
    setIsProcessing(true)
    // Simulate AI processing delays for UX
    await new Promise((r) => setTimeout(r, 2000))

    // Log action to enable training button
    if (user) {
      await supabase.from('user_activity_log').insert({
        user_id: user.id,
        action: 'postural_analysis_completed',
        entity: 'analysis',
      })
    }

    setIsProcessing(false)
    setStep(5)
  }

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 animate-fade-in px-4 text-center">
        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-sm" />
        <h2 className="text-3xl font-bold tracking-tight">Processando Imagens...</h2>
        <p className="text-muted-foreground max-w-md">
          Nossa IA está analisando seus ângulos biomecânicos e identificando possíveis desvios
          posturais.
        </p>
        <Button
          onClick={processAnalysis}
          disabled={isProcessing}
          size="lg"
          className="mt-4 h-14 px-8 font-bold"
        >
          Realizar Análise
        </Button>
      </div>
    )
  }

  if (step === 5) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8 animate-fade-in-up pb-24">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-green-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Análise Concluída</h2>
          <p className="text-muted-foreground">
            Confira os resultados da sua avaliação postural inteligente.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-2xl bg-card shadow-subtle flex flex-col items-center text-center">
            <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Score Postural</h3>
            <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center mb-4">
              <span className="text-4xl font-black text-primary">
                82<span className="text-xl text-muted-foreground">/100</span>
              </span>
            </div>
            <p className="text-sm text-foreground font-medium">Bom alinhamento geral.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Pequenos desvios detectados para correção.
            </p>
          </div>

          <div className="p-6 border rounded-2xl bg-card shadow-subtle">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" /> Desvios Detectados
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-foreground p-2 rounded-lg bg-secondary/30">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                <span>Leve anteriorização de ombros devido a tensão no peitoral.</span>
              </li>
              <li className="flex gap-3 text-sm text-foreground p-2 rounded-lg bg-secondary/30">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                <span>Hiperlordose lombar moderada.</span>
              </li>
              <li className="flex gap-3 text-sm text-foreground p-2 rounded-lg bg-secondary/30">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <span>Assimetria pélvica muito leve (dentro do padrão).</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center pt-8 border-t">
          <Button
            size="lg"
            className="w-full md:w-auto h-16 px-10 text-xl font-bold shadow-lg"
            onClick={() => {
              toast({
                title: 'Treino gerado com sucesso!',
                description: 'Seu treino corretivo está pronto para execução.',
              })
              navigate('/workouts')
            }}
          >
            Gerar Treino
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col items-center min-h-[80vh] justify-center gap-8 animate-fade-in pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Posição {views[step]}</h2>
        <p className="text-muted-foreground">
          Posicione-se em frente à câmera e capture a foto para a análise biomecânica.
        </p>
      </div>

      <div className="w-full aspect-[3/4] bg-secondary/40 rounded-3xl flex items-center justify-center border-2 border-dashed border-primary/40 relative overflow-hidden shadow-inner">
        <Camera className="w-16 h-16 text-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      <div className="flex gap-4 w-full mt-4">
        {step > 0 && (
          <Button
            variant="outline"
            className="flex-1 h-14 font-semibold"
            onClick={() => setStep((s) => s - 1)}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Recapturar
          </Button>
        )}
        <Button className="flex-[2] h-14 font-bold text-lg shadow-md" onClick={handleCapture}>
          {step === 3 ? 'Finalizar Captura' : 'Capturar Foto'}
        </Button>
      </div>
    </div>
  )
}
