import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Camera, CheckCircle2, ImagePlus, User } from 'lucide-react'
import { useRef } from 'react'
import type { ViewType } from '@/lib/types/analysis'
import { cn } from '@/lib/utils'

interface PhotoCaptureStepProps {
  currentView: ViewType
  photos: Record<ViewType, string | null>
  onCapture: (view: ViewType, url: string) => void
  onSelectView: (view: ViewType) => void
  onComplete: () => void
  allCaptured: boolean
}

const VIEWS: { id: ViewType; label: string; desc: string; icon: any } = [
  { id: 'FRONTAL', label: 'Frontal', desc: 'De frente', icon: User },
  { id: 'LATERAL_LEFT', label: 'Lat. Esquerda', desc: 'Perfil esquerdo', icon: User },
  { id: 'LATERAL_RIGHT', label: 'Lat. Direita', desc: 'Perfil direito', icon: User },
  { id: 'POSTERIOR', label: 'Posterior', desc: 'De costas', icon: User },
]

export function PhotoCaptureStep({
  currentView,
  photos,
  onCapture,
  onSelectView,
  onComplete,
  allCaptured,
}: PhotoCaptureStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onCapture(currentView, url)

      // Auto-advance
      const currentIndex = VIEWS.findIndex((v) => v.id === currentView)
      if (currentIndex < VIEWS.length - 1) {
        onSelectView(VIEWS[currentIndex + 1].id)
      }
    }
  }

  const currentViewDetails = VIEWS.find((v) => v.id === currentView)!

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full space-y-6 animate-fade-in-up p-4">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] to-[#4B0082]">
          Captura de Ângulos
        </h2>
        <p className="text-muted-foreground">
          Posicione a câmera na altura do umbigo para melhor precisão.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {VIEWS.map((view) => {
          const isCaptured = !!photos[view.id]
          const isActive = currentView === view.id
          return (
            <button
              key={view.id}
              onClick={() => onSelectView(view.id)}
              className={cn(
                'flex flex-col items-center p-2 rounded-xl transition-all duration-300 border-2',
                isActive
                  ? 'border-[#FF1493] bg-primary/5 shadow-md scale-105'
                  : isCaptured
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-border bg-card hover:bg-muted',
              )}
            >
              {isCaptured ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 mb-1" />
              ) : (
                <view.icon
                  className={cn(
                    'w-6 h-6 mb-1',
                    isActive ? 'text-[#FF1493]' : 'text-muted-foreground',
                  )}
                />
              )}
              <span className="text-[10px] font-medium text-center leading-tight hidden sm:block">
                {view.label}
              </span>
            </button>
          )
        })}
      </div>

      <Card className="overflow-hidden border-2 border-dashed border-muted-foreground/30 bg-muted/30">
        <CardContent className="p-0 aspect-[3/4] sm:aspect-[4/3] relative flex items-center justify-center group">
          {photos[currentView] ? (
            <img
              src={photos[currentView]!}
              alt={currentView}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground p-8 text-center">
              <Camera className="w-16 h-16 mb-4 opacity-50 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2">{currentViewDetails.label}</h3>
              <p className="text-sm max-w-[200px]">{currentViewDetails.desc}</p>
            </div>
          )}

          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <Button
              size="lg"
              className="rounded-full shadow-elevation bg-background text-foreground hover:bg-muted font-semibold px-8"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="w-5 h-5 mr-2" />
              {photos[currentView] ? 'Recapturar Foto' : 'Tirar Foto'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Button
        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#FF1493] to-[#4B0082] hover:opacity-90 text-white shadow-xl transition-all"
        disabled={!allCaptured}
        onClick={onComplete}
      >
        {allCaptured ? 'Analisar Postura (AI)' : 'Conclua todas as fotos'}
      </Button>
    </div>
  )
}
