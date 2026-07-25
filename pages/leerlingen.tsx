import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Leerlingen() {
  const [students] = useState([
    { id: 1, name: 'Emma de Vries', groep: '5A', rekenen: 82, taal: 78, lezen: 85 },
    { id: 2, name: 'Liam van den Berg', groep: '5A', rekenen: 75, taal: 80, lezen: 72 },
    { id: 3, name: 'Sofia García', groep: '5B', rekenen: 88, taal: 85, lezen: 90 },
    { id: 4, name: 'Noah Janssen', groep: '6A', rekenen: 70, taal: 65, lezen: 60 },
    { id: 5, name: 'Mila Peeters', groep: '6A', rekenen: 92, taal: 89, lezen: 88 },
    { id: 6, name: 'Lucas Müller', groep: '7A', rekenen: 79, taal: 75, lezen: 68 },
  ])

  return (
    <>
      <Head>
        <title>Leerlingen - EduLens</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              EduLens
            </Link>
            <ul className="flex gap-8">
              <li><Link href="/" className="text-gray-600 hover:text-blue-900">Dashboard</Link></li>
              <li><Link href="/leerlingen" className="text-blue-900 font-semibold">Leerlingen</Link></li>
              <li><Link href="/interventies" className="text-gray-600 hover:text-blue-900">Interventies</Link></li>
              <li><Link href="/rapportages" className="text-gray-600 hover:text-blue-900">Rapportages</Link></li>
            </ul>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-8 py-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">Leerlingenmonitor 📊</h1>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Naam</th>
                  <th className="px-6 py-4 text-left font-semibold">Groep</th>
                  <th className="px-6 py-4 text-left font-semibold">Rekenen</th>
                  <th className="px-6 py-4 text-left font-semibold">Taal</th>
                  <th className="px-6 py-4 text-left font-semibold">Lezen</th>
                  <th className="px-6 py-4 text-left font-semibold">Gemiddelde</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const avg = Math.round((student.rekenen + student.taal + student.lezen) / 3)
                  const avgColor = avg >= 80 ? 'text-green-600' : avg >= 70 ? 'text-blue-600' : 'text-orange-600'
                  
                  return (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.groep}</td>
                      <td className="px-6 py-4">{student.rekenen}</td>
                      <td className="px-6 py-4">{student.taal}</td>
                      <td className="px-6 py-4">{student.lezen}</td>
                      <td className={`px-6 py-4 font-semibold ${avgColor}`}>{avg}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
