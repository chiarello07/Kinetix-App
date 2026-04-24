import { Crown, Lock, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export function PaywallModal({ isOpen, onClose, feature, reason, onSelectPlan }: any) {
  const navigate = useNavigate()

  const plans = [
    {
      id: 'trimestral',
      name: 'Trimestral',
      price: 59.9,
      period: 'mês',
      priceAnnualized: 159.0,
      freeMonths: 0,
      savings: '16% de desconto',
      badge: null,
      recommended: false,
    },
    {
      id: 'semestral',
      name: 'Semestral',
      price: 49.9,
      period: 'mês',
      priceAnnualized: 249.0,
      freeMonths: 1,
      savings: '33% de desconto + 1 mês grátis',
      badge: '⭐ Popular',
      recommended: true,
    },
    {
      id: 'anual',
      name: 'Anual',
      price: 39.9,
      period: 'mês',
      priceAnnualized: 399.0,
      freeMonths: 2,
      savings: '40% de desconto + 2 meses grátis',
      badge: '🔥 Melhor Valor',
      recommended: false,
    },
  ]

  const handleSelectPlan = (billingPeriod: string) => {
    if (onSelectPlan) onSelectPlan(billingPeriod)
    navigate(`/checkout?plan=${billingPeriod}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-y-auto max-h-[90vh] border-none bg-transparent shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Desbloqueie o Potencial Completo</DialogTitle>
          <DialogDescription>Acesso ilimitado a análises, treinos e relatórios</DialogDescription>
        </DialogHeader>
        <div className="bg-gradient-to-br from-slate-900 to-purple-950 rounded-2xl shadow-2xl w-full p-6 sm:p-8 border border-purple-500/30 mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Crown className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Desbloqueie o Potencial Completo
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Acesso ilimitado a análises, treinos de 52 semanas e relatórios avançados
          </p>

          {feature && (
            <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg p-3 mb-8 flex items-center gap-2 max-w-md mx-auto">
              <Lock className="w-5 h-5 text-purple-400 shrink-0" />
              <span className="text-white font-semibold text-sm">{feature}</span>
            </div>
          )}

          {reason === 'trial_not_started' && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-4 mb-8 text-center max-w-md mx-auto">
              <p className="text-white font-bold text-lg">🎉 7 dias grátis para testar!</p>
              <p className="text-white/90 text-sm">Cancele quando quiser, sem compromisso</p>
            </div>
          )}

          {reason === 'trial_expired' && (
            <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-4 mb-8 text-center max-w-md mx-auto">
              <p className="text-white font-bold">⏰ Trial expirado</p>
              <p className="text-gray-300 text-sm">Assine agora e continue sua jornada</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'relative rounded-xl p-6 border-2 transition-all cursor-pointer flex flex-col h-full',
                  plan.recommended
                    ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/20 transform md:-translate-y-2'
                    : 'border-gray-600 bg-gray-800/50 hover:border-purple-400',
                )}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-2 text-center">{plan.name}</h3>

                <div className="mb-4 text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                  {plan.priceAnnualized && (
                    <p className="text-sm text-gray-400 mt-2">
                      ou R$ {plan.priceAnnualized.toFixed(2).replace('.', ',')} à vista
                    </p>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-end gap-3 mt-4">
                  {plan.freeMonths > 0 && (
                    <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-2.5 text-center">
                      <p className="text-green-400 font-bold text-sm">
                        + {plan.freeMonths} mês{plan.freeMonths > 1 ? 'es' : ''} grátis
                      </p>
                    </div>
                  )}

                  {plan.savings && (
                    <p className="text-sm text-amber-300 font-semibold text-center mb-2">
                      ✓ {plan.savings}
                    </p>
                  )}

                  <button
                    className={cn(
                      'w-full font-bold py-3 rounded-lg transition-all mt-auto',
                      plan.recommended
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white',
                    )}
                  >
                    Escolher Plano
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-xl p-6 mb-8 max-w-3xl mx-auto border border-white/10">
            <h3 className="text-white font-semibold flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Todos os planos incluem:
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300 max-w-2xl mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Análise postural ilimitada com IA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Treino periodizado de 52 semanas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Plano nutricional personalizado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Relatórios detalhados + trimestrais</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Suporte prioritário por email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Acesso antecipado a novidades</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400 mb-4">
              Pagamento seguro via Stripe • Cancele quando quiser
            </p>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Talvez Depois
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
