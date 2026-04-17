import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AddMealDialog } from './AddMealDialog'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <span className="font-bold text-lg tracking-tight text-foreground">FitLife Hub</span>
      </div>
      <div className="hidden md:block">
        <h2 className="text-sm font-medium text-muted-foreground">
          <br />
        </h2>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <AddMealDialog />
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
        </Button>
        <Avatar className="w-9 h-9 border border-border shadow-sm">
          <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1" />
          <AvatarFallback>FL</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
