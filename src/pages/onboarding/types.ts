export type OnboardingData = {
  gender: string
  goal: string
  motivation: string
  focusAreas: string[]
  experience: string
  activityLevel: string
  height: string
  age: string
  weight: string
  targetWeight: string
  healthIssues: string[]
  frequency: number
  trainingDays: string[]
  name: string
  tcleAccepted: boolean
}

export const INITIAL_DATA: OnboardingData = {
  gender: '',
  goal: '',
  motivation: '',
  focusAreas: [],
  experience: '',
  activityLevel: '',
  height: '',
  age: '',
  weight: '',
  targetWeight: '',
  healthIssues: [],
  frequency: 3,
  trainingDays: [],
  name: '',
  tcleAccepted: false,
}
