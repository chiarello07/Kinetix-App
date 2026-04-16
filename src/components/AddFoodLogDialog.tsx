import { useState, useRef } from 'react'
import { Camera, Mic, Type, Loader2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { logFood } from '@/services/food-logger'
import { useAuth } from '@/hooks/use-auth'
import { format } from 'date-fns'

interface AddFoodLogDialogProps {
  planId: string
  onLogAdded?: () => void
  children?: React.ReactNode
}

export function AddFoodLogDialog({ planId, onLogAdded, children }: AddFoodLogDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { user } = useAuth()
  const { toast } = useToast()

  const handleLog = async (method: 'photo' | 'audio' | 'text', data: any) => {
    if (!planId || !user) {
      toast({
        title: 'Erro',
        description: 'Plano nutricional não encontrado.',
        variant: 'destructive',
      })
      return
    }

    setIsLogging(true)
    try {
      const res = await logFood({
        nutritionPlanId: planId,
        userId: user.id,
        logDate: format(new Date(), 'yyyy-MM-dd'),
        inputMethod: method,
        inputData: data,
      })

      if (res.warnings?.length) {
        res.warnings.forEach((w) =>
          toast({ title: 'Aviso de Meta', description: w, variant: 'destructive' }),
        )
      } else {
        toast({ title: 'Sucesso', description: 'Refeição registrada e macros atualizados!' })
      }

      if (onLogAdded) onLogAdded()
      setOpen(false)
      setTextInput('')
    } catch (err: any) {
      toast({
        title: 'Erro',
        description: err.message || 'Falha ao registrar.',
        variant: 'destructive',
      })
    } finally {
      setIsLogging(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleLog('photo', { photoUrl: 'mock-photo-url' })
    }
  }

  const handleAudioRecord = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      handleLog('audio', { audioUrl: 'mock-audio-url' })
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            size="icon"
            className="rounded-full shadow-lg h-14 w-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-transform active:scale-95"
          >
            <Plus className="w-7 h-7 text-white" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF1493] to-[#4B0082]">
            Registrar Refeição
          </DialogTitle>
          <DialogDescription>
            Escolha o método para a IA analisar sua refeição instantaneamente.
          </DialogDescription>
        </DialogHeader>

        {isLogging ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-fade-in">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
              PosturAI está analisando e calculando macros...
            </p>
          </div>
        ) : (
          <Tabs defaultValue="photo" className="w-full mt-2">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="photo">
                <Camera className="w-4 h-4 mr-2" /> Foto
              </TabsTrigger>
              <TabsTrigger value="audio">
                <Mic className="w-4 h-4 mr-2" /> Áudio
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="w-4 h-4 mr-2" /> Texto
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photo" className="space-y-4 animate-fade-in-up">
              <div
                className="border-2 border-dashed border-primary/30 rounded-2xl p-10 text-center bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <p className="font-semibold text-foreground">Tirar Foto ou Escolher Imagem</p>
                <p className="text-sm text-muted-foreground mt-1">A IA identificará os alimentos</p>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                />
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-4 text-center animate-fade-in-up">
              <div className="py-10 flex flex-col items-center justify-center border-2 border-transparent bg-muted/20 rounded-2xl">
                <Button
                  size="icon"
                  className={`w-24 h-24 rounded-full shadow-elevation transition-all duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110' : 'bg-gradient-to-r from-[#FF1493] to-[#4B0082] hover:opacity-90'}`}
                  onClick={handleAudioRecord}
                  disabled={isRecording}
                >
                  <Mic className="w-10 h-10 text-white" />
                </Button>
                <p className="mt-6 font-bold text-foreground">
                  {isRecording ? 'Gravando e Analisando...' : 'Toque para falar'}
                </p>
                <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">
                  "Comi 2 ovos mexidos, 1 pão integral e um café preto"
                </p>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4 animate-fade-in-up">
              <div className="space-y-3 bg-muted/20 p-4 rounded-2xl">
                <Label className="text-foreground">Descreva sua refeição</Label>
                <Textarea
                  placeholder="Ex: 150g de frango grelhado e 100g de arroz branco..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[120px] resize-none bg-background shadow-inner"
                />
                <Button
                  className="w-full h-12 text-md font-bold bg-gradient-to-r from-[#FF1493] to-[#4B0082] hover:opacity-90"
                  onClick={() => handleLog('text', { textInput })}
                  disabled={!textInput.trim()}
                >
                  Analisar e Calcular Macros
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
