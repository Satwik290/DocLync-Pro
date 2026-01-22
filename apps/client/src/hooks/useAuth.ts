// src/hooks/useAuth.ts
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/axios'
import { useUserStore } from '../store/useUserStore'
import type { User } from '../types/index'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setUser, setToken, logout: storeLogout } = useUserStore()
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await authApi.post('/login', { email, password })
      setUser(data.user)
      setToken(data.token || 'cookie-based')
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
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
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed')
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

