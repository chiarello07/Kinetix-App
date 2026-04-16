import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const planId = searchParams.get('plan') || 'monthly'
  const mockSuccess = searchParams.get('mock_success')

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }

    const processMockCheckout = async () => {
      try {
        if (mockSuccess === 'true') {
          const billingPeriod = searchParams.get('billingPeriod') || 'monthly'

          let freeMonths = 0
          if (billingPeriod === 'semestral') freeMonths = 1
          if (billingPeriod === 'anual') freeMonths = 2

          let days = 30
          if (billingPeriod === 'trimestral') days = 90
          if (billingPeriod === 'semestral') days = 180 + 30
          if (billingPeriod === 'anual') days = 365 + 60

          const expiresAt = new Date()
          expiresAt.setDate(expiresAt.getDate() + days)

          const { data: sub, error: subError } = await supabase
            .from('subscriptions')
            .insert({
              user_id: user.id,
              plan_id: `premium_${billingPeriod}`,
              billing_period: billingPeriod,
              free_months_granted: freeMonths,
              expires_at: expiresAt.toISOString(),
              status: 'active',
            })
            .select()
            .single()

          if (subError && subError.code !== '23505') throw subError

          let subscriptionId = sub?.id

          if (subError?.code === '23505') {
            const { data: updatedSub } = await supabase
              .from('subscriptions')
              .update({
                plan_id: `premium_${billingPeriod}`,
                billing_period: billingPeriod,
                free_months_granted: freeMonths,
                expires_at: expiresAt.toISOString(),
                status: 'active',
              })
              .eq('user_id', user.id)
              .select()
              .single()

            subscriptionId = updatedSub?.id
          }

          await supabase
            .from('profiles')
            .update({
              is_premium: true,
              subscription_id: subscriptionId,
              trial_started_at: new Date().toISOString(),
            })
            .eq('id', user.id)

          setStatus('success')
        } else {
          setTimeout(() => {
            navigate(`/checkout?plan=${planId}&mock_success=true&billingPeriod=${planId}`)
          }, 1500)
        }
      } catch (err) {
        console.error(err)
        setStatus('error')
      }
    }

    processMockCheckout()
  }, [user, mockSuccess, planId, searchParams, navigate])

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 animate-fade-in">
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {status === 'loading' && 'Processando Pagamento'}
            {status === 'success' && 'Pagamento Aprovado!'}
            {status === 'error' && 'Erro no Pagamento'}
          </CardTitle>
          <CardDescription>
            {status === 'loading' && 'Aguarde enquanto preparamos seu ambiente premium...'}
            {status === 'success' && 'Bem-vindo ao PosturAI Premium!'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {status === 'loading' && <Loader2 className="w-16 h-16 animate-spin text-primary" />}
          {status === 'success' && (
            <>
              <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 animate-bounce" />
              <Button size="lg" className="w-full" onClick={() => navigate('/workouts')}>
                Acessar Meus Treinos
              </Button>
            </>
          )}
          {status === 'error' && (
            <>
              <XCircle className="w-20 h-20 text-destructive mb-6" />
              <p className="text-center text-muted-foreground mb-6">
                Ocorreu um erro ao processar sua assinatura. Por favor, tente novamente.
              </p>
              <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                Voltar
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
