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
            <DialogContent className="sm:max-w-[700px] w-[95vw] h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-xl">Termo de Consentimento (TCLE)</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-full w-full rounded-md border p-5 text-sm text-muted-foreground leading-relaxed">
                <h4 className="text-foreground font-bold mb-4 text-base text-center">
                  CRN SOLUÇÕES TECNOLÓGICAS LTDA
                  <br />
                  TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO (TCLE)
                  <br />
                  Plataforma Kinetix: Análise Postural, Treinamento e Nutrição
                  <br />
                  23 de abril de 2026
                </h4>

                <p className="mb-2 text-foreground font-bold">
                  1. Introdução e Identificação das Partes
                </p>
                <p className="mb-4">
                  O aplicativo Kinetix é uma ferramenta digital desenvolvida pela CRN SOLUÇÕES
                  TECNOLÓGICAS LTDA, com endereço na Avenida Brigadeiro Faria Lima, 1811 - ESC 1119,
                  Jardim Paulistano, São Paulo/SP, CEP: 01452-001, inscrita no CNPJ sob o nº
                  56.349.443/0001-47, doravante denominada Desenvolvedor. O Kinetix consiste em um
                  ecossistema de saúde integral destinado a auxiliar usuários na análise corporal
                  com IA, geração de treinos personalizados e planos nutricionais customizados,
                  utilizando algoritmos avançados baseados em evidências científicas.
                </p>
                <p className="mb-4">
                  O usuário, doravante denominado Usuário, declara ter capacidade civil plena, sendo
                  obrigatoriamente maior de 18 anos para aceitar os termos aqui expostos. O uso do
                  Kinetix é estritamente proibido para menores de 18 anos, visando a proteção legal
                  e a segurança de indivíduos em fase de desenvolvimento biológico. Ao instalar,
                  registrar-se ou utilizar o Kinetix, o Usuário manifesta ciência e concordância
                  irrestrita com os termos deste documento, que constitui um contrato de adesão nos
                  termos do art. 54 do Código de Defesa do Consumidor.
                </p>

                <p className="mb-2 text-foreground font-bold">2. Natureza do Serviço</p>
                <p className="mb-4">
                  O Kinetix oferece três funcionalidades principais, limitadas a fins de auxílio
                  educacional e motivacional, sem caráter diagnóstico, terapêutico ou prescritivo
                  médico:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li className="mb-2">
                    <strong>Análise Corporal com IA:</strong> O aplicativo utiliza algoritmos de
                    visão computacional para analisar 33 pontos-chave do corpo através da câmera do
                    dispositivo, identificando potenciais desvios posturais. Esta análise é
                    informativa e pode variar conforme a qualidade da imagem e iluminação.
                  </li>
                  <li className="mb-2">
                    <strong>Treinos Personalizados:</strong> Com base na análise corporal, objetivos
                    e nível de atividade, o sistema gera rotinas de exercícios fundamentadas em
                    diretrizes do ACSM e Kendall. São recomendações automatizadas que não substituem
                    o acompanhamento presencial de um profissional de Educação Física.
                  </li>
                  <li className="mb-2">
                    <strong>Planos Nutricionais Customizados:</strong> Através de anamnese digital,
                    o app calcula necessidades calóricas e macronutrientes, sugerindo cardápios e
                    rastreamento alimentar. Tais sugestões são baseadas em modelos matemáticos
                    gerais e não constituem prescrição dietética clínica individualizada.
                  </li>
                </ul>
                <p className="mb-4">
                  <strong>AVISOS CRÍTICOS DE SAÚDE:</strong> Estes serviços NÃO substituem consulta
                  com médicos, nutricionistas ou profissionais registrados no CONFEF/CREF. São
                  recomendações educacionais apenas.
                </p>

                <p className="mb-2 text-foreground font-bold">3. Conformidade com a LGPD</p>
                <p className="mb-4">
                  O Desenvolvedor está comprometido com a Lei Geral de Proteção de Dados Pessoais
                  (Lei nº 13.709/2018). O tratamento de dados no Kinetix abrange:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li className="mb-2">
                    <strong>Dados Coletados:</strong> Peso, altura, idade, histórico de lesões,
                    preferências alimentares, alergias e restrições. Estes são considerados dados
                    sensíveis de saúde (Art. 11 LGPD).
                  </li>
                  <li className="mb-2">
                    <strong>Processamento de Imagens:</strong> As fotos posturais são processadas
                    para extração de coordenadas biométricas. O Usuário declara ciência de que, para
                    fins de processamento avançado, os dados podem ser transmitidos via API para
                    parceiros tecnológicos (como OpenAI), sob rigorosos protocolos de criptografia e
                    anonimização.
                  </li>
                  <li className="mb-2">
                    <strong>Direitos do Titular:</strong> O Usuário possui direito de acesso,
                    retificação, exclusão e revogação do consentimento a qualquer momento através do
                    e-mail: dpo@posturai.com.br.
                  </li>
                </ul>

                <p className="mb-2 text-foreground font-bold">
                  4. Advertências Gerais sobre Exercício Físico e Nutrição
                </p>
                <p className="mb-4">
                  O Usuário é expressamente advertido sobre os seguintes riscos:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li className="mb-2">
                    <strong>Consulta Médica e Nutricional:</strong> É obrigatória a consulta com
                    profissionais de saúde antes de iniciar qualquer programa de exercícios ou
                    alteração dietética, especialmente para indivíduos com doenças crônicas, lesões
                    prévias, idosos ou sedentários extremos.
                  </li>
                  <li className="mb-2">
                    <strong>Restrições Específicas:</strong> Grávidas, lactantes e indivíduos com
                    distúrbios alimentares diagnosticados não devem utilizar as funcionalidades de
                    nutrição sem supervisão médica direta.
                  </li>
                  <li className="mb-2">
                    <strong>Interações e Alergias:</strong> O Usuário é o único responsável por
                    informar corretamente suas alergias e uso de medicamentos. O Kinetix não se
                    responsabiliza por reações alérgicas ou interações medicamentosas decorrentes da
                    omissão de dados pelo Usuário.
                  </li>
                </ul>

                <p className="mb-2 text-foreground font-bold">
                  5. Limitações e Exclusão de Responsabilidade
                </p>
                <p className="mb-4">O Desenvolvedor isenta-se de responsabilidade por:</p>
                <ul className="list-disc pl-5 mb-4">
                  <li className="mb-2">
                    <strong>Danos Físicos ou Metabólicos:</strong> Lesões decorrentes da execução de
                    treinos ou problemas de saúde derivados da adoção dos planos nutricionais.
                  </li>
                  <li className="mb-2">
                    <strong>Inexatidão de Dados:</strong> Resultados baseados em informações
                    incorretas fornecidas pelo Usuário sobre peso, altura, lesões ou alergias.
                  </li>
                  <li className="mb-2">
                    <strong>Uso por Menores:</strong> Danos decorrentes do uso indevido da
                    plataforma por menores de 18 anos em violação a este termo.
                  </li>
                </ul>
                <p className="mb-4">
                  O Usuário renuncia a qualquer ação indenizatória contra o Desenvolvedor, exceto em
                  casos de dolo comprovado judicialmente, conforme art. 51, I, do CDC.
                </p>

                <p className="mb-2 text-foreground font-bold">6. Responsabilidades do Usuário</p>
                <p className="mb-4">
                  Compete exclusivamente ao Usuário:
                  <br />
                  1. Fornecer dados nutricionais e de saúde (alergias, lesões, medicamentos) 100%
                  precisos.
                  <br />
                  2. Interromper o uso imediatamente em caso de dor, tontura ou mal-estar.
                  <br />
                  3. Garantir que o ambiente para exercícios seja seguro e livre de obstáculos.
                  <br />
                  4. Manter a confidencialidade de suas credenciais de acesso.
                </p>

                <p className="mb-2 text-foreground font-bold">7. Expectativas de Resultados</p>
                <p className="mb-4">
                  Os resultados de correção postural, perda ou ganho de peso e performance física
                  variam individualmente. O Kinetix não garante resultados imediatos ou
                  "milagrosos". O progresso depende de fatores genéticos, consistência na adesão e
                  hábitos de vida externos à plataforma. Estudos em cinesiologia e nutrição reforçam
                  que mudanças sustentáveis demandam tempo e podem exigir ajustes por profissionais
                  presenciais.
                </p>

                <p className="mb-2 text-foreground font-bold">8. Aceitação e Consentimento</p>
                <p className="mb-4">
                  Ao prosseguir, o Usuário manifesta seu consentimento livre e esclarecido (Art. 7º,
                  I e Art. 11, I da LGPD) através das seguintes confirmações:
                  <br />
                  [x] Confirmo ter 18 anos ou mais e compreendo que o uso por menores é proibido.
                  <br />
                  [x] Li e concordo integralmente com este TCLE e os Termos de Uso.
                  <br />
                  [x] Consinto com a coleta e tratamento de meus dados de saúde (peso, lesões,
                  alergias).
                  <br />
                  [x] Consinto com o processamento de minhas imagens posturais, inclusive por
                  parceiros tecnológicos (OpenAI).
                  <br />
                  [x] Compreendo que as sugestões de treino e dieta não substituem profissionais de
                  saúde.
                </p>

                <p className="mb-2 text-foreground font-bold">9. Foro</p>
                <p className="mb-4">
                  Para dirimir controvérsias decorrentes deste termo, as partes elegem o foro da
                  Comarca de São Paulo/SP, com renúncia a qualquer outro, nos termos do art. 63 do
                  Código de Processo Civil.
                </p>

                <p className="text-center font-bold mt-8">DOCUMENTO CONFIDENCIAL - KINETIX</p>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
