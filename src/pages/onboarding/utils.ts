export function calculateBMI(weight: string, height: string) {
  const w = parseFloat(weight)
  const h = parseFloat(height) / 100
  if (!w || !h) return null
  return w / (h * h)
}

export function getBMICategory(bmi: number) {
  if (bmi < 18.5) return { label: 'Abaixo do Peso', color: 'text-blue-500', bg: 'bg-blue-500/10' }
  if (bmi < 25) return { label: 'Normal', color: 'text-green-500', bg: 'bg-green-500/10' }
  if (bmi < 30) return { label: 'Sobrepeso', color: 'text-yellow-500', bg: 'bg-yellow-500/10' }
  return { label: 'Obeso', color: 'text-red-500', bg: 'bg-red-500/10' }
}

export function getWeightGoalInfo(current: string, target: string) {
  const w = parseFloat(current)
  const t = parseFloat(target)
  if (!w || !t) return null
  const diff = Math.abs(w - t)
  const weeks = Math.round(diff / 0.5)
  const warning = diff > 20
  return { diff: diff.toFixed(1), weeks, warning }
}

export function canGoNext(step: number, data: any): boolean {
  switch (step) {
    case 1:
      return !!data.gender
    case 2:
      return !!data.goal
    case 3:
      return !!data.motivation
    case 4:
      return data.focusAreas.length > 0
    case 5:
      return !!data.experience
    case 6:
      return !!data.activityLevel
    case 7: {
      const h = Number(data.height)
      const a = Number(data.age)
      const w = Number(data.weight)
      return h >= 100 && h <= 250 && a >= 13 && a <= 120 && w >= 30 && w <= 300
    }
    case 8:
      return Number(data.targetWeight) >= 30 && Number(data.targetWeight) <= 300
    case 9:
      return data.healthIssues.length > 0
    case 10:
      return true
    case 11:
      return data.trainingDays.length === data.frequency
    case 12:
      return /^[a-zA-ZÀ-ÿ\s-]{3,100}$/.test(data.name) && data.tcleAccepted
    default:
      return true
  }
}
