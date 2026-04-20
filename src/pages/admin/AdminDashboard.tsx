import { useAuth } from '@/hooks/use-auth'
import { Navigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Users, Activity, DollarSign, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useAuth()

  // Restrição de acesso
  if (user?.email !== 'christianochiarello@gmail.com') {
    return <Navigate to="/" replace />
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-24 md:pb-6">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Painel Administrativo</h1>
        <p className="text-muted-foreground text-lg mt-2">Visão geral do sistema KINETIX.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/10 shadow-sm bg-card hover:-translate-y-1 transition-transform">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usuários Ativos
            </CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,245</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +12% em 30 dias
            </p>
          </CardContent>
        </Card>
        <Card className="border-primary/10 shadow-sm bg-card hover:-translate-y-1 transition-transform">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Treinos Realizados
            </CardTitle>
            <Activity className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,392</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +24% em 30 dias
            </p>
          </CardContent>
        </Card>
        <Card className="border-primary/10 shadow-sm bg-card hover:-translate-y-1 transition-transform">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avaliações Posturais
            </CardTitle>
            <Activity className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3,102</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +18% em 30 dias
            </p>
          </CardContent>
        </Card>
        <Card className="border-primary/10 shadow-sm bg-card hover:-translate-y-1 transition-transform">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Mensal
            </CardTitle>
            <DollarSign className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 14.500</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +8% em 30 dias
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle>Adesão Recente</CardTitle>
            <CardDescription>Novos usuários registrados nos últimos 7 dias.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold">
                    {i}
                  </div>
                  <div>
                    <p className="font-medium text-sm">usuario{i}@exemplo.com</p>
                    <p className="text-xs text-muted-foreground">Há {i} horas</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-primary">Plano Pro</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
