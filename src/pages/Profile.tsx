import { useState, useEffect, useRef } from 'react'
import { Save, Edit2, AlertCircle, RefreshCw, User as UserIcon, Camera } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { detectCriticalChanges, CriticalChange } from '@/lib/utils/profile-utils'
import { regeneratePlans } from '@/services/regeneration'
import { Badge } from '@/components/ui/badge'

export default function Profile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [fullName, setFullName] = useState('')

  const [criticalChanges, setCriticalChanges] = useState<CriticalChange[]>([])
  const [showModal, setShowModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || '')
      setAvatarUrl(
        user.user_metadata?.avatar_url || `https://img.usecurling.com/ppl/large?seed=${user.id}`,
      )
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('nutrition_profiles')
      .select('*')
      .eq('user_id', user!.id)
      .single()

    if (data) {
      setProfile(data)
      setFormData(data)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setAvatarUrl(url)
      await supabase.auth.updateUser({
        data: { avatar_url: url },
      })
      toast({ title: 'Foto atualizada', description: 'Sua foto de perfil foi atualizada.' })
    }
  }

  const handleSave = async () => {
    if (fullName !== user?.user_metadata?.full_name) {
      await supabase.auth.updateUser({
        data: { full_name: fullName },
      })
    }

    const changes = detectCriticalChanges(profile, formData)

    if (changes.some((c) => c.severity === 'critical')) {
      setCriticalChanges(changes)
      setShowModal(true)
    } else {
      await saveProfile()
    }
  }

  const saveProfile = async () => {
    setIsSaving(true)
    const { error } = await supabase
      .from('nutrition_profiles')
      .update({
        current_weight_kg: formData.current_weight_kg,
        target_weight_kg: formData.target_weight_kg,
        primary_goal: formData.primary_goal,
        exercise_days_per_week: formData.exercise_days_per_week,
        fitness_level: formData.fitness_level,
        meals_per_day: formData.meals_per_day,
      })
      .eq('id', profile.id)

    setIsSaving(false)
    if (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o perfil',
        variant: 'destructive',
      })
    } else {
      setProfile(formData)
      setIsEditing(false)
      setShowModal(false)
      toast({ title: 'Sucesso', description: 'Perfil atualizado com sucesso' })
    }
  }

  const handleRegenerate = async () => {
    setIsGenerating(true)
    try {
      await regeneratePlans(user!.id, profile.id, {
        current_weight_kg: formData.current_weight_kg,
        target_weight_kg: formData.target_weight_kg,
        primary_goal: formData.primary_goal,
        exercise_days_per_week: formData.exercise_days_per_week,
        fitness_level: formData.fitness_level,
        meals_per_day: formData.meals_per_day,
      })
      setProfile(formData)
      setIsEditing(false)
      setShowModal(false)
      toast({ title: 'Sucesso', description: 'Novo treino e plano nutricional gerados!' })
    } catch (e) {
      toast({ title: 'Erro', description: 'Falha ao regenerar planos', variant: 'destructive' })
    } finally {
      setIsGenerating(false)
    }
  }

  if (!profile)
    return (
      <div className="p-8 text-center text-muted-foreground animate-pulse">
        Carregando perfil...
      </div>
    )

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-fade-in-up pb-24 md:pb-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit2 className="w-4 h-4" /> Editar Perfil
          </Button>
        )}
      </div>

      <Card className="border-none shadow-subtle bg-primary/5">
        <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar className="w-24 h-24 border-4 border-background shadow-sm transition-transform group-hover:scale-105">
              <AvatarImage src={avatarUrl || undefined} />
              <AvatarFallback>
                <UserIcon className="w-10 h-10 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </div>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2 mt-4 md:mt-2">
            {isEditing ? (
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu Nome Completo"
                className="text-xl font-bold bg-background max-w-xs mx-auto md:mx-0"
              />
            ) : (
              <h2 className="text-2xl font-bold">{fullName || 'Atleta Kinetix'}</h2>
            )}
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-elevation">
        <CardHeader>
          <CardTitle>Informações Essenciais</CardTitle>
          <CardDescription>
            Seus dados biométricos principais que guiam nossos planos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Peso Atual (kg)</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.current_weight_kg || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, current_weight_kg: Number(e.target.value) })
                  }
                />
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium">
                  {profile.current_weight_kg} kg
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Peso Objetivo (kg)</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.target_weight_kg || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, target_weight_kg: Number(e.target.value) })
                  }
                />
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium">
                  {profile.target_weight_kg} kg
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Objetivo Principal</Label>
              {isEditing ? (
                <Select
                  value={formData.primary_goal}
                  onValueChange={(v) => setFormData({ ...formData, primary_goal: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fat_loss">Perder Gordura</SelectItem>
                    <SelectItem value="health">Saúde / Manutenção</SelectItem>
                    <SelectItem value="muscle_gain">Ganhar Músculo</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium capitalize">
                  {profile.primary_goal?.replace('_', ' ')}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Dias de Treino / Semana</Label>
              {isEditing ? (
                <Select
                  value={String(formData.exercise_days_per_week)}
                  onValueChange={(v) =>
                    setFormData({ ...formData, exercise_days_per_week: Number(v) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5, 6].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} dias
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium">
                  {profile.exercise_days_per_week} dias
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Nível de Experiência</Label>
              {isEditing ? (
                <Select
                  value={formData.fitness_level}
                  onValueChange={(v) => setFormData({ ...formData, fitness_level: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium capitalize">
                  {profile.fitness_level}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Refeições por Dia</Label>
              {isEditing ? (
                <Select
                  value={String(formData.meals_per_day || 4)}
                  onValueChange={(v) => setFormData({ ...formData, meals_per_day: Number(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[3, 4, 5, 6].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} refeições
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium">
                  {profile.meals_per_day || 4} refeições
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6 bg-muted/20">
          <Button
            variant="outline"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={async () => {
              if (user?.email) {
                await supabase.auth.resetPasswordForEmail(user.email)
                toast({
                  title: 'Email enviado',
                  description: 'Verifique sua caixa de entrada para redefinir a senha.',
                })
              }
            }}
          >
            Alterar Senha
          </Button>
        </CardFooter>
        {isEditing && (
          <CardFooter className="flex justify-end gap-3 border-t pt-6 bg-background">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setFormData(profile)
                setFullName(user?.user_metadata?.full_name || '')
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Save className="w-4 h-4" /> {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </CardFooter>
        )}
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Mudanças Importantes
            </DialogTitle>
            <DialogDescription>
              Você fez alterações que impactam diretamente seu plano de treino e nutrição.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              {criticalChanges.map((change, i) => (
                <div key={i} className="p-3 bg-secondary/30 rounded-lg text-sm">
                  <p className="font-semibold">{change.message}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    De: {change.oldValue} → Para: {change.newValue}
                  </p>
                  {change.affectsNutrition && (
                    <Badge variant="secondary" className="mt-2 text-[10px]">
                      Afeta Nutrição
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">
              Recomendamos gerar um novo treino e plano nutricional para aproveitar melhor essas
              mudanças.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={saveProfile} disabled={isGenerating}>
              Apenas Salvar
            </Button>
            <Button onClick={handleRegenerate} disabled={isGenerating} className="gap-2">
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Gerar Novo Plano
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
