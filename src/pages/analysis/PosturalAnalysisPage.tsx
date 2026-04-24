import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Activity,
  Camera,
  ChevronRight,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function PosturalAnalysisPage() {
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>('upload')
  const [progress, setProgress] = useState(0)
  const [photos, setPhotos] = useState<{ id: string; label: string; url: string | null }[]>([
    { id: 'frente', label: 'Frente', url: null },
    { id: 'costas', label: 'Costas', url: null },
    { id: 'perfilE', label: 'Perfil Esquerdo', url: null },
    { id: 'perfilD', label: 'Perfil Direito', url: null },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null)
  const navigate = useNavigate()

  const allUploaded = photos.every((p) => p.url !== null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && activePhotoId) {
      const url = URL.createObjectURL(e.target.files[0])
      setPhotos(photos.map((p) => (p.id === activePhotoId ? { ...p, url } : p)))
      setActivePhotoId(null)
    }
  }

  const triggerUpload = (id: string) => {
    setActivePhotoId(id)
    fileInputRef.current?.click()
  }

  const startAnalysis = () => {
    setStep('processing')
    setProgress(0)
  }

  useEffect(() => {
    if (step === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setStep('results'), 500)
            return 100
          }
          return prev + Math.floor(Math.random() * 15) + 5
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [step])

  if (step === 'results') {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-24 md:pb-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold">Análise Inteligente Concluída</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Confira os resultados da sua avaliação postural e biomecânica. Nosso sistema já está
            adaptando seu treino.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-primary/20 bg-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500 w-full" />
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-widest text-muted-foreground">
                Score Postural
              </h3>
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-muted/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeDasharray={`${82 * 2.83} 283`}
                    className="text-green-500 drop-shadow-md"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-foreground">82</span>
                  <span className="text-sm font-medium text-muted-foreground">/ 100</span>
                </div>
              </div>
              <p className="text-lg font-medium text-foreground">Bom alinhamento geral.</p>
              <p className="text-sm text-muted-foreground">
                Pequenos desvios detectados para correção.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-card">
            <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500 w-full" />
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Desvios Detectados
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Anteriorização de Ombros</span>
                    <span className="text-amber-500">Leve</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[30%]" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tensão no peitoral e fraqueza em romboides.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Hiperlordose Lombar</span>
                    <span className="text-orange-500">Moderada</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[60%]" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Encurtamento de flexores do quadril.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Assimetria Pélvica</span>
                    <span className="text-green-500">Padrão</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[10%]" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Muito leve, sem impacto significativo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button
          className="w-full h-14 text-lg font-bold bg-primary-gradient text-white shadow-lg hover:shadow-primary/30"
          onClick={() => navigate('/workouts')}
        >
          Acessar Meu Treino
        </Button>
      </div>
    )
  }

  if (step === 'processing') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-8 animate-fade-in">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div
            className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"
            style={{ animationDuration: '1.5s' }}
          />
          <Activity className="w-12 h-12 text-primary animate-pulse" />
        </div>

        <div className="text-center space-y-4 max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground">Processando Imagens...</h2>
          <p className="text-muted-foreground text-lg">
            Nossa IA está analisando seus ângulos biomecânicos e identificando possíveis desvios
            posturais para otimizar seu treino.
          </p>

          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm font-bold text-primary">
              <span>Analisando</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-gradient transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-24 md:pb-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Avaliação Física</h1>
        <p className="text-muted-foreground text-lg">
          Envie suas 4 fotos para a análise biomecânica.
        </p>
      </div>

      <div className="bg-secondary/30 border p-4 rounded-xl flex items-start gap-3 text-sm">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          Use roupas de banho ou justas. Mantenha os braços relaxados e tire as fotos em um ambiente
          bem iluminado.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => triggerUpload(photo.id)}
            className={cn(
              'aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all relative overflow-hidden group',
              photo.url
                ? 'border-primary border-solid'
                : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5',
            )}
          >
            {photo.url ? (
              <>
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs font-medium py-1 px-2 rounded backdrop-blur-sm z-10">
                  {photo.label}
                </div>
              </>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                <span className="font-medium text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {photo.label}
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
      />

      <div className="pt-4">
        <Button
          className="w-full h-14 text-lg font-bold shadow-lg gap-2"
          disabled={!allUploaded}
          onClick={startAnalysis}
        >
          {allUploaded ? 'Iniciar Análise' : 'Envie as 4 fotos para continuar'}
          {allUploaded && <ChevronRight className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  )
}
