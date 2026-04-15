import { PieChart, ListFilter, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useMainStore from '@/stores/useMainStore'
import { AddMealDialog } from '@/components/AddMealDialog'

export default function Nutrition() {
  const { meals, caloriesGoal, caloriesConsumed, removeMeal } = useMainStore()
  const mealTypes = ['Café da Manhã', 'Almoço', 'Lanche', 'Jantar']

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Diário de Nutrição</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitore sua alimentação diária</p>
        </div>
        <AddMealDialog />
      </div>

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="log" className="gap-2">
            <ListFilter className="w-4 h-4" /> Registros
          </TabsTrigger>
          <TabsTrigger value="macros" className="gap-2">
            <PieChart className="w-4 h-4" /> Análise
          </TabsTrigger>
        </TabsList>

        <TabsContent value="log" className="animate-fade-in-up">
          <div className="flex flex-col gap-6">
            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90 mb-1">Total Consumido</p>
                  <p className="text-3xl font-bold">
                    {caloriesConsumed}{' '}
                    <span className="text-lg font-normal opacity-80">/ {caloriesGoal} kcal</span>
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full border-4 border-primary-foreground/20 flex items-center justify-center">
                  <span className="font-bold text-sm">
                    {Math.round((caloriesConsumed / caloriesGoal) * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {mealTypes.map((type) => {
              const typeMeals = meals.filter((m) => m.type === type)
              const typeCalories = typeMeals.reduce((acc, m) => acc + m.calories, 0)

              return (
                <div key={type} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-semibold text-lg">{type}</h3>
                    <span className="text-sm font-medium text-muted-foreground">
                      {typeCalories} kcal
                    </span>
                  </div>

                  {typeMeals.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {typeMeals.map((meal) => (
                        <Card key={meal.id} className="shadow-subtle border-border/50">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="font-medium">{meal.name}</span>
                              <span className="text-xs text-muted-foreground mt-0.5">
                                P: {meal.protein}g • C: {meal.carbs}g • G: {meal.fat}g
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-sm">{meal.calories} kcal</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeMeal(meal.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-muted/30 border border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        Nenhum registro para esta refeição.
                      </p>
                      <AddMealDialog>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          Adicionar Alimento
                        </Button>
                      </AddMealDialog>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="macros" className="animate-fade-in-up">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Distribuição de Macronutrientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                <p className="text-muted-foreground text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4" />
                  Gráfico detalhado em desenvolvimento
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
