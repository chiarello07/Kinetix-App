import { Link, useLocation } from 'react-router-dom'
import { Home, Utensils, Dumbbell, TrendingUp, User, Activity } from 'lucide-react'
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

const items = [
  { title: 'Painel', url: '/', icon: Home },
  { title: 'Nutrição', url: '/nutrition', icon: Utensils },
  { title: 'Treinos', url: '/workouts', icon: Dumbbell },
  { title: 'Progresso', url: '/progress', icon: TrendingUp },
  { title: 'Perfil', url: '/profile', icon: User },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r hidden md:flex">
      <SidebarHeader className="p-4 flex flex-row items-center gap-2">
        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
          <Activity className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg tracking-tight text-foreground">
          Kinetix
          <br />
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
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
