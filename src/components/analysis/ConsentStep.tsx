import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ShieldAlert, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

interface ConsentStepProps {
  onAccept: () => void
}

export function ConsentStep({ onAccept }: ConsentStepProps) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-up w-full max-w-lg mx-auto p-4">
      <Card className="w-full shadow-elevation border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-[#FF1493]" />
          </div>
          <CardTitle className="text-2xl font-bold">Privacidade & LGPD</CardTitle>
          <CardDescription className="text-base mt-2">
            Para realizar a análise postural, precisamos capturar fotos do seu corpo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Suas fotos serão processadas <strong>localmente no seu dispositivo</strong> sempre que
            possível. Apenas as coordenadas anatômicas (números) são enviadas aos nossos servidores
            para gerar o laudo.
          </p>
          <div className="bg-muted p-4 rounded-lg flex gap-3 items-start">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de solicitar
              a exclusão de todos os seus dados biométricos a qualquer momento em suas configurações
              de conta.
            </p>
          </div>
          <div className="flex items-start space-x-3 pt-4">
            <Checkbox
              id="consent"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="consent" className="text-sm font-medium leading-relaxed cursor-pointer">
              Eu concordo com a captura de imagens para fins de análise biomecânica e aceito os
              termos de privacidade.
            </Label>
          </div>
        </CardContent>
        <CardFooter className="pt-4 pb-6">
          <Button
            className="w-full bg-gradient-to-r from-[#FF1493] to-[#4B0082] hover:opacity-90 text-white font-semibold h-12 text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            disabled={!agreed}
            onClick={onAccept}
          >
            Começar Análise
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
