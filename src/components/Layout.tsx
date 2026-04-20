import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { LoginPage } from '@/pages/auth/LoginPage'
import { Button } from '@/components/ui/button'
import {
  Activity,
  LayoutDashboard,
  Utensils,
  Dumbbell,
  LineChart,
  User as UserIcon,
  Settings,
  LogOut,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Layout() {
  const { user, signOut, loading } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center animate-pulse">Carregando...</div>
    )
  if (!user) return <LoginPage />

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar Lateral Esquerdo */}
      <aside className="w-64 border-r bg-card flex-col hidden md:flex z-10 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b">
          <Activity className="w-6 h-6 text-primary mr-2" />
          <span className="font-bold text-lg tracking-tight">KINETIX</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link to="/">
            <Button
              variant={location.pathname === '/' ? 'secondary' : 'ghost'}
              className="w-full justify-start font-medium"
            >
              <LayoutDashboard className="mr-3 h-4 w-4" /> Painel
            </Button>
          </Link>
          <Link to="/nutrition">
            <Button
              variant={location.pathname.startsWith('/nutrition') ? 'secondary' : 'ghost'}
              className="w-full justify-start font-medium"
            >
              <Utensils className="mr-3 h-4 w-4" /> Nutrição
            </Button>
          </Link>
          <Link to="/workouts">
            <Button
              variant={location.pathname.startsWith('/workout') ? 'secondary' : 'ghost'}
              className="w-full justify-start font-medium"
            >
              <Dumbbell className="mr-3 h-4 w-4" /> Treinos
            </Button>
          </Link>
          <Link to="/progress">
            <Button
              variant={location.pathname.startsWith('/progress') ? 'secondary' : 'ghost'}
              className="w-full justify-start font-medium"
            >
              <LineChart className="mr-3 h-4 w-4" /> Progresso
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              variant={location.pathname.startsWith('/profile') ? 'secondary' : 'ghost'}
              className="w-full justify-start font-medium"
            >
              <UserIcon className="mr-3 h-4 w-4" /> Perfil
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b bg-card/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="md:hidden flex items-center">
            <Activity className="w-6 h-6 text-primary mr-2" />
            <span className="font-bold text-lg tracking-tight">KINETIX</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            {/* Seletor de Tema */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {theme === 'light' ? (
                    <Sun className="h-5 w-5" />
                  ) : theme === 'dark' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Monitor className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="w-4 h-4 mr-2" /> Claro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="w-4 h-4 mr-2" /> Escuro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Monitor className="w-4 h-4 mr-2" /> Automático
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dropdown de Usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full border border-border/50"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?seed=${user.id}`} />
                    <AvatarFallback>
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground break-all">
                  {user.email}
                </div>
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Configurações
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto relative">
          <Outlet />
        </main>

        {/* Mobile Navigation Bar */}
        <nav className="md:hidden h-16 border-t bg-card flex items-center justify-around px-2 sticky bottom-0 z-20">
          <Link
            to="/"
            className={`p-2 rounded-xl flex flex-col items-center ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] mt-1 font-medium">Painel</span>
          </Link>
          <Link
            to="/nutrition"
            className={`p-2 rounded-xl flex flex-col items-center ${location.pathname.startsWith('/nutrition') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Utensils className="h-5 w-5" />
            <span className="text-[10px] mt-1 font-medium">Nutrição</span>
          </Link>
          <Link
            to="/workouts"
            className={`p-2 rounded-xl flex flex-col items-center ${location.pathname.startsWith('/workout') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Dumbbell className="h-5 w-5" />
            <span className="text-[10px] mt-1 font-medium">Treinos</span>
          </Link>
          <Link
            to="/progress"
            className={`p-2 rounded-xl flex flex-col items-center ${location.pathname.startsWith('/progress') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <LineChart className="h-5 w-5" />
            <span className="text-[10px] mt-1 font-medium">Progresso</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
