import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  type: 'radio' | 'checkbox'
  options: string[]
  value?: string
  values?: string[]
  onChange: (v: any) => void
}

export function BasicOptionsStep({ title, type, options, value, values, onChange }: Props) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">{title}</h2>

      {type === 'radio' ? (
        <RadioGroup value={value} onValueChange={onChange} className="grid gap-3 mt-2">
          {options.map((opt) => (
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
      ) : (
        <div className="grid gap-3 mt-2">
          {options.map((opt) => {
            const isChecked = values?.includes(opt)
            const isDisabled = !isChecked && values?.includes('Tudo') && opt !== 'Tudo'
            return (
              <Label
                key={opt}
                className={cn(
                  'flex items-center gap-4 p-5 rounded-xl border-2 transition-all',
                  isChecked
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-muted hover:border-primary/30',
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                )}
              >
                <Checkbox
                  checked={isChecked}
                  disabled={isDisabled}
                  onCheckedChange={(c) => {
                    if (c) onChange([...(values || []), opt])
                    else onChange((values || []).filter((v: string) => v !== opt))
                  }}
                  className="hidden"
                />
                <div
                  className={cn(
                    'w-6 h-6 rounded border-2 flex items-center justify-center shrink-0',
                    isChecked ? 'border-primary bg-primary' : 'border-muted-foreground/30',
                  )}
                >
                  {isChecked && <div className="w-3 h-3 bg-white rounded-sm" />}
                </div>
                <span className="text-lg font-medium">{opt}</span>
              </Label>
            )
          })}
        </div>
      )}
    </div>
  )
}
