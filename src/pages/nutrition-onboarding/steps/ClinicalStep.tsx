import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export function ClinicalStep({ data, updateData }: any) {
  const addMed = () =>
    updateData({
      medications: [
        ...data.medications,
        { id: Date.now().toString(), name: '', dosage: '', frequency: '' },
      ],
    })

  const removeMed = (id: string) =>
    updateData({ medications: data.medications.filter((m: any) => m.id !== id) })

  const updateMed = (id: string, field: string, value: string) =>
    updateData({
      medications: data.medications.map((m: any) => (m.id === id ? { ...m, [field]: value } : m)),
    })

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">Anamnese Clínica</h2>

      <div className="grid gap-4 bg-muted/30 p-5 rounded-xl border">
        <div>
          <Label className="text-lg">Saúde Intestinal</Label>
          <p className="text-sm text-muted-foreground">Como é o funcionamento do seu intestino?</p>
        </div>

        <div className="grid gap-2 mt-2">
          <Label>Frequência Intestinal</Label>
          <Input
            placeholder="Ex: 1x ao dia, a cada 2 dias"
            className="h-10"
            value={data.intestinalFunction}
            onChange={(e) => updateData({ intestinalFunction: e.target.value })}
          />
        </div>

        <div className="mt-4 px-2 pb-2">
          <Label className="mb-4 block">Escala de Bristol (Formato das fezes)</Label>
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span>Tipo 1 (Constipação)</span>
            <span>Tipo 4 (Ideal)</span>
            <span>Tipo 7 (Diarreia)</span>
          </div>
          <Slider
            value={[Number(data.bristolScale)]}
            min={1}
            max={7}
            step={1}
            onValueChange={([val]) => updateData({ bristolScale: val.toString() })}
            className="w-full"
          />
          <div className="text-center mt-4 font-semibold text-primary bg-background py-2 rounded-lg border">
            Tipo Selecionado: {data.bristolScale}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg">Medicamentos & Suplementos</Label>
          <Button type="button" variant="outline" size="sm" onClick={addMed}>
            <Plus className="w-4 h-4 mr-2" /> Adicionar
          </Button>
        </div>

        {data.medications.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Nenhum adicionado. Clique acima se fizer uso de algo.
          </p>
        ) : (
          <div className="grid gap-3">
            {data.medications.map((med: any) => (
              <div
                key={med.id}
                className="flex gap-2 items-start bg-background p-3 rounded-lg border"
              >
                <div className="grid gap-2 flex-1">
                  <Input
                    placeholder="Nome (Ex: Whey, Omeprazol)"
                    value={med.name}
                    onChange={(e) => updateMed(med.id, 'name', e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Dose (Ex: 30g, 20mg)"
                      className="flex-1"
                      value={med.dosage}
                      onChange={(e) => updateMed(med.id, 'dosage', e.target.value)}
                    />
                    <Input
                      placeholder="Frequência (Ex: Todo dia)"
                      className="flex-1"
                      value={med.frequency}
                      onChange={(e) => updateMed(med.id, 'frequency', e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => removeMed(med.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
