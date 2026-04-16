import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { getGamificationProfile } from '@/services/gamification'
import { Progress } from '@/components/ui/progress'
import { Trophy, Zap, Star, Medal, Award, Flame, Crown, Droplet, Beef } from 'lucide-react'

export function NutritionGamification() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (user) {
      getGamificationProfile(user.id).then(setProfile)
    }
  }, [user])

  if (!profile) return null

  const xpForNextLevel = profile.level * 1000
  const progress = ((profile.experience_points % 1000) / 1000) * 100

  const badges = [
    {
      id: '1',
      name: 'Iniciante',
      icon: Star,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      unlocked: true,
    },
    {
      id: '2',
      name: 'Consistente',
      icon: Flame,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      unlocked: profile.current_streak >= 7,
    },
    {
      id: '3',
      name: 'Mestre da Dieta',
      icon: Crown,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      unlocked: profile.total_points > 5000,
    },
    {
      id: '4',
      name: 'Hidratação Perfeita',
      icon: Droplet,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      unlocked: false,
    },
    {
      id: '5',
      name: 'Proteína Máxima',
      icon: Beef,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      unlocked: profile.total_points > 2000,
    },
    {
      id: '6',
      name: 'Campeão',
      icon: Trophy,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      unlocked: profile.level >= 10,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-subtle bg-gradient-to-br from-[#FF1493]/10 to-[#4B0082]/10 border-none relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
            <Trophy className="w-48 h-48" />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="text-2xl font-black text-primary-foreground">{profile.level}</span>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-primary">
                  Nível Atual
                </p>
                <h2 className="text-2xl font-bold">
                  {profile.level < 10
                    ? 'Iniciante'
                    : profile.level < 25
                      ? 'Intermediário'
                      : 'Avançado'}
                </h2>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span>{profile.experience_points} XP</span>
                <span className="text-muted-foreground">{xpForNextLevel} XP</span>
              </div>
              <Progress value={progress} className="h-3 bg-black/10 [&>div]:bg-primary" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-subtle border-none bg-muted/30">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <Zap className="w-8 h-8 text-amber-500 mb-2" />
              <h3 className="text-3xl font-black">{profile.current_streak}</h3>
              <p className="text-sm text-muted-foreground font-medium">Dias Consecutivos</p>
            </CardContent>
          </Card>
          <Card className="shadow-subtle border-none bg-muted/30">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <Medal className="w-8 h-8 text-blue-500 mb-2" />
              <h3 className="text-3xl font-black">{profile.total_points}</h3>
              <p className="text-sm text-muted-foreground font-medium">Pontos Totais</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" /> Suas Conquistas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b) => (
            <Card
              key={b.id}
              className={`shadow-subtle transition-all duration-300 ${b.unlocked ? '' : 'opacity-50 grayscale'}`}
            >
              <CardContent className="p-5 flex flex-col items-center text-center">
                <div
                  className={`w-14 h-14 rounded-full ${b.bg} flex items-center justify-center mb-3`}
                >
                  <b.icon className={`w-7 h-7 ${b.color}`} />
                </div>
                <h4 className="font-bold text-sm mb-1">{b.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {b.unlocked ? 'Desbloqueado' : 'Bloqueado'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
