import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ClipboardList, Dumbbell, Utensils, BrainCircuit } from 'lucide-react'

export default function AssessmentsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-24 md:pb-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-sm">
          <ClipboardList className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análises</h1>
          <p className="text-muted-foreground">
            Central de questionários e avaliações inteligentes.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Utensils className="w-6 h-6 text-primary" /> Anamnese de Nutrição
            </CardTitle>
            <CardDescription className="text-sm">
              Mapeamento metabólico e alimentar para geração automática da sua dieta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full h-12 font-bold shadow-sm">
              <Link to="/nutrition-assessments">Realizar Análise de Dieta</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BrainCircuit className="w-6 h-6 text-primary" /> Análise Inteligente
            </CardTitle>
            <CardDescription className="text-sm">
              Captura e análise biomecânica com IA para gerar seu treino corretivo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full h-12 font-bold shadow-sm">
              <Link to="/analysis">Realizar Análise de Treino</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Dumbbell className="w-6 h-6 text-primary" /> Anamnese de Treino (Básica)
            </CardTitle>
            <CardDescription className="text-sm">
              Questionário inicial sobre seu histórico de treinos e objetivos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full h-12 font-bold shadow-sm">
              <Link to="/onboarding">Responder Questionário</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
