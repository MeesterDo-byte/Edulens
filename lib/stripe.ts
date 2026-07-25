import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export interface Plan {
  id: string
  name: string
  price: number
  studentLimit: number
  features: string[]
  interval: 'month' | 'year'
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    studentLimit: 50,
    features: [
      'Up to 50 students',
      'Basic dashboard',
      'Limited reports',
      'Community support',
    ],
    interval: 'month',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 999, // $9.99 in cents
    studentLimit: 500,
    features: [
      'Up to 500 students',
      'Advanced analytics',
      'Unlimited reports',
      'Email support',
      'Custom branding',
      'API access',
    ],
    interval: 'month',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 4999, // $49.99 in cents
    studentLimit: 5000,
    features: [
      'Unlimited students',
      'Advanced analytics',
      'Priority support',
      'Dedicated account manager',
      'Custom integrations',
      'White-label solution',
      'Advanced security',
      'SLA guarantee',
    ],
    interval: 'month',
  },
]

export const stripeService = {
  // Create customer
  createCustomer: async (email: string, name: string) => {
    return await stripe.customers.create({
      email,
      name,
    })
  },

  // Create subscription
  createSubscription: async (
    customerId: string,
    priceId: string,
    trialDays: number = 14
  ) => {
    return await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: trialDays,
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    })
  },

  // Get subscription
  getSubscription: async (subscriptionId: string) => {
    return await stripe.subscriptions.retrieve(subscriptionId)
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId: string) => {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
  },

  // Create payment intent
  createPaymentIntent: async (amount: number, customerId: string) => {
    return await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
      payment_method_types: ['card'],
    })
  },

  // Get customer invoices
  getInvoices: async (customerId: string) => {
    return await stripe.invoices.list({
      customer: customerId,
      limit: 100,
    })
  },

  // Create webhook endpoint
  createWebhookEndpoint: async (url: string) => {
    return await stripe.webhookEndpoints.create({
      url,
      enabled_events: [
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'invoice.payment_succeeded',
        'invoice.payment_failed',
      ],
    })
  },
}
