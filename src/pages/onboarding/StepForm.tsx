import { BasicOptionsStep } from './steps/BasicOptionsStep'
import { HealthStep, FrequencyStep, DaysStep } from './steps/ScheduleSteps'
import { BiometricsStep, TargetWeightStep } from './steps/BodySteps'
import { PersonalStep } from './steps/PersonalStep'
import { OnboardingData } from './types'

export function StepForm({
  step,
  data,
  updateData,
}: {
  step: number
  data: OnboardingData
  updateData: any
}) {
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
          options={['Emagrecimento', 'Hipertrofia', 'Saúde Geral', 'Força']}
          value={data.goal}
          onChange={(v) => updateData({ goal: v })}
        />
      )
    case 3:
      return (
        <BasicOptionsStep
          title="O que mais te motiva?"
          type="radio"
          options={['Estética', 'Saúde', 'Condicionamento', 'Qualidade de Vida', 'Competição']}
          value={data.motivation}
          onChange={(v) => updateData({ motivation: v })}
        />
      )
    case 4:
      return (
        <BasicOptionsStep
          title="Quais suas áreas de foco?"
          type="checkbox"
          options={['Costas', 'Peito', 'Braços', 'Abdômen', 'Pernas', 'Glúteos', 'Tudo']}
          values={data.focusAreas}
          onChange={(v: string[]) => {
            if (v.includes('Tudo') && !data.focusAreas.includes('Tudo')) {
              updateData({ focusAreas: ['Tudo'] })
            } else if (v.includes('Tudo')) {
              updateData({ focusAreas: v.filter((i) => i !== 'Tudo') })
            } else {
              updateData({ focusAreas: v })
            }
          }}
        />
      )
    case 5:
      return (
        <BasicOptionsStep
          title="Qual seu nível de experiência?"
          type="radio"
          options={[
            'Iniciante (Pouca ou nenhuma experiência)',
            'Intermediário (Treino há 6+ meses)',
            'Avançado (Treino há 3+ anos)',
          ]}
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
