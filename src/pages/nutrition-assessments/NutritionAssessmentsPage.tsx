import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONNAIRES, OPTIONS_MAP } from './data/questionnaires'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { CheckCircle2, BrainCircuit, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function NutritionAssessmentsPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Record<string, number>>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mockProfileId, setMockProfileId] = useState<string | null>(null)

  // Automatically attempt to fetch latest profile id or generate a mock one
  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('nutrition_profiles')
          .select('id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
        if (data) {
          setMockProfileId(data.id)
        }
      }
    }
    init()
  }, [])

  const currentQuestionnaire = QUESTIONNAIRES[currentStep]
  const currentAnswers = answers[currentQuestionnaire?.type] || {}

  const allAnswered = useMemo(() => {
    if (!currentQuestionnaire) return false
    return currentQuestionnaire.questions.every((q) => currentAnswers[q.id] !== undefined)
  }, [currentQuestionnaire, currentAnswers])

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionnaire.type]: {
        ...(prev[currentQuestionnaire.type] || {}),
        [questionId]: value,
      },
    }))
  }

  const handleNext = async () => {
    if (!allAnswered) {
      toast.error('Responda todas as perguntas para avançar.')
      return
    }

    if (currentStep < QUESTIONNAIRES.length - 1) {
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      await handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      let profileId = mockProfileId
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!profileId && user) {
        // Create an empty profile to attach the assessments to if none exists
        const { data: newProfile, error: profileErr } = await supabase
          .from('nutrition_profiles')
          .insert({
            user_id: user.id,
            gender: 'unknown',
            date_of_birth: new Date().toISOString(),
            height_cm: 0,
            current_weight_kg: 0,
            target_weight_kg: 0,
            primary_goal: 'health',
            fitness_level: 'sedentary',
            exercise_types: [],
          })
          .select()
          .single()

        if (!profileErr && newProfile) {
          profileId = newProfile.id
        }
      }

      if (profileId) {
        // Save each assessment
        for (const questionnaire of QUESTIONNAIRES) {
          const qAnswers = answers[questionnaire.type] || {}
          let totalScore = 0
          let maxScore = 0

          const responsesJson = questionnaire.questions.map((q) => {
            const score = qAnswers[q.id] || 0
            totalScore += score
            maxScore += 4 // Max score per question is typically 4
            return {
              question_id: q.id,
              question_text: q.text,
              question_category: q.category,
              answer_value: score.toString(),
              answer_score: score,
            }
          })

          const percentage = (totalScore / maxScore) * 100
          let interpretationLevel = 'moderate'
          if (percentage < 25) interpretationLevel = 'healthy'
          else if (percentage > 75) interpretationLevel = 'severe'

          await supabase.from('nutrition_assessments').insert({
            nutrition_profile_id: profileId,
            assessment_type: questionnaire.type,
            assessment_name: questionnaire.name,
            responses: responsesJson,
            total_score: totalScore,
            max_score: maxScore,
            score_percentage: percentage,
            interpretation: interpretationLevel,
            completed: true,
            completed_at: new Date().toISOString(),
          })
        }
      }

      setIsCompleted(true)
      toast.success('Avaliação concluída com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar avaliação. Tentando concluir localmente...')
      setIsCompleted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isCompleted) {
    return (
      <div className="max-w-[600px] mx-auto min-h-screen flex flex-col items-center justify-center px-5 py-6 bg-background animate-fade-in-up">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <BrainCircuit className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3 text-center">Análise Concluída!</h1>
        <p className="text-muted-foreground text-center mb-8 text-lg max-w-md">
          Seu perfil nutricional e metabólico foi mapeado detalhadamente.
        </p>
        <Button className="h-14 px-10 text-lg font-bold" onClick={() => navigate('/dashboard')}>
          Ir para o Dashboard
        </Button>
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="max-w-[600px] mx-auto min-h-screen flex flex-col items-center justify-center px-5 py-6 bg-background animate-fade-in gap-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-bold text-xl text-foreground">Processando Resultados...</p>
        <p className="text-muted-foreground text-center max-w-[300px]">
          Calculando scores metabólicos, frequência alimentar e fenótipo de comportamento.
        </p>
      </div>
    )
  }

  // Group questions by category
  const questionsByCategory = currentQuestionnaire?.questions.reduce(
    (acc, q) => {
      acc[q.category] = acc[q.category] || []
      acc[q.category].push(q)
      return acc
    },
    {} as Record<string, typeof currentQuestionnaire.questions>,
  )

  const options = OPTIONS_MAP[currentQuestionnaire.optionsType]

  return (
    <div className="max-w-[800px] mx-auto min-h-screen flex flex-col px-5 py-6 bg-background w-full">
      <div className="mb-6 sticky top-0 bg-background/95 backdrop-blur z-10 pt-4 pb-2 border-b">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="h-8 w-8 text-muted-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Anamnese Detalhada</h1>
          </div>
        </div>

        <div className="flex justify-between text-sm font-semibold mb-3 text-muted-foreground">
          <span>
            {currentQuestionnaire.name} (Questionário {currentStep + 1} de {QUESTIONNAIRES.length})
          </span>
          <span className="text-primary">
            {Math.round((currentStep / QUESTIONNAIRES.length) * 100)}%
          </span>
        </div>
        <Progress
          value={(currentStep / QUESTIONNAIRES.length) * 100}
          className="h-2 bg-primary/10"
        />
        <p className="text-sm text-muted-foreground mt-3">{currentQuestionnaire.description}</p>
      </div>

      <div className="flex-1 flex flex-col gap-8 pb-32 animate-fade-in">
        {Object.entries(questionsByCategory || {}).map(([category, questions]) => (
          <div key={category} className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              {category}
            </h2>

            <div className="flex flex-col gap-6">
              {questions.map((q) => (
                <Card
                  key={q.id}
                  className={cn(
                    'border transition-colors',
                    currentAnswers[q.id] !== undefined
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border/50 shadow-subtle',
                  )}
                >
                  <CardContent className="p-5 flex flex-col gap-4">
                    <p className="font-semibold text-base leading-snug">{q.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((opt: any) => {
                        const isSelected = currentAnswers[q.id] === opt.value
                        return (
                          <Button
                            key={opt.value}
                            variant={isSelected ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleAnswer(q.id, opt.value)}
                            className={cn(
                              'transition-all',
                              isSelected
                                ? 'shadow-md scale-105 bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-primary/5 hover:text-primary',
                            )}
                          >
                            {opt.label || opt.value}
                          </Button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t z-20">
        <div className="max-w-[800px] mx-auto flex gap-4">
          {currentStep > 0 && (
            <Button
              variant="outline"
              className="flex-1 h-14 text-lg font-semibold"
              onClick={handlePrev}
            >
              Voltar
            </Button>
          )}
          <Button
            className="flex-[2] h-14 text-lg font-bold bg-primary text-primary-foreground"
            onClick={handleNext}
            disabled={!allAnswered}
          >
            {currentStep === QUESTIONNAIRES.length - 1
              ? 'Finalizar Avaliação'
              : 'Próximo Questionário'}
          </Button>
        </div>
      </div>
    </div>
  )
}
