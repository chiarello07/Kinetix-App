import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.20.0'

Deno.serve(async (req: Request) => {
  try {
    const signature = req.headers.get('Stripe-Signature')
    const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

    if (!stripeSecret || !webhookSecret || !signature) {
      return new Response('Missing secrets or signature', { status: 400 })
    }

    const stripe = new Stripe(stripeSecret, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })
    const body = await req.text()

    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    if (
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.created'
    ) {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const status = subscription.status

      const billingPeriod = subscription.metadata.billing_period || 'monthly'
      const freeMonths = parseInt(subscription.metadata.free_months || '0')

      const startDate = new Date(subscription.current_period_start * 1000)
      const baseDays: Record<string, number> = {
        monthly: 30,
        trimestral: 90,
        semestral: 180,
        anual: 365,
      }
      const freeMonthsDays: Record<string, number> = {
        monthly: 0,
        trimestral: 0,
        semestral: 30,
        anual: 60,
      }

      const totalDays = (baseDays[billingPeriod] || 30) + (freeMonthsDays[billingPeriod] || 0)
      const expiresAt = new Date(startDate)
      expiresAt.setDate(expiresAt.getDate() + totalDays)

      const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (existingSub) {
        await supabase
          .from('subscriptions')
          .update({
            status: status,
            expires_at: expiresAt.toISOString(),
            billing_period: billingPeriod,
            free_months_granted: freeMonths,
          })
          .eq('stripe_customer_id', customerId)

        await supabase
          .from('profiles')
          .update({ is_premium: status === 'active' })
          .eq('id', existingSub.user_id)
      }
    } else if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (existingSub) {
        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
          .eq('stripe_customer_id', customerId)
        await supabase.from('profiles').update({ is_premium: false }).eq('id', existingSub.user_id)
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
