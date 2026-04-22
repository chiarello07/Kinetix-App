import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in-up">
      <div className="w-24 h-24 bg-gradient-to-br from-[#FF1493] to-[#4B0082] rounded-3xl flex items-center justify-center shadow-xl shadow-primary/20 mb-8 transform -rotate-6">
        <span className="text-4xl font-black text-white rotate-6">K</span>
      </div>

      <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
        KINETIX{' '}
        <span className="text-[#FF1493]">
          App
          <br />
        </span>
      </h1>

      <p className="text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-[1.23rem]">
        Sua plataforma integrada de saúde, treinos personalizados e dieta inteligente.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
        <Button
          asChild
          size="lg"
          className="w-full text-lg h-14 bg-foreground text-background hover:bg-foreground/90 font-bold shadow-lg"
        >
          <Link to="/analysis">
            Começar Agora <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full text-lg h-14 font-bold border-2 border-[#FF1493]/20 hover:border-[#FF1493]/50 hover:bg-[#FF1493]/5 text-foreground"
        >
          <Link to="/workouts">
            <Play className="w-5 h-5 mr-2 text-[#FF1493]" /> Iniciar Treino
          </Link>
        </Button>
      </div>
    </div>
  )
}
