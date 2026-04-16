import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function SettingsTab() {
  const [maintenance, setMaintenance] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('app_settings')
        .select('*')
        .eq('setting_key', 'maintenance_mode')
        .single()
      if (data && data.setting_value) {
        setMaintenance(data.setting_value.enabled)
      }
      setLoading(false)
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    const { error } = await supabase
      .from('app_settings')
      .update({ setting_value: { enabled: maintenance, message: 'Estamos em manutenção.' } })
      .eq('setting_key', 'maintenance_mode')

    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Sucesso', description: 'Configurações salvas.' })
    }
  }

  return (
    <div className="flex flex-col space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie as operações globais da plataforma.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operações</CardTitle>
          <CardDescription>Controle o estado da plataforma para todos os usuários.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Modo de Manutenção</Label>
              <p className="text-sm text-muted-foreground">
                Bloqueia o acesso de todos os usuários não-administradores à plataforma.
              </p>
            </div>
            <Switch checked={maintenance} onCheckedChange={setMaintenance} disabled={loading} />
          </div>

          <Button onClick={handleSave} disabled={loading}>
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
          <CardDescription>As chaves de API estão seguras no ambiente do servidor.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm flex justify-between border-b pb-2">
            <span className="font-semibold">Stripe:</span>
            <span className="text-green-500 font-medium">Conectado</span>
          </div>
          <div className="text-sm flex justify-between">
            <span className="font-semibold">OpenAI:</span>
            <span className="text-green-500 font-medium">Conectado</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
