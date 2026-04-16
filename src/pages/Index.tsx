import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>

      <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
        <div className="w-24 h-24 mx-auto bg-primary-gradient rounded-3xl rotate-12 flex items-center justify-center shadow-xl mb-12">
          <div className="w-10 h-10 bg-white rounded-xl -rotate-12 opacity-90 shadow-inner" />
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Nutrição e Treino <br />
            <span className="text-primary-gradient">Personalizados</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Uma abordagem científica para transformar seu corpo. Avaliação completa em 12 passos
            para criar seu plano perfeito.
          </p>
        </div>

        <div className="pt-8 flex flex-col gap-4">
          <Button
            asChild
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-primary-gradient text-white rounded-xl shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-1"
          >
            <Link to="/onboarding">Começar Agora</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg transition-all hover:-translate-y-1"
          >
            <Link to="/workout/execute">Iniciar Treino (Prompt 11)</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
