# Email & Payments — Resend + Stripe

---

## 1. Resend Setup

```bash
npm install resend @react-email/components @react-email/render
```

```env
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com
```

```typescript
// lib/resend.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
export const EMAIL_FROM = process.env.EMAIL_FROM ?? 'noreply@yourdomain.com'
```

---

## 2. Email Templates

### Welcome Email

```typescript
// emails/welcome.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  username: string
  dashboardUrl: string
}

export function WelcomeEmail({ username, dashboardUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to YourApp — you&apos;re all set!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://yourdomain.com/logo.png"
            width="40"
            height="40"
            alt="YourApp"
            style={logo}
          />
          <Heading style={heading}>Welcome, {username}!</Heading>
          <Text style={paragraph}>
            Thanks for signing up. Your account is ready and waiting for you.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={dashboardUrl}>
              Go to Dashboard
            </Button>
          </Section>
          <Text style={paragraph}>
            If you have any questions, reply to this email — we&apos;re always happy to help.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            YourApp · 123 Main St · San Francisco, CA 94105
            <br />
            <Link href="https://yourdomain.com/unsubscribe" style={footerLink}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '40px 20px', maxWidth: '560px', borderRadius: '8px' }
const logo = { margin: '0 auto 24px', display: 'block' }
const heading = { fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 16px' }
const paragraph = { fontSize: '15px', lineHeight: '24px', color: '#4b5563', margin: '0 0 20px' }
const btnContainer = { textAlign: 'center' as const, margin: '24px 0' }
const button = { backgroundColor: '#4f46e5', borderRadius: '8px', color: '#fff', fontSize: '15px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }
const hr = { borderColor: '#e5e7eb', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#9ca3af', textAlign: 'center' as const }
const footerLink = { color: '#9ca3af' }
```

### Password Reset Email

```typescript
// emails/password-reset.tsx
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Text,
} from '@react-email/components'

interface PasswordResetEmailProps {
  resetUrl: string
  expiresIn?: string
}

export function PasswordResetEmail({ resetUrl, expiresIn = '1 hour' }: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your YourApp password</Preview>
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: '#fff', margin: '0 auto', padding: '40px 20px', maxWidth: '560px', borderRadius: '8px' }}>
          <Heading style={{ fontSize: '22px', color: '#1a1a1a', marginBottom: '16px' }}>
            Reset your password
          </Heading>
          <Text style={{ fontSize: '15px', color: '#4b5563', marginBottom: '24px' }}>
            We received a request to reset your password. Click the button below to choose a new one.
            This link expires in {expiresIn}.
          </Text>
          <Button
            href={resetUrl}
            style={{ backgroundColor: '#4f46e5', borderRadius: '8px', color: '#fff', fontSize: '15px', fontWeight: '600', padding: '12px 24px', textDecoration: 'none' }}
          >
            Reset Password
          </Button>
          <Text style={{ fontSize: '14px', color: '#6b7280', marginTop: '24px' }}>
            If you didn&apos;t request this, you can safely ignore this email.
          </Text>
          <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />
          <Text style={{ fontSize: '12px', color: '#9ca3af' }}>
            Or copy and paste this URL into your browser: {resetUrl}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

### Invoice Email

```typescript
// emails/invoice.tsx
import {
  Body, Column, Container, Head, Heading, Hr, Html, Preview, Row, Section, Text,
} from '@react-email/components'

interface LineItem {
  description: string
  quantity: number
  unitPrice: number
}

interface InvoiceEmailProps {
  invoiceNumber: string
  customerName: string
  items: LineItem[]
  total: number
  dueDate: string
  currency?: string
}

export function InvoiceEmail({
  invoiceNumber,
  customerName,
  items,
  total,
  dueDate,
  currency = 'USD',
}: InvoiceEmailProps) {
  const fmt = (cents: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100)

  return (
    <Html>
      <Head />
      <Preview>Invoice {invoiceNumber} — {fmt(total)} due {dueDate}</Preview>
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: '#fff', margin: '0 auto', padding: '40px 20px', maxWidth: '600px', borderRadius: '8px' }}>
          <Row>
            <Column>
              <Heading style={{ fontSize: '22px', color: '#1a1a1a', margin: 0 }}>Invoice</Heading>
            </Column>
            <Column style={{ textAlign: 'right' }}>
              <Text style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>#{invoiceNumber}</Text>
            </Column>
          </Row>

          <Text style={{ fontSize: '15px', color: '#4b5563', margin: '16px 0' }}>
            Hi {customerName}, here&apos;s your invoice. Payment is due by {dueDate}.
          </Text>

          <Section style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
            <Row style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '8px' }}>
              <Column><Text style={{ fontWeight: '600', fontSize: '13px', color: '#374151', margin: 0 }}>Description</Text></Column>
              <Column style={{ textAlign: 'right' }}><Text style={{ fontWeight: '600', fontSize: '13px', color: '#374151', margin: 0 }}>Qty</Text></Column>
              <Column style={{ textAlign: 'right' }}><Text style={{ fontWeight: '600', fontSize: '13px', color: '#374151', margin: 0 }}>Amount</Text></Column>
            </Row>

            {items.map((item, i) => (
              <Row key={i} style={{ paddingBottom: '8px' }}>
                <Column><Text style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>{item.description}</Text></Column>
                <Column style={{ textAlign: 'right' }}><Text style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>{item.quantity}</Text></Column>
                <Column style={{ textAlign: 'right' }}><Text style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>{fmt(item.quantity * item.unitPrice)}</Text></Column>
              </Row>
            ))}

            <Hr style={{ borderColor: '#e5e7eb', margin: '8px 0' }} />
            <Row>
              <Column><Text style={{ fontWeight: '700', fontSize: '15px', margin: 0 }}>Total</Text></Column>
              <Column />
              <Column style={{ textAlign: 'right' }}><Text style={{ fontWeight: '700', fontSize: '15px', margin: 0 }}>{fmt(total)}</Text></Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
```

### Notification Email

```typescript
// emails/notification.tsx
import {
  Body, Container, Head, Html, Preview, Section, Text, Button,
} from '@react-email/components'

interface NotificationEmailProps {
  title: string
  message: string
  ctaLabel?: string
  ctaUrl?: string
  type?: 'info' | 'success' | 'warning'
}

const typeColors = {
  info: '#4f46e5',
  success: '#16a34a',
  warning: '#d97706',
}

export function NotificationEmail({
  title,
  message,
  ctaLabel,
  ctaUrl,
  type = 'info',
}: NotificationEmailProps) {
  const accentColor = typeColors[type]

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: '#fff', margin: '0 auto', padding: '40px 20px', maxWidth: '560px', borderRadius: '8px' }}>
          <Section style={{ borderLeft: `4px solid ${accentColor}`, paddingLeft: '16px', marginBottom: '24px' }}>
            <Text style={{ fontWeight: '700', fontSize: '18px', color: '#1a1a1a', margin: '0 0 8px' }}>{title}</Text>
            <Text style={{ fontSize: '15px', color: '#4b5563', margin: 0 }}>{message}</Text>
          </Section>

          {ctaLabel && ctaUrl && (
            <Button
              href={ctaUrl}
              style={{ backgroundColor: accentColor, borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: '600', padding: '10px 20px', textDecoration: 'none' }}
            >
              {ctaLabel}
            </Button>
          )}
        </Container>
      </Body>
    </Html>
  )
}
```

---

## 3. Email Sending via Server Action

```typescript
// app/actions/email.ts
'use server'

import { render } from '@react-email/render'
import { resend, EMAIL_FROM } from '@/lib/resend'
import { WelcomeEmail } from '@/emails/welcome'
import { PasswordResetEmail } from '@/emails/password-reset'
import { InvoiceEmail } from '@/emails/invoice'

export async function sendWelcomeEmail(to: string, username: string) {
  const html = await render(
    WelcomeEmail({
      username,
      dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    })
  )

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject: `Welcome to YourApp, ${username}!`,
    html,
  })

  if (error) throw new Error(error.message)
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const html = await render(PasswordResetEmail({ resetUrl }))

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject: 'Reset your password',
    html,
  })

  if (error) throw new Error(error.message)
}

export async function sendInvoiceEmail(
  to: string,
  invoice: Parameters<typeof InvoiceEmail>[0]
) {
  const html = await render(InvoiceEmail(invoice))

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject: `Invoice #${invoice.invoiceNumber}`,
    html,
  })

  if (error) throw new Error(error.message)
}
```

---

## 4. Stripe Setup

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

```typescript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})
```

```typescript
// lib/stripe-client.ts
import { loadStripe } from '@stripe/stripe-js'

let stripePromise: ReturnType<typeof loadStripe>

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}
```

---

## 5. Stripe Checkout Session (Server Action)

```typescript
// app/actions/stripe.ts
'use server'

import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function createCheckoutSession(priceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/sign-in')

  // Get or create Stripe customer
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  let customerId = profile?.stripe_customer_id

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id

    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', user.id)
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    subscription_data: {
      metadata: { supabase_user_id: user.id },
    },
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
  })

  if (!session.url) throw new Error('No checkout URL returned')

  redirect(session.url)
}
```

---

## 6. Webhook Handler

```typescript
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendInvoiceEmail } from '@/app/actions/email'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new NextResponse('Invalid signature', { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.CheckoutSession
        await handleCheckoutCompleted(session)
        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }
    }
  } catch (err) {
    console.error(`Error handling event ${event.type}:`, err)
    return new NextResponse('Handler error', { status: 500 })
  }

  return new NextResponse(null, { status: 200 })
}

async function handleCheckoutCompleted(session: Stripe.CheckoutSession) {
  const userId = session.metadata?.supabase_user_id
  if (!userId) return

  const subscriptionId =
    typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription?.id

  if (!subscriptionId) return

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const priceId = subscription.items.data[0].price.id
  const planName = subscription.items.data[0].price.nickname ?? 'Pro'

  await supabaseAdmin.from('subscriptions').upsert({
    user_id: userId,
    stripe_subscription_id: subscriptionId,
    stripe_customer_id: session.customer as string,
    status: subscription.status,
    price_id: priceId,
    plan_name: planName,
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
  })
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId =
    typeof invoice.subscription === 'string'
      ? invoice.subscription
      : invoice.subscription?.id

  if (!subscriptionId) return

  // Update subscription status
  await supabaseAdmin
    .from('subscriptions')
    .update({ status: 'active' })
    .eq('stripe_subscription_id', subscriptionId)
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId =
    typeof invoice.subscription === 'string'
      ? invoice.subscription
      : invoice.subscription?.id

  if (!subscriptionId) return

  await supabaseAdmin
    .from('subscriptions')
    .update({ status: 'past_due' })
    .eq('stripe_subscription_id', subscriptionId)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const priceId = subscription.items.data[0].price.id

  await supabaseAdmin
    .from('subscriptions')
    .update({
      status: subscription.status,
      price_id: priceId,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await supabaseAdmin
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id)
}
```

---

## 7. Subscription Management

```typescript
// app/actions/subscriptions.ts
'use server'

import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function cancelSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('stripe_subscription_id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (!subscription?.stripe_subscription_id) {
    throw new Error('No active subscription found')
  }

  // Cancel at period end (graceful)
  await stripe.subscriptions.update(subscription.stripe_subscription_id, {
    cancel_at_period_end: true,
  })
}

export async function resumeSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('stripe_subscription_id')
    .eq('user_id', user.id)
    .single()

  if (!subscription?.stripe_subscription_id) throw new Error('No subscription found')

  await stripe.subscriptions.update(subscription.stripe_subscription_id, {
    cancel_at_period_end: false,
  })
}

export async function upgradeSubscription(newPriceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('stripe_subscription_id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (!subscription?.stripe_subscription_id) throw new Error('No active subscription')

  const stripeSubscription = await stripe.subscriptions.retrieve(
    subscription.stripe_subscription_id
  )

  // Upgrade immediately with proration
  await stripe.subscriptions.update(subscription.stripe_subscription_id, {
    items: [
      {
        id: stripeSubscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'always_invoice',
  })
}
```

---

## 8. Customer Portal Redirect

```typescript
// app/actions/stripe.ts (continued)
export async function redirectToCustomerPortal() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (!profile?.stripe_customer_id) {
    throw new Error('No billing account found')
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  })

  redirect(session.url)
}
```

```typescript
// components/billing/manage-billing-button.tsx
import { redirectToCustomerPortal } from '@/app/actions/stripe'

export function ManageBillingButton() {
  return (
    <form action={redirectToCustomerPortal}>
      <button
        type="submit"
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Manage Billing
      </button>
    </form>
  )
}
```

---

## 9. Pricing Page with Live Stripe Products

```typescript
// app/(marketing)/pricing/page.tsx
import { stripe } from '@/lib/stripe'
import { createCheckoutSession } from '@/app/actions/stripe'

export const revalidate = 3600 // Re-fetch prices every hour

async function getPrices() {
  const prices = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
    type: 'recurring',
  })

  return prices.data
    .filter((price) => (price.product as { active: boolean }).active)
    .sort((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0))
}

export default async function PricingPage() {
  const prices = await getPrices()

  return (
    <div className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-gray-600">
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {prices.map((price) => {
            const product = price.product as { name: string; description: string | null; metadata: Record<string, string> }
            const features = (product.metadata.features ?? '').split(',').filter(Boolean)
            const isPopular = product.metadata.popular === 'true'

            return (
              <div
                key={price.id}
                className={`relative rounded-2xl p-8 ${
                  isPopular
                    ? 'bg-indigo-600 text-white shadow-2xl ring-2 ring-indigo-600'
                    : 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-900">
                    Most Popular
                  </span>
                )}

                <h3 className={`text-lg font-semibold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    ${((price.unit_amount ?? 0) / 100).toFixed(0)}
                  </span>
                  <span className={`text-sm ${isPopular ? 'text-indigo-200' : 'text-gray-500'}`}>
                    /{price.recurring?.interval}
                  </span>
                </div>

                {product.description && (
                  <p className={`mt-3 text-sm ${isPopular ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {product.description}
                  </p>
                )}

                <ul className="mt-6 space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <svg className={`h-4 w-4 flex-shrink-0 ${isPopular ? 'text-indigo-200' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature.trim()}
                    </li>
                  ))}
                </ul>

                <form action={createCheckoutSession.bind(null, price.id)} className="mt-8">
                  <button
                    type="submit"
                    className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      isPopular
                        ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    Get started
                  </button>
                </form>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

---

## 10. One-Time Payment Flow

```typescript
// app/actions/stripe.ts (continued)
export async function createOneTimePayment(priceId: string, quantity = 1) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: user.email,
    line_items: [{ price: priceId, quantity }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
    metadata: { supabase_user_id: user.id },
    invoice_creation: { enabled: true },
  })

  if (!session.url) throw new Error('No checkout URL')
  redirect(session.url)
}
```

---

## 11. Stripe Elements — Embedded Checkout

```typescript
// app/checkout/page.tsx
import { stripe } from '@/lib/stripe'
import { EmbeddedCheckoutWrapper } from '@/components/checkout/embedded-checkout'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ priceId?: string }>
}) {
  const { priceId } = await searchParams
  if (!priceId) redirect('/pricing')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    mode: 'subscription',
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    metadata: { supabase_user_id: user.id },
  })

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <EmbeddedCheckoutWrapper clientSecret={session.client_secret!} />
    </div>
  )
}
```

```typescript
// components/checkout/embedded-checkout.tsx
'use client'

import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface EmbeddedCheckoutWrapperProps {
  clientSecret: string
}

export function EmbeddedCheckoutWrapper({ clientSecret }: EmbeddedCheckoutWrapperProps) {
  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}
```

```typescript
// app/checkout/return/page.tsx — Handle return after embedded checkout
import { stripe } from '@/lib/stripe'
import Link from 'next/link'

export default async function CheckoutReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  if (!session_id) return <div>Invalid session</div>

  const session = await stripe.checkout.sessions.retrieve(session_id)

  if (session.status === 'complete') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Payment successful!</h1>
          <p className="mt-2 text-gray-600">
            Your subscription is now active. Welcome aboard!
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Payment incomplete</h1>
        <Link href="/pricing" className="mt-4 inline-block text-indigo-600 hover:underline">
          Return to pricing
        </Link>
      </div>
    </div>
  )
}
```

---

## 12. Supabase Subscriptions Table

```sql
-- SQL: subscriptions table
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  status text not null default 'inactive',
  price_id text,
  plan_name text,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table subscriptions enable row level security;

create policy "Users can view own subscription"
  on subscriptions for select
  using (auth.uid() = user_id);

-- Service role handles all writes via webhook
```

```typescript
// hooks/use-subscription.ts
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export function useSubscription() {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('status', 'active')
        .maybeSingle()

      if (error) throw error
      return data
    },
  })
}

export function useIsPro() {
  const { data } = useSubscription()
  return !!data && data.status === 'active'
}
```
