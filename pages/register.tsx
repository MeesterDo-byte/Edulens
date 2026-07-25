import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

interface RegisterFormData {
  schoolNaam: string
  voornaam: string
  achternaam: string
  email: string
  password: string
  passwordBevestiging: string
  akkoord: boolean
  errors: Record<string, string>
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    schoolNaam: '',
    voornaam: '',
    achternaam: '',
    email: '',
    password: '',
    passwordBevestiging: '',
    akkoord: false,
    errors: {},
  })

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.schoolNaam) errors.schoolNaam = 'Schoolnaam is verplicht'
    if (!formData.voornaam) errors.voornaam = 'Voornaam is verplicht'
    if (!formData.achternaam) errors.achternaam = 'Achternaam is verplicht'
    if (!formData.email) errors.email = 'E-mailadres is verplicht'
    if (!formData.password) errors.password = 'Wachtwoord is verplicht'
    if (formData.password !== formData.passwordBevestiging)
      errors.passwordBevestiging = 'Wachtwoorden komen niet overeen'
    if (!formData.akkoord) errors.akkoord = 'Je moet akkoord gaan met de voorwaarden'

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFormData({ ...formData, errors })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSuccess(true)
    setIsLoading(false)

    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
      errors: { ...formData.errors, [name]: '' },
    })
  }

  if (success) {
    return (
      <>
        <Head>
          <title>Registratie Succesvol - EduLens</title>
        </Head>
        <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Welkom aan boord!</h2>
            <p className="text-gray-600">Je account is aangemaakt. Je wordt omgeleid naar inloggen...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Registreer - EduLens</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">EduLens</h1>
            <p className="text-blue-100 mt-1">Maak een account aan</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Schoolnaam
              </label>
              <input
                type="text"
                name="schoolNaam"
                value={formData.schoolNaam}
                onChange={handleChange}
                placeholder="Basisschool De Horizon"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.errors.schoolNaam && (
                <p className="text-red-600 text-sm mt-1">{formData.errors.schoolNaam}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Voornaam
                </label>
                <input
                  type="text"
                  name="voornaam"
                  value={formData.voornaam}
                  onChange={handleChange}
                  placeholder="Marieke"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.errors.voornaam && (
                  <p className="text-red-600 text-sm mt-1">{formData.errors.voornaam}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Achternaam
                </label>
                <input
                  type="text"
                  name="achternaam"
                  value={formData.achternaam}
                  onChange={handleChange}
                  placeholder="Jansen"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.errors.achternaam && (
                  <p className="text-red-600 text-sm mt-1">{formData.errors.achternaam}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-mailadres
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="je@school.nl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.errors.email && (
                <p className="text-red-600 text-sm mt-1">{formData.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Wachtwoord
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.errors.password && (
                <p className="text-red-600 text-sm mt-1">{formData.errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Wachtwoord bevestigen
              </label>
              <input
                type="password"
                name="passwordBevestiging"
                value={formData.passwordBevestiging}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.errors.passwordBevestiging && (
                <p className="text-red-600 text-sm mt-1">{formData.errors.passwordBevestiging}</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="akkoord"
                checked={formData.akkoord}
                onChange={handleChange}
                className="mt-1 w-4 h-4"
              />
              <label className="text-sm text-gray-600">
                Ik ga akkoord met de <a href="#" className="text-blue-700 hover:underline">privacyverklaring</a> en <a href="#" className="text-blue-700 hover:underline">gebruiksvoorwaarden</a>
              </label>
            </div>
            {formData.errors.akkoord && (
              <p className="text-red-600 text-sm">{formData.errors.akkoord}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Account aanmaken...' : 'Account aanmaken'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-blue-100">
              Al een account?{' '}
              <Link href="/login" className="text-white font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
