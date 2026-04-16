export interface CriticalChange {
  type: string
  severity: 'critical' | 'moderate'
  message: string
  oldValue: any
  newValue: any
  affectsNutrition?: boolean
}

export function detectCriticalChanges(oldData: any, newData: any): CriticalChange[] {
  const changes: CriticalChange[] = []

  if (oldData.exercise_days_per_week !== newData.exercise_days_per_week) {
    changes.push({
      type: 'frequency',
      severity: 'critical',
      message: `Frequência de treino mudou de ${oldData.exercise_days_per_week}x para ${newData.exercise_days_per_week}x por semana`,
      oldValue: oldData.exercise_days_per_week,
      newValue: newData.exercise_days_per_week,
      affectsNutrition: true,
    })
  }

  if (oldData.fitness_level !== newData.fitness_level) {
    changes.push({
      type: 'level',
      severity: 'critical',
      message: `Nível de experiência mudou de ${oldData.fitness_level} para ${newData.fitness_level}`,
      oldValue: oldData.fitness_level,
      newValue: newData.fitness_level,
      affectsNutrition: true,
    })
  }

  if (oldData.primary_goal !== newData.primary_goal) {
    changes.push({
      type: 'nutritionObjective',
      severity: 'critical',
      message: `Objetivo nutricional mudou de '${oldData.primary_goal}' para '${newData.primary_goal}'`,
      oldValue: oldData.primary_goal,
      newValue: newData.primary_goal,
      affectsNutrition: true,
    })
  }

  const weightChange =
    Math.abs((oldData.current_weight_kg || 1) - newData.current_weight_kg) /
    (oldData.current_weight_kg || 1)
  if (weightChange > 0.05) {
    changes.push({
      type: 'biometrics',
      severity: 'moderate',
      message: `Peso mudou de ${oldData.current_weight_kg}kg para ${newData.current_weight_kg}kg`,
      oldValue: oldData.current_weight_kg,
      newValue: newData.current_weight_kg,
      affectsNutrition: true,
    })
  }

  return changes
}
