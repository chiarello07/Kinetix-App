import { Lock, Sparkles, Crown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PaywallModalProps {
  isOpen: boolean
  onClose: () => void
  feature: string
  reason: string
  daysRemaining?: number
  onSelectPlan?: (billingPeriod: 'monthly' | 'trimestral' | 'semestral' | 'anual') => void
}

export function PaywallModal({
  isOpen,
  onClose,
  feature,
  reason,
  daysRemaining,
  onSelectPlan,
}: PaywallModalProps) {
  const navigate = useNavigate()

  if (!isOpen) return null

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
    if (onSelectPlan) {
      onSelectPlan(billingPeriod as any)
    }
    navigate(`/checkout?plan=${billingPeriod}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl shadow-2xl max-w-5xl w-full p-6 md:p-8 border border-purple-500/30 my-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Desbloqueie o Potencial Completo
          </h2>
          <p className="text-gray-300">
            Acesso ilimitado a análises, treinos de 52 semanas e relatórios avançados
          </p>
        </div>

        <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg p-3 mb-6 flex items-center justify-center gap-2 max-w-md mx-auto">
          <Lock className="w-5 h-5 text-purple-400" />
          <span className="text-white font-semibold text-center">{feature}</span>
        </div>

        {reason === 'trial_not_started' && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-4 mb-6 text-center max-w-md mx-auto shadow-md">
            <p className="text-white font-bold text-lg">🎉 7 dias grátis para testar!</p>
            <p className="text-white/90 text-sm">Cancele quando quiser, sem compromisso</p>
            <button
              onClick={() => handleSelectPlan('semestral')}
              className="mt-3 bg-white text-orange-600 font-bold px-6 py-2 rounded-full hover:bg-orange-50 transition-colors w-full shadow-sm"
            >
              Iniciar Trial de 7 Dias
            </button>
          </div>
        )}

        {reason === 'trial_expired' && (
          <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-4 mb-6 text-center max-w-md mx-auto">
            <p className="text-white font-bold text-lg">⏰ Trial expirado</p>
            <p className="text-gray-300 text-sm">Assine agora e continue sua jornada</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl p-5 border-2 transition-all cursor-pointer flex flex-col h-full ${
                plan.recommended
                  ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/20 transform lg:-translate-y-2'
                  : 'border-gray-600 bg-gray-800/50 hover:border-purple-400'
              }`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-md">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-lg font-bold text-white mb-1 text-center mt-2">{plan.name}</h3>
              <div className="text-center mb-3 flex-1">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-white">R$ {plan.price.toFixed(2)}</span>
                  <span className="text-gray-400 text-sm">/{plan.period}</span>
                </div>
                {plan.priceAnnualized && (
                  <p className="text-xs text-gray-400 mt-1">
                    ou R$ {plan.priceAnnualized.toFixed(2)} à vista
                  </p>
                )}
              </div>

              {plan.freeMonths > 0 && (
                <div className="bg-green-500/20 border border-green-400/50 rounded p-1.5 mb-3 text-center">
                  <p className="text-green-300 font-bold text-xs">
                    + {plan.freeMonths} mês{plan.freeMonths > 1 ? 'es' : ''} grátis
                  </p>
                </div>
              )}

              {plan.savings && (
                <p className="text-xs text-amber-300 font-semibold mb-3 text-center">
                  ✓ {plan.savings}
                </p>
              )}

              <button
                className={`w-full font-bold py-2.5 rounded-lg transition-all mt-auto text-sm shadow-md ${
                  plan.recommended
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Escolher Plano
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-xl p-5 mb-6 max-w-3xl mx-auto border border-white/10">
          <h3 className="text-white font-semibold flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Todos os planos incluem:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-green-400 shrink-0">✓</span>
              <span>Análise postural ilimitada com IA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 shrink-0">✓</span>
              <span>Treino periodizado de 52 semanas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 shrink-0">✓</span>
              <span>Plano nutricional personalizado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 shrink-0">✓</span>
              <span>Relatórios detalhados + trimestrais</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 shrink-0">✓</span>
              <span>Suporte prioritário por email</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 shrink-0">✓</span>
              <span>Acesso antecipado a novidades</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-400 mb-3">
            Pagamento seguro via Stripe • Cancele quando quiser
          </p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-sm font-medium underline-offset-4 hover:underline"
          >
            Talvez Depois
          </button>
        </div>
      </div>
    </div>
  )
}
