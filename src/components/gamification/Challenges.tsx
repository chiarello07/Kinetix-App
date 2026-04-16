import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Challenges() {
  return (
    <Card className="hidden">
      <CardHeader>
        <CardTitle>Desafios Ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Disponível em breve na versão 2.</p>
      </CardContent>
    </Card>
  )
}
