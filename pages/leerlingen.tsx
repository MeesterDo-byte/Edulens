import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { authService } from '@/lib/auth'
import { studentService } from '@/lib/students'

export default function Leerlingen() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    naam: '',
    groep: '',
    geboortedatum: '',
    ouders: '',
    email: '',
    telefoon: '',
  })

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    const schoolStudents = studentService.getStudents(currentUser.school_id)
    setStudents(schoolStudents)
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const newStudent = studentService.addStudent({
        ...formData,
        school_id: user.school_id,
      })
      setStudents([...students, newStudent])
      setShowModal(false)
      setFormData({ naam: '', groep: '', geboortedatum: '', ouders: '', email: '', telefoon: '' })
    }
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
        <title>Leerlingen - EduLens</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900 flex items-center gap-3">
              <span>📚</span> EduLens
            </Link>
            <ul className="flex gap-8">
              <li><Link href="/" className="text-gray-600 hover:text-blue-900">Dashboard</Link></li>
              <li><Link href="/leerlingen" className="text-blue-900 font-semibold">Leerlingen</Link></li>
              <li><Link href="/interventies" className="text-gray-600 hover:text-blue-900">Interventies</Link></li>
              <li><Link href="/analyses" className="text-gray-600 hover:text-blue-900">Analyses</Link></li>
              <li><Link href="/rapportages" className="text-gray-600 hover:text-blue-900">Rapportages</Link></li>
            </ul>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm font-semibold"
            >
              Uitloggen
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Leerlingenmonitor 📚</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
            >
              + Leerling toevoegen
            </button>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            {students.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600 text-lg">Geen leerlingen toegevoegd</p>
                <p className="text-gray-500 text-sm mt-2">Voeg je eerste leerling toe om te beginnen</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Naam</th>
                    <th className="px-6 py-4 text-left font-semibold">Groep</th>
                    <th className="px-6 py-4 text-left font-semibold">Geboortedatum</th>
                    <th className="px-6 py-4 text-left font-semibold">E-mail</th>
                    <th className="px-6 py-4 text-left font-semibold">Actie</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{student.naam}</td>
                      <td className="px-6 py-4">{student.groep}</td>
                      <td className="px-6 py-4">{student.geboortedatum}</td>
                      <td className="px-6 py-4">{student.email}</td>
                      <td className="px-6 py-4">
                        <Link href={`/leerling/${student.id}`} className="text-blue-700 hover:text-blue-900 font-semibold">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Nieuwe Leerling Toevoegen</h3>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <input
                type="text"
                placeholder="Naam"
                value={formData.naam}
                onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Groep (bijv. 5A)"
                value={formData.groep}
                onChange={(e) => setFormData({ ...formData, groep: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Geboortedatum"
                value={formData.geboortedatum}
                onChange={(e) => setFormData({ ...formData, geboortedatum: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Telefoonnummer"
                value={formData.telefoon}
                onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Ouders"
                value={formData.ouders}
                onChange={(e) => setFormData({ ...formData, ouders: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Toevoegen
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Annuleren
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
