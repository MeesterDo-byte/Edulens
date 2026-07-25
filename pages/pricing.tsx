import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { plans } from '@/lib/stripe'

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const getPrice = (plan: any) => {
    if (billingPeriod === 'year') {
      return Math.floor(plan.price * 12 * 0.2) // 20% discount for annual
    }
    return plan.price
  }

  return (
    <>
      <Head>
        <title>Prijzen - EduLens</title>
        <meta name="description" content="EduLens pricing plans" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900 flex items-center gap-3">
              <span>📚</span> EduLens
            </Link>
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-600 hover:text-blue-900">
                Inloggen
              </Link>
              <Link href="/register" className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                Registreren
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-blue-900 mb-4">Eenvoudige, Doorzichtige Prijzen 💰</h1>
            <p className="text-xl text-gray-600 mb-8">
              Kies het perfecte plan voor uw school. Geen verborgen kosten.
            </p>

            {/* Billing Toggle */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setBillingPeriod('month')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  billingPeriod === 'month'
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Maandelijks
              </button>
              <button
                onClick={() => setBillingPeriod('year')}
                className={`px-6 py-3 rounded-lg font-semibold transition relative ${
                  billingPeriod === 'year'
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Jaarlijks
                <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  20% korting
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 ${
                  plan.id === 'pro' ? 'bg-blue-700 text-white ring-4 ring-blue-700 relative -mt-8' : 'bg-white'
                }`}
              >
                {plan.id === 'pro' && (
                  <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-center py-3 text-sm font-bold">
                    🏆 POPULAIRSTE KEUZE
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    {plan.price === 0 ? (
                      <p className={`text-4xl font-bold ${
                        plan.id === 'pro' ? 'text-white' : 'text-blue-900'
                      }`}>
                        Gratis
                      </p>
                    ) : (
                      <>
                        <p className={`text-4xl font-bold ${
                          plan.id === 'pro' ? 'text-white' : 'text-blue-900'
                        }`}>
                          €{(getPrice(plan) / 100).toFixed(2)}
                        </p>
                        <p className={`text-sm ${
                          plan.id === 'pro' ? 'text-blue-100' : 'text-gray-600'
                        }`}>
                          per {billingPeriod === 'month' ? 'maand' : 'jaar'}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Student Limit */}
                  <p className={`font-semibold mb-6 text-lg ${
                    plan.id === 'pro' ? 'text-blue-100' : 'text-gray-700'
                  }`}>
                    Tot {plan.studentLimit} leerlingen
                  </p>

                  {/* CTA Button */}
                  <Link
                    href="/register"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`block text-center px-6 py-3 rounded-lg font-bold mb-8 transition ${
                      plan.id === 'pro'
                        ? 'bg-white text-blue-700 hover:bg-gray-100'
                        : 'bg-blue-700 text-white hover:bg-blue-800'
                    }`}
                  >
                    {plan.id === 'free' ? 'Gratis Starten' : 'Nu Proberen'}
                  </Link>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <span className={plan.id === 'pro' ? 'text-blue-50' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Veelgestelde Vragen 🤔</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="font-bold text-lg mb-2 text-blue-900">Kan ik upgraden of downgraden?</h3>
                <p className="text-gray-700">
                  Ja! U kunt op elk moment uw plan wijzigen. Geen annuleringskosten.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="font-bold text-lg mb-2 text-blue-900">Hoe werkt de 14-daagse trial?</h3>
                <p className="text-gray-700">
                  Alle betaalde plans hebben een 14-daagse gratis proefperiode. Geen creditcard nodig.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="font-bold text-lg mb-2 text-blue-900">Wat als ik meer leerlingen nodig heb?</h3>
                <p className="text-gray-700">
                  Upgrade eenvoudig naar Pro of Enterprise. U betaalt alleen voor wat u nodig hebt.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="font-bold text-lg mb-2 text-blue-900">Hebben jullie een schoolkorting?</h3>
                <p className="text-gray-700">
                  Ja! Neem contact met ons op voor volume-korting en onderwijsinstellingen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
