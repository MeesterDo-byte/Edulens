import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Interventies() {
  const [interventions] = useState([
    {
      id: 1,
      titel: 'Leesinterventie groep 7',
      beschrijving: 'Gerichte training begrijpend lezen',
      duur: '8 weken',
      start: '01-09-2024',
      status: 'Actief',
      leerlingen: 3,
      voortgang: 65
    },
    {
      id: 2,
      titel: 'Rekenen versnelling groep 5',
      beschrijving: 'Uitdagende wiskundetaken',
      duur: '10 weken',
      start: '01-10-2024',
      status: 'Gepland',
      leerlingen: 2,
      voortgang: 0
    },
    {
      id: 3,
      titel: 'Taalondersteuning groep 6',
      beschrijving: 'Dyslexie begeleiding',
      duur: '12 weken',
      start: '15-08-2024',
      status: 'Actief',
      leerlingen: 1,
      voortgang: 45
    }
  ])

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Actief': return 'bg-green-100 text-green-800'
      case 'Gepland': return 'bg-blue-100 text-blue-800'
      case 'Afgerond': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <Head>
        <title>Interventies - EduLens</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              EduLens
            </Link>
            <ul className="flex gap-8">
              <li><Link href="/" className="text-gray-600 hover:text-blue-900">Dashboard</Link></li>
              <li><Link href="/leerlingen" className="text-gray-600 hover:text-blue-900">Leerlingen</Link></li>
              <li><Link href="/interventies" className="text-blue-900 font-semibold">Interventies</Link></li>
              <li><Link href="/rapportages" className="text-gray-600 hover:text-blue-900">Rapportages</Link></li>
            </ul>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Interventies 🎯</h1>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-800">
              + Nieuwe Interventie
            </button>
          </div>

          <div className="grid gap-6">
            {interventions.map((intervention) => (
              <div key={intervention.id} className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">{intervention.titel}</h3>
                    <p className="text-gray-600">{intervention.beschrijving}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(intervention.status)}`}>
                    {intervention.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Duur</p>
                    <p className="font-semibold">{intervention.duur}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Start</p>
                    <p className="font-semibold">{intervention.start}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Leerlingen</p>
                    <p className="font-semibold">{intervention.leerlingen}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Voortgang</p>
                    <p className="font-semibold">{intervention.voortgang}%</p>
                  </div>
                </div>

                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${intervention.voortgang}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
