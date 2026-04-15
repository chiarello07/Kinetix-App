import useAnalysisStore from '@/stores/useAnalysisStore'
import { ConsentStep } from '@/components/analysis/ConsentStep'
import { PhotoCaptureStep } from '@/components/analysis/PhotoCaptureStep'
import { ProcessingStep } from '@/components/analysis/ProcessingStep'
import { ResultsDashboard } from '@/components/analysis/ResultsDashboard'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PosturalAnalysisPage() {
  const {
    step,
    currentView,
    photos,
    result,
    error,
    allPhotosCaptured,
    setConsent,
    setCurrentView,
    setPhoto,
    startProcessing,
    reset,
  } = useAnalysisStore()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-16">
      <div className="container mx-auto max-w-5xl py-8 flex-1 flex flex-col">
        {step === 'CONSENT' && <ConsentStep onAccept={() => setConsent(true)} />}

        {step === 'CAPTURE' && (
          <PhotoCaptureStep
            currentView={currentView}
            photos={photos}
            onCapture={setPhoto}
            onSelectView={setCurrentView}
            onComplete={startProcessing}
            allCaptured={allPhotosCaptured}
          />
        )}

        {step === 'PROCESSING' && <ProcessingStep />}

        {step === 'RESULTS' && result && <ResultsDashboard result={result} onReset={reset} />}

        {step === 'ERROR' && (
          <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-destructive" />
            <h2 className="text-2xl font-bold">Ops, ocorreu um erro!</h2>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={reset} variant="default" className="mt-4">
              Tentar Novamente
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
