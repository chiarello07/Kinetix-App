import { useEffect, useState } from 'react'
import { Scan } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const MESSAGES = [
  'Iniciando MediaPipe Vision...',
  'Detectando 33 pontos anatômicos...',
  'Calculando vetores e ângulos trigonométricos...',
  'Mapeando desvios pela literatura científica...',
  'Gerando score e recomendações...',
]

export function ProcessingStep({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    // Hide the "Visualizar Resultados" button immediately if it exists in the parent
    const hideParentButton = () => {
      const btns = Array.from(document.querySelectorAll('button'))
      const target = btns.find((b) => b.textContent?.includes('Visualizar Resultados'))
      if (target) {
        target.style.display = 'none'
      }
    }
    hideParentButton()

    // Also observe DOM changes in case the parent renders the button after a delay
    const observer = new MutationObserver(hideParentButton)
    observer.observe(document.body, { childList: true, subtree: true })

    const totalTime = 4000 // 4 seconds
    const intervalTime = 50
    const steps = totalTime / intervalTime
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min((currentStep / steps) * 100, 100)
      setProgress(newProgress)

      const newMsgIndex = Math.floor((newProgress / 100) * MESSAGES.length)
      setMsgIndex(Math.min(newMsgIndex, MESSAGES.length - 1))

      if (newProgress >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          if (onComplete) {
            onComplete()
          } else {
            // Fallback: auto-click the button if onComplete is not provided
            const btns = Array.from(document.querySelectorAll('button'))
            const target = btns.find((b) => b.textContent?.includes('Visualizar Resultados'))
            if (target) {
              target.click()
            }
          }
        }, 400)
      }
    }, intervalTime)

    return () => {
      clearInterval(timer)
      observer.disconnect()
    }
  }, [onComplete])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 p-4 text-center animate-fade-in">
      <div className="relative w-40 h-40 flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-[#FF1493]/20 border-t-[#4B0082] animate-spin duration-1000" />
        <div className="absolute inset-2 rounded-full border-4 border-[#4B0082]/20 border-b-[#FF1493] animate-spin duration-700 reverse" />
        <Scan className="absolute w-12 h-12 text-[#FF1493] animate-pulse opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-black text-foreground">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="space-y-5 max-w-md w-full">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] to-[#4B0082]">
          Processando Imagens...
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Nossa IA está analisando seus ângulos biomecânicos e identificando possíveis desvios
          posturais para otimizar seu treino.
        </p>

        <Progress
          value={progress}
          className="h-3 w-full bg-secondary overflow-hidden rounded-full"
        />

        <p className="text-sm font-medium text-primary transition-all duration-300 h-6">
          {MESSAGES[msgIndex]}
        </p>
      </div>
    </div>
  )
}
