import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const weightData = [
  { day: 'Seg', weight: 79.2 },
  { day: 'Ter', weight: 78.9 },
  { day: 'Qua', weight: 78.8 },
  { day: 'Qui', weight: 78.5 },
  { day: 'Sex', weight: 78.5 },
  { day: 'Sáb', weight: 78.2 },
  { day: 'Dom', weight: 78.0 },
]

const calorieData = [
  { day: 'Seg', calories: 2100 },
  { day: 'Ter', calories: 2300 },
  { day: 'Qua', calories: 2250 },
  { day: 'Qui', calories: 2000 },
  { day: 'Sex', calories: 2400 },
  { day: 'Sáb', calories: 2800 },
  { day: 'Dom', calories: 2200 },
]

const chartConfig = {
  weight: { label: 'Peso', color: 'hsl(var(--primary))' },
  calories: { label: 'Calorias', color: 'hsl(var(--secondary))' },
}

export default function Progress() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Progresso</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Acompanhe sua evolução ao longo do tempo
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-subtle border-border/50">
          <CardHeader>
            <CardTitle>Evolução de Peso</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart data={weightData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={10} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--color-weight)"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-subtle border-border/50">
          <CardHeader>
            <CardTitle>Consistência Calórica</CardTitle>
            <CardDescription>Calorias consumidas</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={calorieData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={10} />
                <YAxis axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="calories" fill="var(--color-calories)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
