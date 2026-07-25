import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { authService } from '@/lib/auth'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    const { user, token } = authService.login(email, password)
    setUser(user)
    return { user, token }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    router.push('/login')
  }

  const register = (data: any) => {
    const user = authService.register(data)
    return user
  }

  return { user, isLoading, login, logout, register, isAuthenticated: !!user }
}

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
