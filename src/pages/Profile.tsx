import { useState, useEffect } from 'react'
import { Save, Edit2, AlertCircle, RefreshCw, User as UserIcon } from 'lucide-react'
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

  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [criticalChanges, setCriticalChanges] = useState<CriticalChange[]>([])
  const [showModal, setShowModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('nutrition_profiles')
      .select('*')
      .eq('user_id', user!.id)
      .single()

    if (data) {
      setProfile(data)
      setFormData(data)
    }
  }

  const handleSave = async () => {
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
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-fade-in-up pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit2 className="w-4 h-4" /> Editar Perfil
          </Button>
        )}
      </div>

      <Card className="border-none shadow-subtle bg-primary/5">
        <CardContent className="p-6 flex items-center gap-6">
          <Avatar className="w-20 h-20 border-2 border-background shadow-sm">
            <AvatarImage src={`https://img.usecurling.com/ppl/large?seed=${user?.id}`} />
            <AvatarFallback>
              <UserIcon className="w-8 h-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user?.email?.split('@')[0] || 'Usuário'}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-elevation">
        <CardHeader>
          <CardTitle>Informações do Plano</CardTitle>
          <CardDescription>Seus dados biométricos, de treino e nutrição.</CardDescription>
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
            className="w-full sm:w-auto"
            onClick={() => (window.location.href = '/onboarding')}
          >
            Refazer Anamnese Treino
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => (window.location.href = '/nutrition-onboarding')}
          >
            Refazer Anamnese Nutrição
          </Button>
        </CardFooter>
        {isEditing && (
          <CardFooter className="flex justify-end gap-3 border-t pt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setFormData(profile)
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
