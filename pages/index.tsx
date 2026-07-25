import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [showPlanModal, setShowPlanModal] = useState(false)

  return (
    <>
      <Head>
        <title>EduLens - AI-onderwijsdashboard</title>
        <meta name="description" content="AI-onderwijsdashboard voor basisscholen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-blue-900">
              EduLens
            </h1>
            <p className="text-gray-600 mt-2">
              AI-onderwijsdashboard voor basisscholen
            </p>
          </header>


          {/* Welcome */}
          <section className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold">
              Goedemorgen, Marieke 👋
            </h2>
            <p className="text-gray-600">
              Basisschool De Horizon
            </p>
          </section>


          {/* Scores */}
          <section className="grid md:grid-cols-3 gap-6 mb-6">

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold">
                📚 Leerresultaten
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-3">
                78%
              </p>
              <p className="text-gray-500">
                Op koers
              </p>
            </div>


            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold">
                🏫 Schoolkwaliteit
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-3">
                Goed
              </p>
              <p className="text-gray-500">
                Groei zichtbaar
              </p>
            </div>


            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold">
                ⚠ Aandachtspunt
              </h3>
              <p className="text-xl font-bold text-orange-600 mt-3">
                Begrijpend lezen
              </p>
              <p className="text-gray-500">
                Groep 7
              </p>
            </div>

          </section>


          {/* AI Analyse */}
          <section className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-semibold mb-4">
              🤖 EduLens AI-analyse
            </h2>

            <p className="text-gray-700 mb-4">
              Ik heb de resultaten van de school geanalyseerd.
              Dit zijn de belangrijkste inzichten:
            </p>


            <ul className="space-y-3">

              <li>
                ✅ Rekenen groep 5 laat sterke groei zien.
              </li>

              <li>
                ⚠ Begrijpend lezen groep 7 daalt over drie meetmomenten.
              </li>

              <li>
                💡 Advies: start een gerichte leesinterventie van 8 weken.
              </li>

            </ul>


            <button
              onClick={() => setShowPlanModal(true)}
              className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Maak verbeterplan
            </button>

          </section>

        </div>
      </main>

      {/* Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
            <h3 className="text-2xl font-bold mb-4">Verbeterplan aanmaken</h3>
            <p className="text-gray-600 mb-6">
              Dit functionaliteit is binnenkort beschikbaar. Het systeem zal automatisch een gerichte leesinterventie plannen voor groep 7.
            </p>
            <button
              onClick={() => setShowPlanModal(false)}
              className="w-full bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </>
  )
}
