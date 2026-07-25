import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { authService } from '@/lib/auth'

interface RegisterFormData {
  schoolNaam: string
  voornaam: string
  achternaam: string
  email: string
  password: string
  passwordBevestiging: string
  rol: 'directeur' | 'leraar' | 'leerkracht'
  telefoon: string
  schoolPlaats: string
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
    rol: 'leraar',
    telefoon: '',
    schoolPlaats: '',
    akkoord: false,
    errors: {},
  })

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.schoolNaam) errors.schoolNaam = 'Schoolnaam is verplicht'
    if (!formData.voornaam) errors.voornaam = 'Voornaam is verplicht'
    if (!formData.achternaam) errors.achternaam = 'Achternaam is verplicht'
    if (!formData.email) errors.email = 'E-mailadres is verplicht'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = 'Ongeldig e-mailadres'
    if (!formData.password) errors.password = 'Wachtwoord is verplicht'
    if (formData.password.length < 8)
      errors.password = 'Wachtwoord moet minimaal 8 karakters zijn'
    if (formData.password !== formData.passwordBevestiging)
      errors.passwordBevestiging = 'Wachtwoorden komen niet overeen'
    if (!formData.telefoon) errors.telefoon = 'Telefoonnummer is verplicht'
    if (!formData.schoolPlaats) errors.schoolPlaats = 'Plaats is verplicht'
    if (!formData.akkoord)
      errors.akkoord = 'Je moet akkoord gaan met de voorwaarden'

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
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      authService.register({
        schoolNaam: formData.schoolNaam,
        voornaam: formData.voornaam,
        achternaam: formData.achternaam,
        email: formData.email,
        password: formData.password,
        rol: formData.rol,
        school_id: `school_${Date.now()}`,
      })
      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error: any) {
      setFormData({
        ...formData,
        errors: { submit: error.message },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
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
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Welkom aan boord!</h2>
            <p className="text-gray-600 mb-4">
              Je account is aangemaakt. Je wordt omgeleid naar inloggen...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto"></div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Registreer - EduLens</title>
        <meta name="description" content="Maak een account aan op EduLens" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-4 py-8">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white bg-opacity-10 backdrop-blur-md rounded-full p-3 mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">EduLens</h1>
            <p className="text-blue-100">Maak je schoolaccount aan</p>
          </div>

          {/* Registration Card */}
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {formData.errors.submit && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-sm">
                  {formData.errors.submit}
                </div>
              )}

              {/* School Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏫 Schoolgegevens</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Schoolnaam *
                    </label>
                    <input
                      type="text"
                      name="schoolNaam"
                      value={formData.schoolNaam}
                      onChange={handleChange}
                      placeholder="Basisschool De Horizon"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formData.errors.schoolNaam
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    />
                    {formData.errors.schoolNaam && (
                      <p className="text-red-600 text-sm mt-1">{formData.errors.schoolNaam}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Plaats *
                      </label>
                      <input
                        type="text"
                        name="schoolPlaats"
                        value={formData.schoolPlaats}
                        onChange={handleChange}
                        placeholder="Amsterdam"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                          formData.errors.schoolPlaats
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 bg-gray-50'
                        }`}
                      />
                      {formData.errors.schoolPlaats && (
                        <p className="text-red-600 text-sm mt-1">{formData.errors.schoolPlaats}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rol *
                      </label>
                      <select
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      >
                        <option value="leraar">Leraar</option>
                        <option value="leerkracht">Leerkracht</option>
                        <option value="directeur">Directeur</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Persoonlijke gegevens</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Voornaam *
                      </label>
                      <input
                        type="text"
                        name="voornaam"
                        value={formData.voornaam}
                        onChange={handleChange}
                        placeholder="Marieke"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                          formData.errors.voornaam
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 bg-gray-50'
                        }`}
                      />
                      {formData.errors.voornaam && (
                        <p className="text-red-600 text-sm mt-1">{formData.errors.voornaam}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Achternaam *
                      </label>
                      <input
                        type="text"
                        name="achternaam"
                        value={formData.achternaam}
                        onChange={handleChange}
                        placeholder="Jansen"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                          formData.errors.achternaam
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 bg-gray-50'
                        }`}
                      />
                      {formData.errors.achternaam && (
                        <p className="text-red-600 text-sm mt-1">{formData.errors.achternaam}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="marieke@school.nl"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formData.errors.email
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    />
                    {formData.errors.email && (
                      <p className="text-red-600 text-sm mt-1">{formData.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefoonnummer *
                    </label>
                    <input
                      type="tel"
                      name="telefoon"
                      value={formData.telefoon}
                      onChange={handleChange}
                      placeholder="06-12345678"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formData.errors.telefoon
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    />
                    {formData.errors.telefoon && (
                      <p className="text-red-600 text-sm mt-1">{formData.errors.telefoon}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Security */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔐 Beveiliging</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Wachtwoord *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimaal 8 karakters"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formData.errors.password
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    />
                    {formData.errors.password && (
                      <p className="text-red-600 text-sm mt-1">{formData.errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Wachtwoord bevestigen *
                    </label>
                    <input
                      type="password"
                      name="passwordBevestiging"
                      value={formData.passwordBevestiging}
                      onChange={handleChange}
                      placeholder="Herhaal je wachtwoord"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formData.errors.passwordBevestiging
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    />
                    {formData.errors.passwordBevestiging && (
                      <p className="text-red-600 text-sm mt-1">{formData.errors.passwordBevestiging}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="akkoord"
                    checked={formData.akkoord}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label className="text-sm text-gray-600 cursor-pointer">
                    Ik ga akkoord met de{' '}
                    <a href="#" className="text-blue-600 hover:underline font-semibold">
                      privacyverklaring
                    </a>{' '}
                    en{' '}
                    <a href="#" className="text-blue-600 hover:underline font-semibold">
                      gebruiksvoorwaarden
                    </a>
                  </label>
                </div>
                {formData.errors.akkoord && (
                  <p className="text-red-600 text-sm">{formData.errors.akkoord}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {isLoading ? 'Account aanmaken...' : 'Account aanmaken'}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Al een account?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-blue-100 text-sm">
            <p>&copy; 2024 EduLens. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </main>
    </>
  )
}
