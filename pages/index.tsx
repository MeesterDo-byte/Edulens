import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>EduLens - AI-onderwijsdashboard</title>
        <meta name="description" content="AI-onderwijsdashboard voor basisscholen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-900">EduLens</h1>
            <ul className="flex gap-8">
              <li><Link href="/" className="text-blue-900 font-semibold hover:text-blue-700">Dashboard</Link></li>
              <li><Link href="/leerlingen" className="text-gray-600 hover:text-blue-900">Leerlingen</Link></li>
              <li><Link href="/interventies" className="text-gray-600 hover:text-blue-900">Interventies</Link></li>
              <li><Link href="/rapportages" className="text-gray-600 hover:text-blue-900">Rapportages</Link></li>
            </ul>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Header */}
          <header className="mb-8">
            <h2 className="text-4xl font-bold text-blue-900">
              EduLens
            </h2>
            <p className="text-gray-600 mt-2">
              AI-onderwijsdashboard voor basisscholen
            </p>
          </header>

          {/* Welcome */}
          <section className="bg-white rounded-2xl shadow p-6 mb-6">
            <h3 className="text-2xl font-semibold">
              Goedemorgen, Marieke 👋
            </h3>
            <p className="text-gray-600">
              Basisschool De Horizon
            </p>
          </section>

          {/* Scores */}
          <section className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold">
                📚 Leerresultaten
              </h4>
              <p className="text-3xl font-bold text-green-600 mt-3">
                78%
              </p>
              <p className="text-gray-500">
                Op koers
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold">
                🏫 Schoolkwaliteit
              </h4>
              <p className="text-3xl font-bold text-blue-600 mt-3">
                Goed
              </p>
              <p className="text-gray-500">
                Groei zichtbaar
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold">
                ⚠ Aandachtspunt
              </h4>
              <p className="text-xl font-bold text-orange-600 mt-3">
                Begrijpend lezen
              </p>
              <p className="text-gray-500">
                Groep 7
              </p>
            </div>
          </section>

          {/* Stats Row */}
          <section className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-500 text-sm">Totaal leerlingen</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">287</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-500 text-sm">Actieve interventies</p>
              <p className="text-3xl font-bold text-green-600 mt-2">5</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-500 text-sm">Groepen</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">8</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-500 text-sm">Voortgang</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">92%</p>
            </div>
          </section>

          {/* AI Analyse */}
          <section className="bg-white rounded-2xl shadow p-6 mb-6">
            <h3 className="text-2xl font-semibold mb-4">
              🤖 EduLens AI-analyse
            </h3>

            <p className="text-gray-700 mb-4">
              Ik heb de resultaten van de school geanalyseerd.
              Dit zijn de belangrijkste inzichten:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-xl">✅</span>
                <span>Rekenen groep 5 laat sterke groei zien met +8% verbetering.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">⚠</span>
                <span>Begrijpend lezen groep 7 daalt over drie meetmomenten (-12%).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <span>Advies: start een gerichte leesinterventie van 8 weken voor maximale impact.</span>
              </li>
            </ul>

            <Link href="/interventies" className="inline-block">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors">
                Maak verbeterplan
              </button>
            </Link>
          </section>

          {/* Recent Activity */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-2xl font-semibold mb-4">
              📋 Recente activiteit
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b">
                <div>
                  <p className="font-semibold">Leesinterventie groep 7 gestart</p>
                  <p className="text-sm text-gray-500">01-09-2024 om 10:30</p>
                </div>
                <span className="text-green-600 font-semibold">✓ Actief</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b">
                <div>
                  <p className="font-semibold">Maandrapport juli gegenereerd</p>
                  <p className="text-sm text-gray-500">31-07-2024 om 15:45</p>
                </div>
                <span className="text-blue-600">📄</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Nieuwe leerling geregistreerd</p>
                  <p className="text-sm text-gray-500">28-07-2024 om 09:15</p>
                </div>
                <span className="text-purple-600">➕</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
