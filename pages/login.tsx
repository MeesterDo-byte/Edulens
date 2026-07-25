import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

interface AuthFormData {
  email: string
  password: string
  errors: {
    email?: string
    password?: string
    submit?: string
  }
}

export default function Login() {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    errors: {},
  })

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    const errors: AuthFormData['errors'] = {}

    if (!formData.email) {
      errors.email = 'E-mailadres is verplicht'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ongeldig e-mailadres'
    }

    if (!formData.password) {
      errors.password = 'Wachtwoord is verplicht'
    } else if (formData.password.length < 6) {
      errors.password = 'Wachtwoord moet minimaal 6 karakters zijn'
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSuccess(true)
    setIsLoading(false)

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
      errors: { ...formData.errors, [name]: '' },
    })
  }

  if (success) {
    return (
      <>
        <Head>
          <title>Login Succesvol - EduLens</title>
        </Head>
        <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Welkom!</h2>
            <p className="text-gray-600">Je bent succesvol ingelogd. Je wordt omgeleid naar het dashboard...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Login - EduLens</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">EduLens</h1>
            <p className="text-gray-600 mt-1">AI-onderwijsdashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formData.errors.submit && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formData.errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formData.errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formData.errors.password && (
                <p className="text-red-600 text-sm mt-1">{formData.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm mb-2">Demo credentials:</p>
            <p className="text-gray-700 font-mono text-xs">test@school.nl / password123</p>
          </div>
        </div>
      </main>
    </>
  )
}
