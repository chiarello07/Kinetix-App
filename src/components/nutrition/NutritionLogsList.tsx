import { Camera, Mic, Type, CheckCircle2, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function NutritionLogsList({
  logs,
  onDelete,
}: {
  logs: any[]
  onDelete: (id: string) => void
}) {
  if (logs.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-xl flex items-center gap-2">
        Refeições Registradas
        <span className="bg-primary/10 text-primary text-xs font-bold py-1 px-2.5 rounded-full">
          {logs.length}
        </span>
      </h3>
      <div className="flex flex-col gap-4">
        {logs.map((log) => (
          <Card
            key={log.id}
            className="shadow-subtle border-border/50 overflow-hidden hover:shadow-elevation transition-shadow"
          >
            <div className="w-1.5 bg-gradient-to-b from-[#FF1493] to-[#4B0082] h-full absolute left-0 top-0"></div>
            <CardContent className="p-5 pl-7">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    {log.input_method === 'photo' ? (
                      <Camera className="w-3.5 h-3.5" />
                    ) : log.input_method === 'audio' ? (
                      <Mic className="w-3.5 h-3.5" />
                    ) : (
                      <Type className="w-3.5 h-3.5" />
                    )}
                    {log.log_time?.substring(0, 5) || '12:00'}
                  </span>
                  {log.ai_confidence > 0.8 && (
                    <span className="flex items-center text-[10px] uppercase tracking-wider text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full font-bold">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> IA Confirmada
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-lg text-primary">{log.total_calories} kcal</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete(log.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2.5">
                {log.foods.map((f: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm items-center border-b border-border/50 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="font-medium text-foreground">
                      {f.quantity}
                      {f.unit} {f.foodName || f.food_name}
                    </span>
                    <span className="text-muted-foreground text-xs font-medium bg-muted px-2 py-0.5 rounded">
                      {f.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> P:{' '}
                  {log.total_protein_grams}g
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span> C:{' '}
                  {log.total_carbs_grams}g
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span> G:{' '}
                  {log.total_fat_grams}g
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
