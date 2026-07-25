import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { authService } from '@/lib/auth'

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
  errors: Record<string, string>
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
    errors: {},
  })

  const [isLoading, setIsLoading] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.email) {
      errors.email = 'E-mailadres is verplicht'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ongeldig e-mailadres'
    }

    if (!formData.password) {
      errors.password = 'Wachtwoord is verplicht'
    }

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
      await new Promise((resolve) => setTimeout(resolve, 1000))
      authService.login(formData.email, formData.password)
      router.push('/')
    } catch (error: any) {
      setFormData({
        ...formData,
        errors: { submit: error.message },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setFormData({ ...formData, email: 'marieke@horizonschool.nl', password: 'wachtwoord123' })
    setDemoMode(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
      errors: { ...formData.errors, [name]: '' },
    })
  }

  return (
    <>
      <Head>
        <title>Inloggen - EduLens</title>
        <meta name="description" content="Log in op EduLens dashboard" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white bg-opacity-10 backdrop-blur-md rounded-full p-3 mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">EduLens</h1>
            <p className="text-blue-100">AI-onderwijsdashboard voor basisscholen</p>
          </div>

          {/* Login Card */}
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Welkom terug 👋</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formData.errors.submit && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-sm">
                  {formData.errors.submit}
                </div>
              )}

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
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    formData.errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}
                />
                {formData.errors.email && (
                  <p className="text-red-600 text-sm mt-1">{formData.errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Wachtwoord
                  </label>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Vergeten?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    formData.errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}
                />
                {formData.errors.password && (
                  <p className="text-red-600 text-sm mt-1">{formData.errors.password}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-600">Onthoud mij</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? 'Inloggen...' : 'Inloggen'}
              </button>
            </form>

            {/* Demo Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-3">Demo-account gebruiken?</p>
              <button
                onClick={handleDemoLogin}
                type="button"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition border border-gray-300"
              >
                📋 Demo Inloggen
              </button>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-gray-600">
                <p className="font-semibold text-blue-900 mb-1">Demo Credentials:</p>
                <p>Email: <span className="font-mono">marieke@horizonschool.nl</span></p>
                <p>Wachtwoord: <span className="font-mono">wachtwoord123</span></p>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Nog geen account?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Registreer hier
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
