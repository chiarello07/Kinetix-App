import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Camera, Shirt, Activity, Share, MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function PostTutorial() {
  const [pwaOpen, setPwaOpen] = useState(false)
  const [platform, setPlatform] = useState('')
  const [tutorialStep, setTutorialStep] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) setPlatform('ios')
    else if (/android/.test(ua)) setPlatform('android')
    else setPlatform('desktop')

    if (/iphone|ipad|ipod|android/.test(ua)) {
      setPwaOpen(true)
    }
  }, [])

  const completeTutorial = () => {
    navigate('/assessments')
  }

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[80vh] gap-8 text-center px-4 w-full">
      {tutorialStep === 1 && (
        <div className="animate-slide-up flex flex-col items-center gap-6 max-w-sm w-full">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-inner">
            <Camera className="w-16 h-16" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">Avaliação Física</h2>
            <p className="text-muted-foreground text-lg">
              Para criar seu plano inteligente, precisaremos de 4 fotos do seu corpo atual (frente,
              costas e lados esquerdo e direito).
            </p>
          </div>
          <div className="flex gap-2 w-full mt-2">
            <div className="h-1.5 flex-1 bg-primary rounded-full" />
            <div className="h-1.5 flex-1 bg-muted rounded-full" />
            <div className="h-1.5 flex-1 bg-muted rounded-full" />
          </div>
          <Button
            className="w-full h-14 text-lg font-semibold mt-4"
            onClick={() => setTutorialStep(2)}
          >
            Entendi, próximo
          </Button>
        </div>
      )}

      {tutorialStep === 2 && (
        <div className="animate-slide-up flex flex-col items-center gap-6 max-w-sm w-full">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-inner">
            <Shirt className="w-16 h-16" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">Postura e Roupas</h2>
            <p className="text-muted-foreground text-lg">
              Use roupas confortáveis ou de banho<span>&nbsp;(sunga/calção, bikini/maiô)</span>,
              para um melhor resultado. Mantenha os braços relaxados ao lado do corpo e tire as
              fotos em ambiente claro.
            </p>
          </div>
          <div className="flex gap-2 w-full mt-2">
            <div className="h-1.5 flex-1 bg-primary rounded-full" />
            <div className="h-1.5 flex-1 bg-primary rounded-full" />
            <div className="h-1.5 flex-1 bg-muted rounded-full" />
          </div>
          <Button
            className="w-full h-14 text-lg font-semibold mt-4"
            onClick={() => setTutorialStep(3)}
          >
            Quase lá
          </Button>
        </div>
      )}

      {tutorialStep === 3 && (
        <div className="animate-slide-up flex flex-col items-center gap-6 max-w-sm w-full">
          <div className="w-32 h-32 rounded-full bg-primary-gradient flex items-center justify-center text-white mb-2 shadow-lg">
            <Activity className="w-16 h-16" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">Tudo Pronto!</h2>
            <p className="text-muted-foreground text-lg">
              Sua jornada começa agora. Nosso especialista vai processar seus dados e criar seu
              plano.
            </p>
          </div>
          <div className="flex gap-2 w-full mt-2">
            <div className="h-1.5 flex-1 bg-primary rounded-full" />
            <div className="h-1.5 flex-1 bg-primary rounded-full" />
            <div className="h-1.5 flex-1 bg-primary rounded-full" />
          </div>
          <Button
            className="w-full h-14 text-lg font-bold mt-4 bg-primary-gradient text-white shadow-lg hover:shadow-primary/30"
            onClick={completeTutorial}
          >
            Ir para Avaliação
          </Button>
        </div>
      )}

      <Dialog open={pwaOpen} onOpenChange={setPwaOpen}>
        <DialogContent className="sm:max-w-md mx-4 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Instale nosso App</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Para a melhor experiência e acesso rápido aos seus treinos, adicione este aplicativo à
              sua tela inicial.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6 text-center bg-muted/30 rounded-xl mt-2 px-4">
            {platform === 'ios' ? (
              <>
                <p className="text-lg">
                  Toque no ícone de compartilhar{' '}
                  <Share className="inline w-6 h-6 mx-1 text-primary" /> abaixo.
                </p>
                <p className="text-lg">
                  Depois, selecione <br />
                  <strong className="text-foreground">"Adicionar à Tela de Início"</strong>.
                </p>
              </>
            ) : platform === 'android' ? (
              <>
                <p className="text-lg">
                  Toque no menu <MoreVertical className="inline w-6 h-6 mx-1 text-primary" /> do seu
                  navegador.
                </p>
                <p className="text-lg">
                  Depois, selecione <br />
                  <strong className="text-foreground">"Adicionar à tela inicial"</strong>.
                </p>
              </>
            ) : (
              <p className="text-lg">
                Pressione{' '}
                <kbd className="bg-muted px-2 py-1 rounded border shadow-sm font-mono text-sm mx-1">
                  Ctrl+D
                </kbd>{' '}
                para favoritar no seu computador.
              </p>
            )}
            <Button
              variant="outline"
              className="mt-2 w-full h-12 text-base font-semibold"
              onClick={() => setPwaOpen(false)}
            >
              Entendi, continuar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
