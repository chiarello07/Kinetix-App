import { NutritionOnboardingData } from './types'
import { ChoiceStep } from './steps/ChoiceStep'
import { PersonalDataStep, WeightHistoryStep } from './steps/BasicSteps'
import { SleepStep, ExerciseStep, WorkStep } from './steps/LifestyleSteps'
import { ClinicalStep } from './steps/ClinicalStep'
import { HabitsStep, PreferencesStep } from './steps/DietSteps'

interface Props {
  step: number
  data: NutritionOnboardingData
  updateData: (updates: Partial<NutritionOnboardingData>) => void
}

export function StepForm({ step, data, updateData }: Props) {
  switch (step) {
    case 1:
      return <PersonalDataStep data={data} updateData={updateData} />
    case 2:
      return (
        <ChoiceStep
          title="Qual seu objetivo principal?"
          options={['Ganho de Massa', 'Perda de Gordura', 'Definição', 'Saúde', 'Longevidade']}
          value={data.goal}
          onChange={(v: string) => updateData({ goal: v })}
        />
      )
    case 3:
      return (
        <ChoiceStep
          title="Qual seu biotipo corporal?"
          options={[
            'Ectomorfo (Magro, dificuldade de ganho)',
            'Mesomorfo (Atlético, facilidade de ganho)',
            'Endomorfo (Largo, facilidade de acúmulo)',
          ]}
          value={data.bodyType}
          onChange={(v: string) => updateData({ bodyType: v })}
          showImageUpload={true}
        />
      )
    case 4:
      return <WeightHistoryStep data={data} updateData={updateData} />
    case 5:
      return <SleepStep data={data} updateData={updateData} />
    case 6:
      return (
        <ChoiceStep
          title="Qual seu nível de atividade física?"
          options={[
            'Sedentário',
            'Levemente Ativo',
            'Moderadamente Ativo',
            'Muito Ativo',
            'Atleta',
          ]}
          value={data.fitnessLevel}
          onChange={(v: string) => updateData({ fitnessLevel: v })}
        />
      )
    case 7:
      return <ExerciseStep data={data} updateData={updateData} />
    case 8:
      return <WorkStep data={data} updateData={updateData} />
    case 9:
      return <ClinicalStep data={data} updateData={updateData} />
    case 10:
      return <HabitsStep data={data} updateData={updateData} />
    case 11:
      return <PreferencesStep data={data} updateData={updateData} />
    default:
      return null
  }
}
