import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Utensils, ClipboardList } from 'lucide-react'

export default function Nutrition() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-24 md:pb-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-sm">
          <Utensils className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nutrição</h1>
          <p className="text-muted-foreground">Gerencie sua dieta e avaliações nutricionais.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow border-primary/10 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ClipboardList className="w-6 h-6 text-primary" /> Avaliação Nutricional
            </CardTitle>
            <CardDescription className="text-sm">
              Responda à anamnese detalhada para realizar um rastreamento metabólico completo e
              otimizar sua dieta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full h-12 font-bold shadow-sm">
              <Link to="/nutrition-assessments">Iniciar Avaliação Detalhada</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
