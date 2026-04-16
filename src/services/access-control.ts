import { supabase } from '@/lib/supabase/client'

export interface AccessControlResponse {
  allowed: boolean
  reason: string
  message: string
  dayIndex: number
  planName?: string
  billingPeriod?: string
  freeMonthsGranted?: number
  daysRemaining?: number
  expiresAt?: string
  action?: 'show_paywall' | 'show_trial_banner'
  cta?: string
}

export async function checkAccessControl(
  userId: string,
  dayIndex: number,
): Promise<AccessControlResponse> {
  if (!userId || !dayIndex || dayIndex < 1) {
    return { allowed: false, reason: 'invalid_input', message: 'Parâmetros inválidos', dayIndex }
  }

  try {
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single()

    if (!profile) {
      return {
        allowed: false,
        reason: 'profile_not_found',
        message: 'Perfil não encontrado',
        dayIndex,
      }
    }

    const isPremium = profile.is_premium || false
    const trialStartedAt = profile.trial_started_at
    const subscriptionId = profile.subscription_id

    if (isPremium && subscriptionId) {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('id', subscriptionId)
        .single()

      if (subscription) {
        const expiresAt = new Date(subscription.expires_at)
        const now = new Date()

        if (now > expiresAt) {
          await supabase.from('profiles').update({ is_premium: false }).eq('id', userId)
          return {
            allowed: false,
            reason: 'premium_expired',
            message: 'Assinatura expirou. Renove para continuar.',
            dayIndex,
            action: 'show_paywall',
            cta: 'Renovar Assinatura',
          }
        }

        return {
          allowed: true,
          reason: 'premium',
          message: 'Acesso Premium ativo',
          dayIndex,
          planName: 'Premium',
          billingPeriod: subscription.billing_period,
          freeMonthsGranted: subscription.free_months_granted,
          expiresAt: expiresAt.toISOString(),
          daysRemaining: Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        }
      }
    }

    if (!trialStartedAt) {
      if (dayIndex === 1) {
        return {
          allowed: true,
          reason: 'free_preview',
          message: 'Preview grátis (D1 apenas)',
          dayIndex,
          planName: 'Free',
          action: 'show_trial_banner',
          cta: 'Iniciar Trial Grátis',
        }
      } else {
        return {
          allowed: false,
          reason: 'trial_not_started',
          message: 'Inicie o trial para desbloquear',
          dayIndex,
          action: 'show_paywall',
          cta: 'Iniciar Trial Grátis',
        }
      }
    }

    const startDate = new Date(trialStartedAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 7) {
      if (dayIndex <= 7) {
        return {
          allowed: true,
          reason: 'trial_active',
          message: `Trial ativo (${Math.max(0, 7 - diffDays + 1)} dias restantes)`,
          daysRemaining: Math.max(0, 7 - diffDays + 1),
          dayIndex,
          planName: 'Trial',
          expiresAt: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        }
      } else {
        return {
          allowed: false,
          reason: 'trial_active_limited',
          message: 'Disponível após assinatura Premium',
          daysRemaining: Math.max(0, 7 - diffDays + 1),
          dayIndex,
          action: 'show_paywall',
          cta: 'Assinar Premium',
        }
      }
    }

    if (diffDays > 7) {
      if (dayIndex <= 7) {
        return {
          allowed: true,
          reason: 'trial_expired_legacy_access',
          message: 'Acesso aos treinos do período de avaliação',
          dayIndex,
          planName: 'Trial Expirado',
          expiresAt: startDate.toISOString(),
        }
      } else {
        return {
          allowed: false,
          reason: 'trial_expired',
          message: 'Trial expirado. Assine para continuar.',
          dayIndex,
          action: 'show_paywall',
          cta: 'Assinar Premium',
        }
      }
    }

    return { allowed: false, reason: 'unknown', message: 'Erro desconhecido', dayIndex }
  } catch (error) {
    return { allowed: false, reason: 'error', message: 'Erro ao verificar acesso', dayIndex }
  }
}

export async function startTrial(userId: string) {
  await supabase
    .from('profiles')
    .update({ trial_started_at: new Date().toISOString() })
    .eq('id', userId)
}
