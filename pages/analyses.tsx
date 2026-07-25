import Head from 'next/head'
import Link from 'next/link'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const lineData = [
  { month: 'Jan', rekenen: 72, taal: 68, lezen: 65 },
  { month: 'Feb', rekenen: 74, taal: 70, lezen: 67 },
  { month: 'Mar', rekenen: 76, taal: 72, lezen: 68 },
  { month: 'Apr', rekenen: 78, taal: 75, lezen: 70 },
  { month: 'May', rekenen: 80, taal: 77, lezen: 72 },
  { month: 'Jun', rekenen: 82, taal: 78, lezen: 68 },
  { month: 'Jul', rekenen: 82, taal: 78, lezen: 65 },
]

const groupData = [
  { name: 'Groep 4', 'op koers': 85, risico: 10, ondersteund: 5 },
  { name: 'Groep 5', 'op koers': 88, risico: 8, ondersteund: 4 },
  { name: 'Groep 6', 'op koers': 82, risico: 12, ondersteund: 6 },
  { name: 'Groep 7', 'op koers': 75, risico: 18, ondersteund: 7 },
]

const pieData = [
  { name: 'Op koers', value: 82 },
  { name: 'Risico', value: 12 },
  { name: 'Ondersteund', value: 6 },
]

const COLORS = ['#10b981', '#f97316', '#3b82f6']

export default function Analyses() {
  return (
    <>
      <Head>
        <title>Analyses - EduLens</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              EduLens
            </Link>
            <ul className="flex gap-8">
              <li><Link href="/" className="text-gray-600 hover:text-blue-900">Dashboard</Link></li>
              <li><Link href="/leerlingen" className="text-gray-600 hover:text-blue-900">Leerlingen</Link></li>
              <li><Link href="/interventies" className="text-gray-600 hover:text-blue-900">Interventies</Link></li>
              <li><Link href="/analyses" className="text-blue-900 font-semibold">Analyses</Link></li>
              <li><Link href="/rapportages" className="text-gray-600 hover:text-blue-900">Rapportages</Link></li>
            </ul>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">Data Analyses 📊</h1>

          {/* Trends Over Time */}
          <section className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Trends over tijd</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rekenen" stroke="#3b82f6" name="Rekenen" />
                <Line type="monotone" dataKey="taal" stroke="#8b5cf6" name="Taal" />
                <Line type="monotone" dataKey="lezen" stroke="#ec4899" name="Lezen" />
              </LineChart>
            </ResponsiveContainer>
          </section>

          {/* Performance by Group */}
          <section className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Prestaties per groep</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={groupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="op koers" fill="#10b981" />
                <Bar dataKey="risico" fill="#f97316" />
                <Bar dataKey="ondersteund" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* Overall Status */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Totale schoolstatus</h2>
              <ResponsiveContainer width="100%" height={250}>
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

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Key Insights 🔍</h2>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                  <p className="font-semibold text-green-900">✅ Positieve trend</p>
                  <p className="text-green-700">Rekenen toont consistent groei (+10% sinds januari)</p>
                </div>
                <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                  <p className="font-semibold text-orange-900">⚠️ Aandachtspunt</p>
                  <p className="text-orange-700">Begrijpend lezen daalt in groep 7 (65% in juli)</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="font-semibold text-blue-900">📈 Aanbeveling</p>
                  <p className="text-blue-700">Implementeer leesinterventie in groep 7</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
