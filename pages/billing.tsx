import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { authService } from '@/lib/auth'
import { billingService } from '@/lib/billing'
import { plans } from '@/lib/stripe'

export default function Billing() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [invoices, setInvoices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    const sub = billingService.getSubscription(currentUser.school_id)
    if (sub) {
      setSubscription(sub)
      const invs = billingService.getInvoices(currentUser.school_id)
      setInvoices(invs)
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }

  const currentPlan = subscription
    ? plans.find((p) => p.id === subscription.plan_id)
    : plans.find((p) => p.id === 'free')

  const upgradeToPro = () => {
    const newSub = billingService.createSubscription({
      school_id: user.school_id,
      plan_id: 'pro',
      stripe_customer_id: `cus_${Date.now()}`,
      stripe_subscription_id: `sub_${Date.now()}`,
      status: 'trialing',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      trial_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      student_count: 500,
      price_per_month: 9.99,
      auto_renew: true,
    })
    setSubscription(newSub)
  }

  const cancelSubscription = () => {
    if (subscription && window.confirm('Bent u zeker dat u uw abonnement wilt annuleren?')) {
      const updated = billingService.cancelSubscription(subscription.id)
      setSubscription(updated)
    }
  }

  if (isLoading || !user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>Facturering - EduLens</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900 flex items-center gap-3">
              <span>📚</span> EduLens
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm font-semibold"
            >
              Uitloggen
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">Facturering & Abonnement 💳</h1>

          {/* Current Plan */}
          <div className="bg-white rounded-2xl shadow p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Huidig Plan</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-2">Plan</p>
                <p className="text-4xl font-bold text-blue-900 mb-4">{currentPlan?.name}</p>
                <p className="text-xl font-semibold text-blue-700 mb-2">
                  €{currentPlan?.price ? (currentPlan.price / 100).toFixed(2) : '0.00'}/maand
                </p>
                <p className="text-gray-600 mb-6">Tot {currentPlan?.studentLimit} leerlingen</p>
                {subscription?.status === 'trialing' && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-blue-900 font-semibold">🎉 14 dagen gratis trial</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Eindigt op {new Date(subscription.trial_end).toLocaleDateString('nl-NL')}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-2">Status</p>
                <p className="text-lg font-semibold mb-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${
                    subscription?.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {subscription?.status === 'active' ? '✓ Actief' : '⏱️ Trial'}
                  </span>
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-600">Volgende factuur:</span>
                    <span className="font-semibold ml-2">
                      {new Date(subscription?.current_period_end || Date.now()).toLocaleDateString('nl-NL')}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-600">Auto-vernieuwing:</span>
                    <span className="font-semibold ml-2">{subscription?.auto_renew ? 'Aan' : 'Uit'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              {currentPlan?.id === 'free' && (
                <button
                  onClick={upgradeToPro}
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-semibold transition"
                >
                  Upgraden naar Pro
                </button>
              )}
              {subscription && subscription.status !== 'canceled' && (
                <button
                  onClick={cancelSubscription}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold transition"
                >
                  Abonnement annuleren
                </button>
              )}
              <Link
                href="/pricing"
                className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 font-semibold transition"
              >
                Alle Plans
              </Link>
            </div>
          </div>

          {/* Invoices */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Facturen</h2>
            {invoices.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Nog geen facturen</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Factuurnummer</th>
                      <th className="px-6 py-4 text-left font-semibold">Bedrag</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Datum</th>
                      <th className="px-6 py-4 text-left font-semibold">Actie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm">{invoice.id}</td>
                        <td className="px-6 py-4 font-semibold">
                          €{(invoice.amount / 100).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm text-white ${
                            invoice.status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {invoice.status === 'paid' ? '✓ Betaald' : '✗ Openstaand'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {new Date(invoice.created_at).toLocaleDateString('nl-NL')}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={invoice.invoice_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-semibold"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
