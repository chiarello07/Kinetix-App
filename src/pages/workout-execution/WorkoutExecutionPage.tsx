import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

import { WarmupScreen } from './WarmupScreen'
import { ExerciseScreen } from './ExerciseScreen'
import { BorgScaleScreen } from './BorgScaleScreen'
import { WorkoutSummaryScreen } from './WorkoutSummaryScreen'

import {
  calculateCaloriesBurned,
  calculateCalorieBalance,
  getBalanceStatus,
  calculateMacroAdherence,
  generateNutritionRecommendation,
  getDailyNutritionSummary,
} from '@/services/workout-execution'

const mockExercises = [
  {
    exerciseId: 'ex-1',
    exerciseName: 'Agachamento Livre',
    imageUrl: 'https://img.usecurling.com/p/400/400?q=squat',
    executionTips: [
      'Mantenha o peito estufado e os joelhos alinhados com a ponta dos pés.',
      'Desça até quebrar o paralelo.',
    ],
    plannedSets: 3,
    plannedReps: 12,
    plannedRest: 45,
    plannedIntensity: '70% 1RM',
    suggestedWeight: 60,
  },
  {
    exerciseId: 'ex-2',
    exerciseName: 'Supino Reto',
    imageUrl: 'https://img.usecurling.com/p/400/400?q=bench%20press',
    executionTips: ['Mantenha as escápulas retraídas e pés firmes no chão.'],
    plannedSets: 3,
    plannedReps: 10,
    plannedRest: 45,
    plannedIntensity: '75% 1RM',
    suggestedWeight: 40,
  },
]

export default function WorkoutExecutionPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [screen, setScreen] = useState<'exercise' | 'borg' | 'summary'>('exercise')
  const [exercises] = useState(mockExercises)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<any[]>([])
  const [startTime] = useState(Date.now())
  const [summaryData, setSummaryData] = useState<any>(null)

  const handleExerciseComplete = (sets: any[]) => {
    setCompletedExercises((prev) => [...prev, { ...exercises[currentIndex], sets }])
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      setScreen('borg')
    }
  }

  const handleFinish = async (rpe: number) => {
    const totalTime = Math.max(Math.floor((Date.now() - startTime) / 1000), 2700) // Ensures at least realistic numbers for demo
    let volume = 0
    let weight = 0

    completedExercises.forEach((ex) => {
      ex.sets.forEach((s: any) => {
        volume += s.repsCompleted
        weight += s.repsCompleted * s.weightUsed
      })
    })

    const userWeight = 75 // mocked or from profile
    const burned = calculateCaloriesBurned(Math.ceil(totalTime / 60), userWeight, rpe)

    const nutrition = await getDailyNutritionSummary(user?.id || '')
    const calBalance = calculateCalorieBalance(burned, nutrition.caloriesConsumed)
    const adherence = calculateMacroAdherence(nutrition.macrosIntake, nutrition.macrosTarget)

    setSummaryData({
      totalTime,
      totalVolume: volume,
      totalWeight: weight,
      caloriesBurned: burned,
      borgRPE: rpe,
      message: 'Ótimo treino! Você completou 100% dos exercícios. Mantenha a consistência!',
      nutritionSummary: {
        caloriesConsumed: nutrition.caloriesConsumed,
        caloriesBalance: calBalance,
        balanceStatus: getBalanceStatus(calBalance),
        macrosAdherence: adherence,
        nutritionRecommendation: generateNutritionRecommendation(burned, adherence),
      },
      exercisesSummary: completedExercises.map((ex) => ({
        name: ex.exerciseName,
        sets: ex.sets.length,
        reps: ex.sets[0]?.repsCompleted || 0,
        weight: ex.sets[0]?.weightUsed || 0,
      })),
    })

    setScreen('summary')
  }

  const handleSaveAndExit = async () => {
    if (user && summaryData) {
      const { error } = await supabase.from('workout_sessions').insert({
        user_id: user.id,
        training_plan_id: 'plan-123',
        day_index: 1,
        workout_date: new Date().toISOString().split('T')[0],
        start_time: new Date(startTime).toISOString(),
        end_time: new Date().toISOString(),
        exercises_completed: completedExercises,
        total_time: summaryData.totalTime,
        total_rest_time: 0,
        total_session_time: summaryData.totalTime,
        total_volume: summaryData.totalVolume,
        total_weight: summaryData.totalWeight,
        calories_burned: summaryData.caloriesBurned,
        borg_rpe: summaryData.borgRPE,
        nutrition_integration: summaryData.nutritionSummary,
      })

      if (error) toast.error('Erro ao salvar', { description: error.message })
      else toast.success('Treino salvo com sucesso!')
    } else {
      toast.success('Treino concluído! (Modo Visitante)')
    }
    navigate('/')
  }

  return (
    <div className="min-h-[100dvh] bg-background">
      {screen === 'exercise' && (
        <ExerciseScreen
          exercise={exercises[currentIndex]}
          totalExercises={exercises.length}
          currentIndex={currentIndex}
          onComplete={handleExerciseComplete}
          onCancel={() => navigate('/')}
        />
      )}
      {screen === 'borg' && <BorgScaleScreen onComplete={handleFinish} />}
      {screen === 'summary' && (
        <WorkoutSummaryScreen summary={summaryData} onFinish={handleSaveAndExit} />
      )}
    </div>
  )
}
