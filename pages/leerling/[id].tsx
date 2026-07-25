import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function LeerlingDetail() {
  const student = {
    id: 1,
    naam: 'Emma de Vries',
    groep: '5A',
    geboortedatum: '15-03-2013',
    ouders: 'Peter de Vries & Maria de Vries',
    email: 'ouders@example.com',
    telefoon: '06-12345678',
    noten: 'Sterke wiskundeleerling, betrokken bij sportactiviteiten',
  }

  const scores = [
    { periode: 'Januari', rekenen: 78, taal: 75, lezen: 80, gemiddelde: 77.7 },
    { periode: 'Februari', rekenen: 80, taal: 77, lezen: 82, gemiddelde: 79.7 },
    { periode: 'Maart', rekenen: 82, taal: 78, lezen: 85, gemiddelde: 81.7 },
    { periode: 'April', rekenen: 82, taal: 80, lezen: 85, gemiddelde: 82.3 },
    { periode: 'Mei', rekenen: 85, taal: 82, lezen: 87, gemiddelde: 84.7 },
    { periode: 'Juni', rekenen: 82, taal: 80, lezen: 85, gemiddelde: 82.3 },
  ]

  const strengths = [
    'Snelle rekenaar',
    'Goed begrijpend lezen',
    'Netjes schrijven',
    'Goede groepsdynamica',
  ]

  const improvements = [
    'Meer geduld bij moeilijke opdrachten',
    'Spellingsregels oefenen',
  ]

  return (
    <>
      <Head>
        <title>Leerling Detail - EduLens</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              EduLens
            </Link>
            <ul className="flex gap-8">
              <li><Link href="/" className="text-gray-600 hover:text-blue-900">Dashboard</Link></li>
              <li><Link href="/leerlingen" className="text-blue-900 font-semibold">Leerlingen</Link></li>
              <li><Link href="/interventies" className="text-gray-600 hover:text-blue-900">Interventies</Link></li>
              <li><Link href="/analyses" className="text-gray-600 hover:text-blue-900">Analyses</Link></li>
              <li><Link href="/rapportages" className="text-gray-600 hover:text-blue-900">Rapportages</Link></li>
            </ul>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <Link href="/leerlingen" className="text-blue-700 hover:text-blue-900 mb-4 inline-block">
            ← Terug naar leerlingen
          </Link>

          {/* Header */}
          <div className="bg-white rounded-2xl shadow p-8 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-blue-900">{student.naam}</h1>
                <p className="text-gray-600 text-lg mt-1">Groep {student.groep}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Geboortedatum</p>
                <p className="font-semibold">{student.geboortedatum}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">👨‍👩‍👧 Ouders</h2>
              <p className="font-semibold">{student.ouders}</p>
              <p className="text-gray-600 text-sm mt-2">{student.email}</p>
              <p className="text-gray-600 text-sm">{student.telefoon}</p>
            </div>

            {/* Strengths */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">💪 Sterke punten</h2>
              <ul className="space-y-2">
                {strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">📈 Verbeterpunten</h2>
              <ul className="space-y-2">
                {improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">⚡</span>
                    <span className="text-sm">{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Score History */}
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">📊 Scoregeschiedenis</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Periode</th>
                    <th className="px-4 py-3 text-left font-semibold">Rekenen</th>
                    <th className="px-4 py-3 text-left font-semibold">Taal</th>
                    <th className="px-4 py-3 text-left font-semibold">Lezen</th>
                    <th className="px-4 py-3 text-left font-semibold">Gemiddelde</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{score.periode}</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {score.rekenen}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {score.taal}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                          {score.lezen}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {score.gemiddelde.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📝 Notities</h2>
            <p className="text-gray-700">{student.noten}</p>
          </div>
        </div>
      </main>
    </>
  )
}
