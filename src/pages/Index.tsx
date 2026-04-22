import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center p-6 animate-fade-in bg-background">
      <div className="w-[96px] h-[96px] bg-[#fdf2f8] dark:bg-[#ec4899]/10 rounded-3xl flex items-center justify-center mb-10 transform rotate-6 shadow-sm">
        <div className="transform -rotate-6">
          <Activity className="w-12 h-12 text-[#ec4899] stroke-[2.5]" />
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <h1 className="text-[3.25rem] font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1] uppercase">
          KINETIX
        </h1>
        <h1 className="text-[3.25rem] font-black tracking-tighter text-[#ec4899] leading-[1.1]">
          Health
        </h1>
      </div>

      <p className="text-slate-500 dark:text-slate-400 text-center max-w-[280px] mb-12 text-[1.05rem] leading-relaxed">
        Sua plataforma integrada de saúde, nutrição e performance.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-[320px]">
        <Button
          asChild
          className="w-full h-14 text-[1.1rem] font-semibold bg-[#ec4899] hover:bg-[#db2777] text-white rounded-[1rem] shadow-sm transition-transform hover:-translate-y-0.5 border-none"
        >
          <Link to="/assessments">Começar Agora</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full h-14 text-[1.1rem] font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 shadow-[0_2px_15px_rgba(0,0,0,0.04)] rounded-[1rem] transition-transform hover:-translate-y-0.5"
        >
          <Link to="/workouts">Iniciar Treino</Link>
        </Button>
      </div>
    </div>
  )
}
