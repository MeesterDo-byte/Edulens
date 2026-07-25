interface SchoolSubscription {
  id: string
  school_id: string
  plan_id: 'free' | 'pro' | 'enterprise'
  stripe_customer_id: string
  stripe_subscription_id: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_start: string
  current_period_end: string
  trial_end: string | null
  student_count: number
  price_per_month: number
  auto_renew: boolean
  created_at: string
  updated_at: string
}

interface Invoice {
  id: string
  school_id: string
  subscription_id: string
  amount: number
  currency: string
  status: 'paid' | 'pending' | 'failed'
  invoice_url: string
  due_date: string
  paid_date: string | null
  created_at: string
}

const SUBSCRIPTIONS_KEY = 'edulens_subscriptions'
const INVOICES_KEY = 'edulens_invoices'

export const billingService = {
  // Create subscription
  createSubscription: (data: Omit<SchoolSubscription, 'id' | 'created_at' | 'updated_at'>) => {
    const subscriptions = JSON.parse(localStorage.getItem(SUBSCRIPTIONS_KEY) || '[]')
    const newSubscription: SchoolSubscription = {
      ...data,
      id: `sub_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    subscriptions.push(newSubscription)
    localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions))
    return newSubscription
  },

  // Get subscription by school
  getSubscription: (schoolId: string): SchoolSubscription | null => {
    const subscriptions = JSON.parse(localStorage.getItem(SUBSCRIPTIONS_KEY) || '[]')
    return subscriptions.find((s: SchoolSubscription) => s.school_id === schoolId) || null
  },

  // Update subscription
  updateSubscription: (subscriptionId: string, updates: Partial<SchoolSubscription>) => {
    const subscriptions = JSON.parse(localStorage.getItem(SUBSCRIPTIONS_KEY) || '[]')
    const index = subscriptions.findIndex((s: SchoolSubscription) => s.id === subscriptionId)
    if (index !== -1) {
      subscriptions[index] = {
        ...subscriptions[index],
        ...updates,
        updated_at: new Date().toISOString(),
      }
      localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions))
      return subscriptions[index]
    }
    return null
  },

  // Cancel subscription
  cancelSubscription: (subscriptionId: string) => {
    return billingService.updateSubscription(subscriptionId, {
      status: 'canceled',
      auto_renew: false,
    })
  },

  // Get all invoices for school
  getInvoices: (schoolId: string) => {
    const invoices = JSON.parse(localStorage.getItem(INVOICES_KEY) || '[]')
    return invoices.filter((i: Invoice) => i.school_id === schoolId)
  },

  // Create invoice
  createInvoice: (data: Omit<Invoice, 'id' | 'created_at'>) => {
    const invoices = JSON.parse(localStorage.getItem(INVOICES_KEY) || '[]')
    const newInvoice: Invoice = {
      ...data,
      id: `inv_${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    invoices.push(newInvoice)
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices))
    return newInvoice
  },

  // Check student limit
  checkStudentLimit: (schoolId: string, currentStudents: number): boolean => {
    const subscription = billingService.getSubscription(schoolId)
    if (!subscription) return currentStudents < 50 // Default free limit
    return currentStudents < subscription.student_count
  },

  // Get usage percentage
  getUsagePercentage: (schoolId: string, currentStudents: number): number => {
    const subscription = billingService.getSubscription(schoolId)
    if (!subscription) return (currentStudents / 50) * 100
    return (currentStudents / subscription.student_count) * 100
  },

  // Calculate plan cost
  calculateCost: (plan: string, students: number): number => {
    const costs: Record<string, number> = {
      free: 0,
      pro: 999,
      enterprise: 4999,
    }
    return costs[plan] || 0
  },
}
