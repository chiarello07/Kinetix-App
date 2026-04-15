import { Save, LogOut } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
import useMainStore from '@/stores/useMainStore'

export default function Profile() {
  const store = useMainStore()
  const { toast } = useToast()

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({ title: 'Perfil atualizado', description: 'Suas metas foram salvas com sucesso.' })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meu Perfil</h1>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-6">
        <Card className="border-none shadow-subtle bg-primary/5">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
              <AvatarImage src="https://img.usecurling.com/ppl/large?gender=male&seed=1" />
              <AvatarFallback>FL</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">João Silva</h2>
              <p className="text-sm text-muted-foreground">Membro desde Mar/2026</p>
            </div>
            <Button
              variant="outline"
              className="w-full mt-2 gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
            >
              <LogOut className="w-4 h-4" /> Sair
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-elevation">
          <CardHeader>
            <CardTitle>Configurações e Metas</CardTitle>
            <CardDescription>
              Ajuste suas necessidades diárias para melhores resultados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Objetivo Principal</Label>
                <Select defaultValue="cutting">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cutting">Cutting (Perda de Gordura)</SelectItem>
                    <SelectItem value="maintenance">Manutenção</SelectItem>
                    <SelectItem value="bulking">Bulking (Ganho de Massa)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Calorias (kcal)</Label>
                  <Input type="number" defaultValue={store.caloriesGoal} />
                </div>
                <div className="grid gap-2">
                  <Label>Peso Atual (kg)</Label>
                  <Input type="number" defaultValue={store.weight} step="0.1" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                <div className="grid gap-2">
                  <Label className="text-xs text-muted-foreground uppercase">Proteína (g)</Label>
                  <Input
                    type="number"
                    defaultValue={store.proteinGoal}
                    className="font-semibold text-secondary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    Carboidratos (g)
                  </Label>
                  <Input
                    type="number"
                    defaultValue={store.carbsGoal}
                    className="font-semibold text-accent"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs text-muted-foreground uppercase">Gorduras (g)</Label>
                  <Input
                    type="number"
                    defaultValue={store.fatGoal}
                    className="font-semibold text-purple-500"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full sm:w-auto self-end mt-2 gap-2">
                <Save className="w-4 h-4" /> Salvar Alterações
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
