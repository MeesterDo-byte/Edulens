import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { authService } from '@/lib/auth'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const lineData = [
  { month: 'Jan', rekenen: 72, taal: 68, lezen: 65 },
  { month: 'Feb', rekenen: 74, taal: 70, lezen: 67 },
  { month: 'Mar', rekenen: 76, taal: 72, lezen: 68 },
  { month: 'Apr', rekenen: 78, taal: 75, lezen: 70 },
  { month: 'May', rekenen: 80, taal: 77, lezen: 72 },
  { month: 'Jun', rekenen: 82, taal: 78, lezen: 68 },
]

const pieData = [
  { name: 'Op koers', value: 82 },
  { name: 'Risico', value: 12 },
  { name: 'Ondersteund', value: 6 },
]

const COLORS = ['#10b981', '#f97316', '#3b82f6']

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
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
        <title>Dashboard - EduLens</title>
        <meta name="description" content="EduLens AI-onderwijsdashboard" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <h1 className="text-2xl font-bold text-blue-900">EduLens</h1>
            </div>
            <ul className="flex gap-8">
              <li><Link href="/" className="text-blue-900 font-semibold hover:text-blue-700">Dashboard</Link></li>
              <li><Link href="/leerlingen" className="text-gray-600 hover:text-blue-900">Leerlingen</Link></li>
              <li><Link href="/interventies" className="text-gray-600 hover:text-blue-900">Interventies</Link></li>
              <li><Link href="/analyses" className="text-gray-600 hover:text-blue-900">Analyses</Link></li>
              <li><Link href="/rapportages" className="text-gray-600 hover:text-blue-900">Rapportages</Link></li>
            </ul>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-sm text-gray-900">{user.voornaam} {user.achternaam}</p>
                <p className="text-xs text-gray-500">{user.schoolNaam}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm font-semibold"
              >
                Uitloggen
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Welcome Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Welkom terug, {user.voornaam}! 👋
            </h2>
            <p className="text-blue-100">
              {user.schoolNaam} | {user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}
            </p>
          </section>

          {/* Stats Grid */}
          <section className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <p className="text-gray-500 text-sm">Totaal leerlingen</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">287</p>
              <p className="text-green-600 text-sm mt-2">↑ 12 deze maand</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <p className="text-gray-500 text-sm">Actieve interventies</p>
              <p className="text-3xl font-bold text-green-600 mt-2">5</p>
              <p className="text-gray-600 text-sm mt-2">Op schema</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <p className="text-gray-500 text-sm">Gemiddelde score</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">78%</p>
              <p className="text-green-600 text-sm mt-2">↑ 2% gestegen</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <p className="text-gray-500 text-sm">Naleving doelen</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">92%</p>
              <p className="text-gray-600 text-sm mt-2">On track</p>
            </div>
          </section>

          {/* Charts Section */}
          <section className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Trends */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">📈 Leerresultaten trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rekenen" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="taal" stroke="#8b5cf6" />
                  <Line type="monotone" dataKey="lezen" stroke="#ec4899" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Status Pie */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">🎯 Schoolstatus</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* AI Insights */}
          <section className="bg-white rounded-2xl shadow p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">🤖 AI Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <p className="font-semibold text-green-900">✅ Sterke punt</p>
                <p className="text-sm text-green-700 mt-1">Rekenen groep 5 laat sterke groei zien (+10%)</p>
              </div>
              <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg">
                <p className="font-semibold text-orange-900">⚠️ Aandachtspunt</p>
                <p className="text-sm text-orange-700 mt-1">Begrijpend lezen groep 7 daalt (-12%)</p>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <p className="font-semibold text-blue-900">💡 Aanbeveling</p>
                <p className="text-sm text-blue-700 mt-1">Start leesinterventie in groep 7</p>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="grid md:grid-cols-3 gap-6">
            <Link href="/leerlingen" className="block">
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition cursor-pointer h-full">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Leerlingen Beheren</h3>
                <p className="text-gray-600 text-sm">Bekijk en beheer alle leerlingen</p>
              </div>
            </Link>
            <Link href="/interventies" className="block">
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition cursor-pointer h-full">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interventies</h3>
                <p className="text-gray-600 text-sm">Plan en monitor interventies</p>
              </div>
            </Link>
            <Link href="/analyses" className="block">
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition cursor-pointer h-full">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Analyses</h3>
                <p className="text-gray-600 text-sm">Diepgaande data analyses</p>
              </div>
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
