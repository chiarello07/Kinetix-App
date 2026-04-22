import { Link, useLocation } from 'react-router-dom'
import { Home, Utensils, Dumbbell, User, ClipboardList, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { title: 'Início', url: '/index', icon: Home },
  { title: 'Nutrição', url: '/nutrition', icon: Utensils },
  { title: 'Treinos', url: '/workouts', icon: Dumbbell },
  { title: 'Análises', url: '/assessments', icon: ClipboardList },
  { title: 'Progresso', url: '/progress', icon: TrendingUp },
  { title: 'Perfil', url: '/profile', icon: User },
]

export function BottomNav({ className }: { className?: string }) {
  const location = useLocation()

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 pb-safe pt-2 px-1 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden',
        className,
      )}
    >
      <ul className="flex items-center justify-around pb-2 px-0.5">
        {items.map((item) => {
          const isActive =
            location.pathname === item.url || (item.url === '/index' && location.pathname === '/')
          return (
            <li key={item.title} className="flex-1 max-w-[64px]">
              <Link
                to={item.url}
                className={cn(
                  'flex flex-col items-center justify-center gap-[2px] w-full py-1 text-muted-foreground transition-colors',
                  isActive && 'text-primary',
                )}
              >
                <div
                  className={cn(
                    'p-1.5 rounded-full transition-all duration-300',
                    isActive && 'bg-primary/10',
                  )}
                >
                  <item.icon className={cn('w-[20px] h-[20px]', isActive && 'fill-primary/20')} />
                </div>
                <span
                  className={cn(
                    'text-[8px] sm:text-[9px] tracking-tighter truncate w-full text-center',
                    isActive ? 'font-bold' : 'font-medium',
                  )}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
