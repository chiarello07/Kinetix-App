import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Activity, Dumbbell, Utensils, LineChart, ClipboardList } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

export default function Index() {
  const { user } = useAuth()
  const [hasData, setHasData] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      checkData()
    }
  }, [user])

  const checkData = async () => {
    try {
      const { count } = await supabase
        .from('progress_metrics')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id)

      if (count && count > 0) {
        setHasData(true)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const firstName =
    user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Atleta'

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center p-6 animate-fade-in-up bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary shadow-sm ring-1 ring-primary/20">
        <Activity className="w-12 h-12" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
        Olá, <span className="text-primary">{firstName}</span>!
      </h2>

      <p className="text-muted-foreground max-w-md mb-10 text-lg">
        {hasData
          ? 'Bem-vindo de volta! Acesse suas análises, veja seus planos e registre seu progresso hoje.'
          : 'Seu progresso começa aqui! Acesse a aba de Análises para que a IA gere seus planos inteligentes.'}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-md">
        <Button
          asChild
          size="lg"
          className="h-14 px-8 font-bold text-lg w-full sm:w-auto shadow-lg hover:-translate-y-1 transition-transform"
        >
          <Link to="/assessments">
            <ClipboardList className="w-5 h-5 mr-2" /> Minhas Análises
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-14 px-8 font-bold text-lg w-full sm:w-auto bg-background hover:-translate-y-1 transition-transform"
        >
          <Link to="/progress">
            <LineChart className="w-5 h-5 mr-2" /> Ver Progresso
          </Link>
        </Button>
      </div>
    </div>
  )
}
