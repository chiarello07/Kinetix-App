import { useState } from 'react'
import { Play, Clock, Dumbbell } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ActiveWorkout } from '@/components/ActiveWorkout'

const routines = [
  { id: 1, name: 'Superior Força', time: '45 min', intensity: 'Alta', img: 'black&dpr=2' },
  { id: 2, name: 'Inferior Foco', time: '50 min', intensity: 'Alta', img: 'blue&dpr=2' },
  { id: 3, name: 'Cardio HIIT', time: '20 min', intensity: 'Extrema', img: 'orange&dpr=2' },
  { id: 4, name: 'Mobilidade', time: '15 min', intensity: 'Baixa', img: 'green&dpr=2' },
]

export default function Workouts() {
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null)

  if (activeWorkout) {
    return <ActiveWorkout workoutName={activeWorkout} onClose={() => setActiveWorkout(null)} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight">Meus Treinos</h1>
        <p className="text-sm text-muted-foreground mt-1">Escolha sua rotina para hoje</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routines.map((routine) => (
          <Card
            key={routine.id}
            className="overflow-hidden border-none shadow-elevation group relative h-48 flex flex-col justify-end p-5"
          >
            <img
              src={`https://img.usecurling.com/p/600/300?q=fitness&color=${routine.img}`}
              alt={routine.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 flex items-end justify-between">
              <div className="flex flex-col gap-1 text-white">
                <h3 className="font-bold text-xl tracking-tight leading-none">{routine.name}</h3>
                <div className="flex items-center gap-3 text-xs font-medium opacity-80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {routine.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Dumbbell className="w-3 h-3" /> {routine.intensity}
                  </span>
                </div>
              </div>
              <Button
                size="icon"
                className="rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transform transition-transform group-hover:scale-110"
                onClick={() => setActiveWorkout(routine.name)}
              >
                <Play className="w-4 h-4 ml-0.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
