import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/api/axios'
import { useUserStore } from '@/store/useUserStore'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setUser, setToken, logout: storeLogout } = useUserStore()
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      console.log('🔐 Logging in:', email)
      const { data } = await authApi.post('/login', { email, password })
      console.log('✅ Login response:', data)
      
      if (!data.user) {
        throw new Error('No user data received')
      }
      
      // Set token first
      const token = data.token || 'cookie-based-auth'
      setToken(token)
      
      // Then set user  
      setUser(data.user)
      
      // Wait for Zustand to persist
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Verify it's saved
      const stored = localStorage.getItem('user-storage')
      console.log('💾 Storage check:', stored ? 'SAVED' : 'MISSING')
      
      navigate('/dashboard')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      console.error('❌ Login error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, role: string) => {
    setLoading(true)
    setError(null)
    try {
      await authApi.post('/signup', { name, email, password, role })
      await login(email, password)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authApi.post('/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      storeLogout()
      navigate('/login')
    }
  }

  return { login, signup, logout, loading, error }
}