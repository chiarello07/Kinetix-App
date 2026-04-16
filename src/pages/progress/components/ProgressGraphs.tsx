import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export function ProgressGraphs({ graphs }: { graphs: any }) {
  if (!graphs) return null

  const volConfig = { volume: { label: 'Reps', color: 'hsl(var(--primary))' } }
  const weightConfig = { weight: { label: 'Kg', color: 'hsl(var(--secondary))' } }
  const adherenceConfig = {
    protein: { label: 'Proteína', color: 'hsl(var(--chart-1))' },
    carbs: { label: 'Carbos', color: 'hsl(var(--chart-2))' },
    fat: { label: 'Gordura', color: 'hsl(var(--chart-3))' },
  }
  const balanceConfig = {
    surplus: { label: 'Superávit', color: '#f97316' },
    deficit: { label: 'Déficit', color: '#3b82f6' },
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <ChartCard title="Volume de Treino" desc="Semana a Semana" config={volConfig}>
        <LineChart
          data={graphs.volumeWeekly.data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-volume)"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartCard>

      <ChartCard title="Carga de Treino" desc="Semana a Semana" config={weightConfig}>
        <BarChart
          data={graphs.weightWeekly.data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" fill="var(--color-weight)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartCard>

      <ChartCard title="Aderência Nutricional" desc="Semana a Semana (%)" config={adherenceConfig}>
        <AreaChart
          data={graphs.adherenceWeekly.data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="protein"
            stackId="1"
            stroke="var(--color-protein)"
            fill="var(--color-protein)"
          />
          <Area
            type="monotone"
            dataKey="carbs"
            stackId="1"
            stroke="var(--color-carbs)"
            fill="var(--color-carbs)"
          />
          <Area
            type="monotone"
            dataKey="fat"
            stackId="1"
            stroke="var(--color-fat)"
            fill="var(--color-fat)"
          />
        </AreaChart>
      </ChartCard>

      <ChartCard title="Balanço Calórico" desc="Dia a Dia" config={balanceConfig}>
        <BarChart
          data={graphs.calorieBalanceDaily.data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
          <Bar dataKey="value" radius={[4, 4, 4, 4]}>
            {graphs.calorieBalanceDaily.data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.value > 0 ? 'var(--color-surplus)' : 'var(--color-deficit)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartCard>
    </div>
  )
}

function ChartCard({ title, desc, config, children }: any) {
  return (
    <Card className="shadow-subtle border-border/50">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[250px] w-full">
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
