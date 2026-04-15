import { OnboardingData } from './types'
import { BasicOptionsStep } from './steps/BasicOptionsStep'
import { BiometricsStep, TargetWeightStep } from './steps/BodySteps'
import { HealthStep, FrequencyStep, DaysStep } from './steps/ScheduleSteps'
import { PersonalStep } from './steps/PersonalStep'

interface Props {
  step: number
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
}

export function StepForm({ step, data, updateData }: Props) {
  switch (step) {
    case 1:
      return (
        <BasicOptionsStep
          title="Qual seu gênero?"
          type="radio"
          options={['Masculino', 'Feminino', 'Outro']}
          value={data.gender}
          onChange={(v) => updateData({ gender: v })}
        />
      )
    case 2:
      return (
        <BasicOptionsStep
          title="Qual seu objetivo principal?"
          type="radio"
          options={['Ganho de Massa', 'Perda de Gordura', 'Saúde Geral', 'Força']}
          value={data.goal}
          onChange={(v) => updateData({ goal: v })}
        />
      )
    case 3:
      return (
        <BasicOptionsStep
          title="O que te motiva?"
          type="radio"
          options={['Estética', 'Saúde', 'Confiança', 'Competição']}
          value={data.motivation}
          onChange={(v) => updateData({ motivation: v })}
        />
      )
    case 4:
      return (
        <BasicOptionsStep
          title="Quais suas áreas de foco?"
          type="checkbox"
          options={['Costas', 'Peito', 'Braços', 'Abdômen', 'Pernas', 'Glúteos']}
          values={data.focusAreas}
          onChange={(v) => updateData({ focusAreas: v })}
        />
      )
    case 5:
      return (
        <BasicOptionsStep
          title="Qual seu nível de experiência?"
          type="radio"
          options={['Nunca treinei', '< 6 meses', '6 meses - 1 ano', '1-3 anos', '3+ anos']}
          value={data.experience}
          onChange={(v) => updateData({ experience: v })}
        />
      )
    case 6:
      return (
        <BasicOptionsStep
          title="Qual seu nível de atividade diária?"
          type="radio"
          options={['Sedentário', 'Levemente Ativo', 'Moderadamente Ativo', 'Muito Ativo']}
          value={data.activityLevel}
          onChange={(v) => updateData({ activityLevel: v })}
        />
      )
    case 7:
      return <BiometricsStep data={data} updateData={updateData} />
    case 8:
      return <TargetWeightStep data={data} updateData={updateData} />
    case 9:
      return <HealthStep data={data} updateData={updateData} />
    case 10:
      return <FrequencyStep data={data} updateData={updateData} />
    case 11:
      return <DaysStep data={data} updateData={updateData} />
    case 12:
      return <PersonalStep data={data} updateData={updateData} />
    default:
      return null
  }
}
