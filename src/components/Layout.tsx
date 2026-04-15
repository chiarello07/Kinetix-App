import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { AppHeader } from './AppHeader'
import { BottomNav } from './BottomNav'

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full relative h-screen">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
            <div className="max-w-5xl mx-auto w-full h-full animate-fade-in-up">
              <Outlet />
            </div>
          </main>
          <BottomNav className="md:hidden" />
        </div>
      </div>
    </SidebarProvider>
  )
}
