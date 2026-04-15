import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, AlertTriangle } from 'lucide-react'
import { calculateBMI, getBMICategory, getWeightGoalInfo } from '../utils'
import { OnboardingData } from '../types'

export function BiometricsStep({ data, updateData }: { data: OnboardingData; updateData: any }) {
  const bmi = calculateBMI(data.weight, data.height)
  const category = bmi ? getBMICategory(bmi) : null

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Suas medidas</h2>
        <p className="text-muted-foreground text-lg">
          Precisamos desses dados para calcular seu metabolismo base e IMC.
        </p>
      </div>

      <div className="grid gap-5 mt-2">
        <div className="grid gap-2">
          <Label htmlFor="height" className="text-base">
            Altura (cm)
          </Label>
          <Input
            id="height"
            type="number"
            min="100"
            max="250"
            placeholder="Ex: 175"
            className="h-14 text-lg"
            value={data.height}
            onChange={(e) => updateData({ height: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="weight" className="text-base">
            Peso (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            min="30"
            max="300"
            step="0.1"
            placeholder="Ex: 70.5"
            className="h-14 text-lg"
            value={data.weight}
            onChange={(e) => updateData({ weight: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="age" className="text-base">
            Idade
          </Label>
          <Input
            id="age"
            type="number"
            min="13"
            max="120"
            placeholder="Ex: 25"
            className="h-14 text-lg"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
          />
        </div>
      </div>

      {bmi && category && (
        <div
          className={`mt-2 p-5 rounded-xl flex items-center justify-between border ${category.bg}`}
        >
          <div>
            <p className="text-sm font-semibold opacity-70">Seu IMC Calculado</p>
            <p className={`text-xl font-bold mt-1 ${category.color}`}>{category.label}</p>
          </div>
          <p className={`text-3xl font-extrabold ${category.color}`}>{bmi.toFixed(1)}</p>
        </div>
      )}
    </div>
  )
}

export function TargetWeightStep({ data, updateData }: { data: OnboardingData; updateData: any }) {
  const info = getWeightGoalInfo(data.weight, data.targetWeight)

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Peso Desejado</h2>
        <p className="text-muted-foreground text-lg">Defina uma meta realista para o seu corpo.</p>
      </div>

      <div className="grid gap-2 mt-2">
        <Label htmlFor="targetWeight" className="text-base">
          Peso Alvo (kg)
        </Label>
        <Input
          id="targetWeight"
          type="number"
          min="30"
          max="300"
          step="0.1"
          placeholder="Ex: 65.0"
          className="h-14 text-lg"
          value={data.targetWeight}
          onChange={(e) => updateData({ targetWeight: e.target.value })}
        />
      </div>

      {info && (
        <div className="mt-4 space-y-4">
          <Alert className="bg-primary/5 border-primary/20">
            <Info className="w-5 h-5 text-primary" />
            <AlertTitle className="text-primary font-semibold text-base">
              Estimativa de Tempo
            </AlertTitle>
            <AlertDescription className="text-base mt-1">
              Para uma mudança de <strong>{info.diff}kg</strong>, estimamos cerca de{' '}
              <strong>{info.weeks} semanas</strong> (foco em ~0.5kg/semana para resultados seguros).
            </AlertDescription>
          </Alert>

          {info.warning && (
            <Alert variant="destructive" className="bg-destructive/10">
              <AlertTriangle className="w-5 h-5" />
              <AlertTitle className="font-semibold text-base">Atenção</AlertTitle>
              <AlertDescription className="text-base mt-1">
                Uma mudança superior a 20kg é uma jornada longa. Recomendamos acompanhamento médico
                contínuo em paralelo ao treino.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}
