import Cookies from 'js-cookie'

const USERS_KEY = 'edulens_users'
const AUTH_TOKEN_KEY = 'edulens_auth_token'
const CURRENT_USER_KEY = 'edulens_current_user'

interface User {
  id: string
  schoolNaam: string
  voornaam: string
  achternaam: string
  email: string
  password: string
  rol: 'directeur' | 'leraar' | 'leerkracht'
  school_id: string
  created_at: string
  last_login: string
}

export const authService = {
  // Register new user
  register: (userData: Omit<User, 'id' | 'created_at' | 'last_login'>) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    
    // Check if email already exists
    if (users.some((u: User) => u.email === userData.email)) {
      throw new Error('E-mailadres is al in gebruik')
    }

    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    return newUser
  },

  // Login user
  login: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const user = users.find((u: User) => u.email === email && u.password === password)

    if (!user) {
      throw new Error('E-mailadres of wachtwoord is onjuist')
    }

    // Update last login
    user.last_login = new Date().toISOString()
    localStorage.setItem(USERS_KEY, JSON.stringify(users))

    // Set auth token and current user
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    Cookies.set(AUTH_TOKEN_KEY, token, { expires: 7 })
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))

    return { user, token }
  },

  // Logout user
  logout: () => {
    Cookies.remove(AUTH_TOKEN_KEY)
    localStorage.removeItem(CURRENT_USER_KEY)
  },

  // Get current user
  getCurrentUser: (): User | null => {
    try {
      const user = localStorage.getItem(CURRENT_USER_KEY)
      return user ? JSON.parse(user) : null
    } catch {
      return null
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!Cookies.get(AUTH_TOKEN_KEY) && !!authService.getCurrentUser()
  },

  // Get all users
  getAllUsers: () => {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  },

  // Update user profile
  updateUserProfile: (userId: string, updates: Partial<User>) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const userIndex = users.findIndex((u: User) => u.id === userId)

    if (userIndex === -1) {
      throw new Error('Gebruiker niet gevonden')
    }

    users[userIndex] = { ...users[userIndex], ...updates }
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]))

    return users[userIndex]
  },
}
