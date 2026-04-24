import { MetabolicStep } from './steps/MetabolicStep'
import { RoutineStep } from './steps/RoutineStep'
import { ClinicalStep } from './steps/ClinicalStep'
import { DietaryStep } from './steps/DietaryStep'
import { NutritionOnboardingData } from './types'

interface Props {
  step: number
  data: NutritionOnboardingData
  updateData: (updates: Partial<NutritionOnboardingData>) => void
}

export function StepForm({ step, data, updateData }: Props) {
  switch (step) {
    case 1:
      return <MetabolicStep data={data} updateData={updateData} />
    case 2:
      return <RoutineStep data={data} updateData={updateData} />
    case 3:
      return <ClinicalStep data={data} updateData={updateData} />
    case 4:
      return <DietaryStep data={data} updateData={updateData} />
    default:
      return null
  }
}
