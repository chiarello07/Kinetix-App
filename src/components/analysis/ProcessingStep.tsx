import { useEffect, useState } from 'react'
import { Scan } from 'lucide-react'

const MESSAGES = [
  'Iniciando MediaPipe Vision...',
  'Detectando 33 pontos anatômicos...',
  'Calculando vetores e ângulos trigonométricos...',
  'Mapeando desvios pela literatura científica...',
  'Gerando score e recomendações...',
]

export function ProcessingStep() {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => Math.min(prev + 1, MESSAGES.length - 1))
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 p-4 text-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-[#FF1493]/20 border-t-[#4B0082] animate-spin duration-1000" />
        <div className="absolute inset-2 rounded-full border-4 border-[#4B0082]/20 border-b-[#FF1493] animate-spin duration-700 reverse" />
        <Scan className="w-12 h-12 text-[#FF1493] animate-pulse" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] to-[#4B0082]">
          Análise em Andamento
        </h2>
        <p className="text-muted-foreground animate-fade-in transition-all duration-300 h-6">
          {MESSAGES[msgIndex]}
        </p>
      </div>
    </div>
  )
}
