import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { OnboardingData } from '../types'

export function PersonalStep({ data, updateData }: { data: OnboardingData; updateData: any }) {
  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-foreground">Último Passo!</h2>

      <div className="grid gap-3 mt-2">
        <Label htmlFor="name" className="text-base">
          Seu Nome Completo
        </Label>
        <Input
          id="name"
          placeholder="Ex: João da Silva"
          className="h-14 text-lg"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
        />
      </div>

      <div className="mt-6 flex items-start gap-4 p-5 border-2 rounded-xl bg-muted/10">
        <Checkbox
          id="tcle"
          checked={data.tcleAccepted}
          onCheckedChange={(c) => updateData({ tcleAccepted: !!c })}
          className="mt-1 w-6 h-6 rounded data-[state=checked]:bg-primary"
        />
        <div className="grid gap-2 leading-tight">
          <Label htmlFor="tcle" className="text-lg font-medium cursor-pointer">
            Eu li e aceito os Termos de Consentimento para o uso do App
          </Label>
          <Dialog>
            <DialogTrigger className="text-sm text-primary underline text-left w-fit hover:text-primary-indigo transition-colors">
              Ler Termo de Consentimento Livre e Esclarecido (TCLE)
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Termo de Consentimento (TCLE)</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[400px] w-full rounded-md border p-5 text-sm text-muted-foreground leading-relaxed">
                <p className="mb-4 text-foreground font-medium">
                  1. Consentimento para Atividades Físicas
                </p>
                <p className="mb-6">
                  Pelo presente instrumento, declaro estar ciente de que as atividades físicas
                  prescritas neste aplicativo possuem riscos inerentes à prática esportiva. Atesto
                  que estou apto(a) a realizar exercícios físicos e comprometo-me a respeitar os
                  limites do meu corpo.
                </p>
                <p className="mb-4 text-foreground font-medium">
                  2. Privacidade e Lei Geral de Proteção de Dados (LGPD)
                </p>
                <p className="mb-6">
                  Minhas informações de saúde, biometria e restrições serão tratadas com
                  confidencialidade, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                  Autorizo o uso dos meus dados de saúde (idade, peso, altura, histórico de lesões)
                  exclusivamente para a geração do meu plano de treinamento personalizado.
                </p>
                <p className="mb-4 text-foreground font-medium">3. Auditoria e Segurança</p>
                <p>
                  Estou ciente de que o aplicativo registrará meu aceite digital, incluindo carimbo
                  de tempo, versão do termo, endereço de IP e detalhes do dispositivo (User-Agent)
                  como parte da trilha de auditoria para fins de segurança e proteção legal.
                </p>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
