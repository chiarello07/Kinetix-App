import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Leaderboard() {
  return (
    <Card className="hidden">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Disponível em breve na versão 2.</p>
      </CardContent>
    </Card>
  )
}
