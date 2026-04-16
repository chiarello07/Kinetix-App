import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'

export function ChoiceStep({ title, options, value, onChange, showImageUpload }: any) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">{title}</h2>
      <RadioGroup value={value} onValueChange={onChange} className="grid gap-3 mt-2">
        {options.map((opt: string) => (
          <Label
            key={opt}
            className={cn(
              'flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all',
              value === opt
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-muted hover:border-primary/30',
            )}
          >
            <RadioGroupItem value={opt} id={opt} className="hidden" />
            <div
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0',
                value === opt ? 'border-primary' : 'border-muted-foreground/30',
              )}
            >
              {value === opt && <div className="w-3 h-3 bg-primary rounded-full" />}
            </div>
            <span className="text-lg font-medium">{opt}</span>
          </Label>
        ))}
      </RadioGroup>

      {showImageUpload && (
        <div className="mt-4 p-5 border-2 border-dashed rounded-xl border-muted-foreground/30 flex flex-col items-center justify-center gap-3 bg-muted/5">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <div className="text-center">
            <p className="font-medium">Opcional: Enviar foto de referência</p>
            <p className="text-sm text-muted-foreground">Ajuda na avaliação visual</p>
          </div>
          <Input type="file" accept="image/*" className="max-w-[250px]" />
        </div>
      )}
    </div>
  )
}
