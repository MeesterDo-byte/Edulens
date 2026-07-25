import Head from 'next/head'
import { useState, useEffect } from 'react'
import { authService } from '@/lib/auth'
import { billingService } from '@/lib/billing'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 2400, subscriptions: 24 },
  { month: 'Feb', revenue: 1398, subscriptions: 18 },
  { month: 'Mar', revenue: 9800, subscriptions: 29 },
  { month: 'Apr', revenue: 3908, subscriptions: 35 },
  { month: 'May', revenue: 4800, subscriptions: 42 },
  { month: 'Jun', revenue: 3800, subscriptions: 55 },
]

const planDistribution = [
  { name: 'Free', value: 240 },
  { name: 'Pro', value: 55 },
  { name: 'Enterprise', value: 8 },
]

const COLORS = ['#ef4444', '#3b82f6', '#10b981']

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRevenue: 15906,
    totalSubscriptions: 303,
    activeSubscriptions: 65,
    monthlyRecurring: 6240,
  })

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser || currentUser.rol !== 'directeur') {
      router.push('/login')
      return
    }
    setUser(currentUser)
    setIsAdmin(currentUser.rol === 'directeur')
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }

  if (isLoading || !isAdmin) {
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
        <title>Admin Dashboard - EduLens</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900 flex items-center gap-3">
              <span>📚</span> EduLens Admin
            </Link>
            <div className="flex gap-4">
              <span className="text-sm text-gray-600 py-2">👤 {user?.voornaam}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Uitloggen
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Admin Dashboard 💼</h1>
          <p className="text-gray-600 mb-8">Revenue, subscriptions en analytics</p>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow p-6 border-l-4 border-green-500">
              <p className="text-gray-600 text-sm font-semibold mb-2">💰 Totale Revenue</p>
              <p className="text-4xl font-bold text-green-700">
                €{(stats.totalRevenue / 100).toFixed(2)}
              </p>
              <p className="text-xs text-green-600 mt-2">↑ 12% deze maand</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow p-6 border-l-4 border-blue-500">
              <p className="text-gray-600 text-sm font-semibold mb-2">📊 Totale Schools</p>
              <p className="text-4xl font-bold text-blue-700">{stats.totalSubscriptions}</p>
              <p className="text-xs text-blue-600 mt-2">↑ 8 deze maand</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow p-6 border-l-4 border-purple-500">
              <p className="text-gray-600 text-sm font-semibold mb-2">✅ Actieve Abonnementen</p>
              <p className="text-4xl font-bold text-purple-700">{stats.activeSubscriptions}</p>
              <p className="text-xs text-purple-600 mt-2">64% conversion rate</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow p-6 border-l-4 border-orange-500">
              <p className="text-gray-600 text-sm font-semibold mb-2">💳 MRR (Monthly)</p>
              <p className="text-4xl font-bold text-orange-700">€{(stats.monthlyRecurring / 100).toFixed(0)}</p>
              <p className="text-xs text-orange-600 mt-2">↑ 24% sinds vorig kwartaal</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Revenue Trend (6 Maanden)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Plan Distribution */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Plan Verdeling</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💳 Recente Transacties</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">School</th>
                    <th className="px-6 py-4 text-left font-semibold">Plan</th>
                    <th className="px-6 py-4 text-left font-semibold">Bedrag</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Basisschool De Horizon</td>
                    <td className="px-6 py-4">Pro</td>
                    <td className="px-6 py-4 font-semibold">€9.99</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        ✓ Betaald
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">25-07-2024</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Middelbare School Amsterdam</td>
                    <td className="px-6 py-4">Enterprise</td>
                    <td className="px-6 py-4 font-semibold">€49.99</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        ✓ Betaald
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">24-07-2024</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Gymnasium Rotterdam</td>
                    <td className="px-6 py-4">Pro</td>
                    <td className="px-6 py-4 font-semibold">€9.99</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                        ⏱️ In afwachting
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">25-07-2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
