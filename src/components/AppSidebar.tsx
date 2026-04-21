import { Link, useLocation } from 'react-router-dom'
import { Home, Utensils, Dumbbell, TrendingUp, User, Activity, ClipboardList } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const items = [
  { title: 'Início', url: '/index', icon: Home },
  { title: 'Nutrição', url: '/nutrition', icon: Utensils },
  { title: 'Treinos', url: '/workouts', icon: Dumbbell },
  { title: 'Análises', url: '/assessments', icon: ClipboardList },
  { title: 'Progresso', url: '/progress', icon: TrendingUp },
  { title: 'Perfil', url: '/profile', icon: User },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r hidden md:flex bg-background">
      <SidebarHeader className="p-4 flex flex-row items-center gap-3 border-b border-border/50">
        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg flex items-center justify-center">
          <Activity className="w-6 h-6" />
        </div>
        <span className="font-extrabold text-xl tracking-tight text-foreground uppercase">
          KINETIX
        </span>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-4 mb-2 uppercase text-xs tracking-wider font-semibold">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {items.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  (item.url === '/index' && location.pathname === '/')
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link
                        to={item.url}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                          isActive
                            ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground font-medium',
                        )}
                      >
                        <item.icon
                          className={cn(
                            'w-5 h-5',
                            isActive ? 'text-primary' : 'text-muted-foreground',
                          )}
                        />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
