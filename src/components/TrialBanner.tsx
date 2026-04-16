interface TrialBannerProps {
  daysRemaining: number
  onUpgrade: () => void
}

export function TrialBanner({ daysRemaining, onUpgrade }: TrialBannerProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-500/20">
      <div>
        <p className="font-bold text-lg">
          ⏰ Trial expira em {daysRemaining} dia{daysRemaining !== 1 ? 's' : ''}
        </p>
        <p className="text-sm text-blue-100">Assine Premium para continuar com acesso completo</p>
      </div>
      <button
        onClick={onUpgrade}
        className="bg-white text-blue-600 font-bold px-6 py-2.5 rounded-lg hover:bg-blue-50 hover:scale-105 transition-all shadow-md shrink-0 whitespace-nowrap"
      >
        Assinar Agora
      </button>
    </div>
  )
}
