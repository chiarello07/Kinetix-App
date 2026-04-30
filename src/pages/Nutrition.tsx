import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Camera, Upload, CheckCircle2, Flame, Loader2, Apple } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'

export default function Nutrition() {
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImagePreview(URL.createObjectURL(file))
      analyzeFood()
    }
  }

  const analyzeFood = () => {
    setLoading(true)
    setAnalysisResult(null)
    // Mock AI Analysis for Calorimeter feature
    setTimeout(() => {
      setAnalysisResult({
        foods: ['Peito de Frango Grelhado', 'Arroz Integral', 'Brócolis'],
        calories: 450,
        protein: 45,
        carbs: 40,
        fat: 10,
        micros: ['Vitamina C', 'Ferro', 'Fibras'],
      })
      setLoading(false)
    }, 2500)
  }

  const handleRegisterMeal = async () => {
    if (!user || !analysisResult) return

    try {
      const today = new Date().toISOString().split('T')[0]
      const { data: existing } = await supabase
        .from('progress_metrics')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      if (existing) {
        await supabase
          .from('progress_metrics')
          .update({
            total_calories_consumed:
              (existing.total_calories_consumed || 0) + analysisResult.calories,
            total_protein_consumed:
              Number(existing.total_protein_consumed || 0) + analysisResult.protein,
            total_carbs_consumed: Number(existing.total_carbs_consumed || 0) + analysisResult.carbs,
            total_fat_consumed: Number(existing.total_fat_consumed || 0) + analysisResult.fat,
            meals_completed: (existing.meals_completed || 0) + 1,
          })
          .eq('id', existing.id)
      } else {
        await supabase.from('progress_metrics').insert({
          user_id: user.id,
          date: today,
          total_calories_consumed: analysisResult.calories,
          total_protein_consumed: analysisResult.protein,
          total_carbs_consumed: analysisResult.carbs,
          total_fat_consumed: analysisResult.fat,
          meals_completed: 1,
        })
      }

      toast({ title: 'Sucesso', description: 'Refeição registrada e adicionada ao seu progresso!' })
      navigate('/progress')
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message, variant: 'destructive' })
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-24 md:pb-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-sm">
          <Camera className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calorímetro IA</h1>
          <p className="text-muted-foreground">
            Registre suas refeições por foto e acompanhe seus macros.
          </p>
        </div>
      </div>

      <Card className="border-primary/20 shadow-lg bg-card overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-xl flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" /> Escanear Refeição
          </CardTitle>
          <CardDescription>
            Tire uma foto do seu prato para nossa Inteligência Artificial estimar as calorias e
            macronutrientes.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {!imagePreview ? (
            <div
              className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <p className="text-lg font-bold text-foreground">Toque para escanear seu prato</p>
              <p className="text-sm text-muted-foreground mt-2">
                A câmera será aberta automaticamente
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video max-h-[300px] bg-black">
                <img
                  src={imagePreview}
                  alt="Refeição"
                  className="w-full h-full object-cover opacity-80"
                />
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <p className="font-bold text-lg text-foreground animate-pulse drop-shadow-md">
                      Analisando imagem com IA...
                    </p>
                  </div>
                )}
              </div>

              {!loading && analysisResult && (
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border animate-fade-in-up space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full shrink-0 shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Análise Concluída</h3>
                      <p className="text-muted-foreground">Identificamos os seguintes alimentos:</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {analysisResult.foods.map((f: string) => (
                          <span
                            key={f}
                            className="px-3 py-1 bg-background rounded-full text-sm font-medium border shadow-sm flex items-center gap-1"
                          >
                            <Apple className="w-3 h-3 text-primary" /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 pt-4 border-t border-border">
                    <div className="bg-background p-3 rounded-xl border shadow-sm text-center">
                      <p className="text-xs text-muted-foreground font-bold uppercase">Calorias</p>
                      <p className="text-2xl font-black text-primary mt-1">
                        {analysisResult.calories}
                      </p>
                    </div>
                    <div className="bg-background p-3 rounded-xl border shadow-sm text-center">
                      <p className="text-xs text-muted-foreground font-bold uppercase">Prot</p>
                      <p className="text-xl font-bold text-foreground mt-1">
                        {analysisResult.protein}g
                      </p>
                    </div>
                    <div className="bg-background p-3 rounded-xl border shadow-sm text-center">
                      <p className="text-xs text-muted-foreground font-bold uppercase">Carb</p>
                      <p className="text-xl font-bold text-foreground mt-1">
                        {analysisResult.carbs}g
                      </p>
                    </div>
                    <div className="bg-background p-3 rounded-xl border shadow-sm text-center">
                      <p className="text-xs text-muted-foreground font-bold uppercase">Gord</p>
                      <p className="text-xl font-bold text-foreground mt-1">
                        {analysisResult.fat}g
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <Button
                      onClick={handleRegisterMeal}
                      className="w-full h-14 text-lg font-bold shadow-lg bg-primary-gradient text-white border-0 hover:shadow-primary/30 transition-all"
                    >
                      Registrar esta Refeição
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-12"
                    >
                      Tirar outra foto
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />
        </CardContent>
      </Card>
    </div>
  )
}
