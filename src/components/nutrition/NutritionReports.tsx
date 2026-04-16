import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Line,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { Flame, Target, TrendingUp } from 'lucide-react'

export function NutritionReports() {
  const { user } = useAuth()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (user) loadData()
  }, [user])

  const loadData = async () => {
    const { data: summaries } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('user_id', user!.id)
      .order('summary_date', { ascending: true })
      .limit(7)

    if (summaries && summaries.length > 0) {
      const formatted = summaries.map((s) => ({
        date: s.summary_date.substring(5, 10),
        consumed: s.total_calories_consumed || 0,
        target: s.target_calories || 2000,
        adherence: s.calories_percentage
          ? Math.min(100, Math.max(0, 100 - Math.abs(100 - s.calories_percentage)))
          : 0,
      }))
      setData(formatted)
    } else {
      const mock = Array.from({ length: 7 }).map((_, i) => ({
        date: `Dia ${i + 1}`,
        consumed: 1800 + Math.random() * 400,
        target: 2000,
        adherence: 70 + Math.random() * 30,
      }))
      setData(mock)
    }
  }

  const chartConfig = {
    consumed: { label: 'Consumidas', color: 'hsl(var(--primary))' },
    target: { label: 'Meta', color: 'hsl(var(--muted-foreground))' },
    adherence: { label: 'Aderência (%)', color: 'hsl(var(--secondary))' },
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aderência Média</p>
                <h3 className="text-2xl font-bold">85%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-xl">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Média Calórica</p>
                <h3 className="text-2xl font-bold">1.950 kcal</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Padrão Semanal</p>
                <h3 className="text-2xl font-bold">Estável</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle>Histórico de Calorias (7 Dias)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <RechartsTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="consumed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle>Padrões e Recomendações</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span>
              <div>
                <p className="font-medium text-sm">
                  Você é consistente com o almoço (92% de aderência).
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Continue priorizando proteínas magras nesta refeição.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0"></span>
              <div>
                <p className="font-medium text-sm">Falta de proteína no café da manhã.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tente incluir ovos ou iogurte grego para melhorar a saciedade.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
              <div>
                <p className="font-medium text-sm">Boa hidratação registrada.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Você está atingindo 80% da sua meta de água diária.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
