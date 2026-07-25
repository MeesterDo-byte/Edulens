import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Rapportages() {
  const [reports] = useState([
    {
      id: 1,
      naam: 'Maandelijkse voortgangsrapport Juli 2024',
      type: 'Voortgang',
      datum: '31-07-2024',
      groepen: 'Alle groepen',
      download: true
    },
    {
      id: 2,
      naam: 'Jaarrapport schoolkwaliteit 2023-2024',
      type: 'Jaarlijks',
      datum: '30-06-2024',
      groepen: 'Schoolbreed',
      download: true
    },
    {
      id: 3,
      naam: 'Analyse begrijpend lezen groep 7',
      type: 'Specialist',
      datum: '15-07-2024',
      groepen: 'Groep 7',
      download: true
    },
    {
      id: 4,
      naam: 'Interventie effectiviteitsrapport',
      type: 'Evaluatie',
      datum: '20-07-2024',
      groepen: 'Alle groepen',
      download: true
    }
  ])

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Voortgang': return 'bg-blue-100 text-blue-800'
      case 'Jaarlijks': return 'bg-purple-100 text-purple-800'
      case 'Specialist': return 'bg-orange-100 text-orange-800'
      case 'Evaluatie': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <Head>
        <title>Rapportages - EduLens</title>
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
              <li><Link href="/interventies" className="text-gray-600 hover:text-blue-900">Interventies</Link></li>
              <li><Link href="/rapportages" className="text-blue-900 font-semibold">Rapportages</Link></li>
            </ul>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Rapportages 📑</h1>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-800">
              + Maak Rapport
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Rapportnaam</th>
                  <th className="px-6 py-4 text-left font-semibold">Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Datum</th>
                  <th className="px-6 py-4 text-left font-semibold">Groepen</th>
                  <th className="px-6 py-4 text-left font-semibold">Actie</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{report.naam}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{report.datum}</td>
                    <td className="px-6 py-4">{report.groepen}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-700 hover:text-blue-900 font-semibold">
                        📥 Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
