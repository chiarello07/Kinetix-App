import { useState } from 'react'
import { LayoutDashboard, Users, Dumbbell, Settings, Apple, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OverviewTab } from './tabs/OverviewTab'
import { ExercisesTab } from './tabs/ExercisesTab'
import { FoodsTab } from './tabs/FoodsTab'
import { UsersTab } from './tabs/UsersTab'
import { SettingsTab } from './tabs/SettingsTab'
import { LogsTab } from './tabs/LogsTab'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'exercises', label: 'Exercícios', icon: Dumbbell },
    { id: 'foods', label: 'Alimentos', icon: Apple },
    { id: 'logs', label: 'Audit & Logs', icon: Activity },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col md:flex-row gap-4 p-4 md:p-8 animate-fade-in pt-24">
      <aside className="w-full md:w-64 shrink-0">
        <h1 className="text-2xl font-bold mb-6 px-4">Admin Panel</h1>
        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap',
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'hover:bg-muted text-muted-foreground',
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 bg-card rounded-2xl p-4 md:p-6 border shadow-sm overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'exercises' && <ExercisesTab />}
        {activeTab === 'foods' && <FoodsTab />}
        {activeTab === 'logs' && <LogsTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  )
}
