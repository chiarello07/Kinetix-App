import { useState, useEffect, useRef } from 'react'
import { Save, Edit2, Camera, Crown, CreditCard, User } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'
import { PaywallModal } from '@/components/PaywallModal'
import { cn } from '@/lib/utils'

export default function Profile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState<any>({
    name: '',
    current_weight_kg: '',
    height_cm: '',
    gender: '',
    age: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const [showPaywall, setShowPaywall] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    if (user) {
      setAvatarUrl(
        user.user_metadata?.avatar_url || `https://img.usecurling.com/ppl/large?seed=${user.id}`,
      )
      fetchProfile()
    }
  }, [user])

  const calculateAge = (dob: string) => {
    if (!dob) return ''
    const diff = Date.now() - new Date(dob).getTime()
    return Math.abs(new Date(diff).getUTCFullYear() - 1970)
  }

  const fetchProfile = async () => {
    const { data: nutData } = await supabase
      .from('nutrition_profiles')
      .select('*')
      .eq('user_id', user!.id)
      .single()
    const { data: profData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user!.id)
      .single()

    if (nutData) {
      setProfile(nutData)
      setFormData({
        name: profData?.name || user?.user_metadata?.full_name || '',
        current_weight_kg: nutData.current_weight_kg,
        height_cm: nutData.height_cm,
        gender: nutData.gender,
        age: calculateAge(nutData.date_of_birth),
      })
    }

    if (profData?.subscription_id) {
      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('id', profData.subscription_id)
        .single()
      if (subData) setSubscription(subData)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setAvatarUrl(url)
      await supabase.auth.updateUser({ data: { avatar_url: url } })
      await supabase.from('profiles').update({ avatar_url: url }).eq('id', user!.id)
      toast({ title: 'Foto atualizada', description: 'Sua foto de perfil foi atualizada.' })
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Update Auth and Profile Name
    await supabase.auth.updateUser({ data: { full_name: formData.name } })
    await supabase.from('profiles').update({ name: formData.name }).eq('id', user!.id)

    // Calculate approx DOB based on age if it was changed
    const currentAge = calculateAge(profile.date_of_birth)
    let newDob = profile.date_of_birth
    if (Number(formData.age) !== currentAge && formData.age) {
      const d = new Date()
      d.setFullYear(d.getFullYear() - Number(formData.age))
      newDob = d.toISOString().split('T')[0]
    }

    const { error } = await supabase
      .from('nutrition_profiles')
      .update({
        current_weight_kg: Number(formData.current_weight_kg),
        height_cm: Number(formData.height_cm),
        gender: formData.gender,
        date_of_birth: newDob,
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
      setProfile({
        ...profile,
        current_weight_kg: formData.current_weight_kg,
        height_cm: formData.height_cm,
        gender: formData.gender,
        date_of_birth: newDob,
      })
      setIsEditing(false)
      toast({ title: 'Sucesso', description: 'Perfil atualizado com sucesso' })
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
          <Button onClick={() => setIsEditing(true)} className="gap-2 shadow-sm">
            <Edit2 className="w-4 h-4" /> Editar Perfil
          </Button>
        )}
      </div>

      <Card className="border-none shadow-elevation bg-gradient-to-br from-card to-card/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500"></div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" /> Planos e Assinaturas
          </CardTitle>
          <CardDescription>Gerencie seu plano de acesso ao Kinetix.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-5 bg-secondary/30 rounded-xl border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className={cn(
                    'text-white border-0 font-bold',
                    subscription?.status === 'active'
                      ? 'bg-amber-500 hover:bg-amber-600'
                      : 'bg-muted-foreground',
                  )}
                >
                  {subscription ? `Premium ${subscription.billing_period}` : 'Plano Grátis'}
                </Badge>
                {subscription && (
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    {subscription.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground/90">
                {subscription?.status === 'active'
                  ? 'Acesso completo a todas as funcionalidades de inteligência artificial e treinos.'
                  : 'Faça upgrade para acessar treinos personalizados e análises avançadas com IA.'}
              </p>
              {subscription?.expires_at && subscription.status === 'active' && (
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                  <CreditCard className="w-3 h-3" /> Próxima renovação:{' '}
                  {new Date(subscription.expires_at).toLocaleDateString()}
                </p>
              )}
            </div>
            <Button
              className={cn(
                'shrink-0 shadow-sm',
                subscription?.status === 'active'
                  ? ''
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0',
              )}
              variant={subscription?.status === 'active' ? 'outline' : 'default'}
              onClick={() => setShowPaywall(true)}
            >
              {subscription?.status === 'active' ? 'Gerenciar Plano' : 'Fazer Upgrade'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-subtle bg-primary/5">
        <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar className="w-24 h-24 border-4 border-background shadow-sm transition-transform group-hover:scale-105">
              <AvatarImage src={avatarUrl || undefined} className="object-cover w-full h-full" />
              <AvatarFallback className="bg-muted">
                <User className="w-10 h-10 text-muted-foreground" />
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
            <h2 className="text-2xl font-bold">{formData.name || 'Atleta Kinetix'}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-elevation">
        <CardHeader>
          <CardTitle>Informações Essenciais</CardTitle>
          <CardDescription>
            <br />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              {isEditing ? (
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium">
                  {formData.name || 'Não informado'}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Idade</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium">
                  {formData.age || calculateAge(profile.date_of_birth)} anos
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Peso Atual (kg)</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.current_weight_kg || ''}
                  onChange={(e) => setFormData({ ...formData, current_weight_kg: e.target.value })}
                />
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium">
                  {profile.current_weight_kg} kg
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Altura (cm)</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.height_cm || ''}
                  onChange={(e) => setFormData({ ...formData, height_cm: e.target.value })}
                />
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium">
                  {profile.height_cm} cm
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Gênero</Label>
              {isEditing ? (
                <Select
                  value={formData.gender}
                  onValueChange={(v) => setFormData({ ...formData, gender: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-secondary/20 rounded-md font-medium capitalize">
                  {profile.gender}
                </div>
              )}
            </div>
          </div>

          {profile.onboarding_completed && profile.onboarding_completion_date && (
            <div className="mt-8 text-sm text-muted-foreground border-t pt-6 bg-secondary/10 p-4 rounded-lg">
              <h4 className="font-bold text-foreground mb-2">
                Termo de Consentimento Livre e Esclarecido (TCLE)
              </h4>
              <p>
                Você concordou com os termos da plataforma Kinetix: Análise Postural, Treinamento e
                Nutrição.
              </p>
              <p className="mt-2">
                <strong>Data de Aceitação:</strong>{' '}
                {new Date(profile.onboarding_completion_date).toLocaleDateString()}
              </p>
              <p className="text-xs mt-1">
                <br />
              </p>
            </div>
          )}
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-end gap-3 border-t pt-6 bg-background">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Save className="w-4 h-4" /> {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </CardFooter>
        )}
      </Card>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature="Acesso Premium"
        reason="upgrade"
      />
    </div>
  )
}
