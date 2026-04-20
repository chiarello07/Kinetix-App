import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NutritionDaily } from '@/components/nutrition/NutritionDaily'
import { NutritionChat } from '@/components/nutrition/NutritionChat'
import { NutritionReports } from '@/components/nutrition/NutritionReports'
import { NutritionGamification } from '@/components/nutrition/NutritionGamification'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Nutrition() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up pb-24 max-w-4xl mx-auto w-full">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nutrição Inteligente</h1>
            <p className="text-sm text-muted-foreground mt-1 capitalize font-medium">
              {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
            </p>
          </div>
          <a
            href="/nutrition-assessments"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shrink-0"
          >
            Anamnese Detalhada
          </a>
        </div>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 bg-muted/50 p-1 rounded-xl h-14">
          <TabsTrigger value="daily" className="rounded-lg h-full font-semibold">
            Diário
          </TabsTrigger>
          <TabsTrigger value="chat" className="rounded-lg h-full font-semibold md:flex hidden">
            Assistente
          </TabsTrigger>
          <TabsTrigger value="chat" className="rounded-lg h-full font-semibold md:hidden">
            IA
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg h-full font-semibold">
            Análises
          </TabsTrigger>
          <TabsTrigger value="gamification" className="rounded-lg h-full font-semibold">
            Prêmios
          </TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="mt-0">
          <NutritionDaily />
        </TabsContent>
        <TabsContent value="chat" className="mt-0">
          <NutritionChat />
        </TabsContent>
        <TabsContent value="reports" className="mt-0">
          <NutritionReports />
        </TabsContent>
        <TabsContent value="gamification" className="mt-0">
          <NutritionGamification />
        </TabsContent>
      </Tabs>
    </div>
  )
}
