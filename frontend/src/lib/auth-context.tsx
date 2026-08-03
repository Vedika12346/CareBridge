'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export type UserRole = 'PARENT' | 'CAREGIVER' | 'ADMIN'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  centerId?: string
  profileImageUrl?: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegistrationData) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
}

interface RegistrationData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Restore session from localStorage on mount
    const storedUser = localStorage.getItem('carebridge_user')
    const accessToken = localStorage.getItem('carebridge_access_token')
    
    if (storedUser && accessToken) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to restore session:', error)
        localStorage.removeItem('carebridge_user')
        localStorage.removeItem('carebridge_access_token')
        localStorage.removeItem('carebridge_refresh_token')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }
      
      const data = await response.json()
      localStorage.setItem('carebridge_access_token', data.accessToken)
      localStorage.setItem('carebridge_refresh_token', data.refreshToken)
      localStorage.setItem('carebridge_user', JSON.stringify(data.user))
      
      setUser(data.user)
      
      // Redirect based on role
      const dashboardUrl = `/dashboard/${data.user.role.toLowerCase()}`
      router.push(dashboardUrl)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegistrationData) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      
      const result = await response.json()
      localStorage.setItem('carebridge_access_token', result.accessToken)
      localStorage.setItem('carebridge_refresh_token', result.refreshToken)
      localStorage.setItem('carebridge_user', JSON.stringify(result.user))
      
      setUser(result.user)
      
      const dashboardUrl = `/dashboard/${data.role.toLowerCase()}`
      router.push(dashboardUrl)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('carebridge_access_token')
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('carebridge_user')
      localStorage.removeItem('carebridge_access_token')
      localStorage.removeItem('carebridge_refresh_token')
      setUser(null)
      router.push('/')
    }
  }

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('carebridge_refresh_token')
      if (!refreshToken) throw new Error('No refresh token')
      
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
      
      if (!response.ok) {
        throw new Error('Token refresh failed')
      }
      
      const data = await response.json()
      localStorage.setItem('carebridge_access_token', data.accessToken)
    } catch (error) {
      console.error('Token refresh error:', error)
      await logout()
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
