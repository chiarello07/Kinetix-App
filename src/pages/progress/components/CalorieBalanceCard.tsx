import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Scale, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CalorieBalanceCard({ balance }: { balance: any }) {
  if (!balance) return null

  const isDeficit = balance.status === 'deficit'
  const isSurplus = balance.status === 'surplus'

  return (
    <Card
      className={cn(
        'shadow-subtle border mt-6',
        isDeficit
          ? 'border-blue-500/30 bg-blue-500/5'
          : isSurplus
            ? 'border-orange-500/30 bg-orange-500/5'
            : 'border-green-500/30 bg-green-500/5',
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5" />
          Balanço Calórico Integrado
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center text-sm border shadow-sm">
              🔥
            </div>
            <span className="text-muted-foreground">Queimadas (Treino):</span>
            <span className="font-semibold">{balance.burned.toLocaleString()} kcal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center text-sm border shadow-sm">
              🍽️
            </div>
            <span className="text-muted-foreground">Consumidas (Nutrição):</span>
            <span className="font-semibold">{balance.consumed.toLocaleString()} kcal</span>
          </div>
        </div>
        <div className="text-center md:text-right bg-background p-4 rounded-xl border shadow-sm">
          <div
            className={cn(
              'text-3xl font-bold flex items-center gap-2 justify-center md:justify-end',
              isDeficit ? 'text-blue-500' : isSurplus ? 'text-orange-500' : 'text-green-500',
            )}
          >
            {isDeficit ? (
              <TrendingDown className="h-6 w-6" />
            ) : isSurplus ? (
              <TrendingUp className="h-6 w-6" />
            ) : (
              <Minus className="h-6 w-6" />
            )}
            {balance.balance > 0 ? '+' : ''}
            {balance.balance.toLocaleString()} kcal
          </div>
          <p className="text-sm font-medium mt-2">{balance.message}</p>
        </div>
      </CardContent>
    </Card>
  )
}
