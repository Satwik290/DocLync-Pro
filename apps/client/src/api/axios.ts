// src/api/axios.ts - Complete with Better Error Handling
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:4001/api/auth'
const CONSULTATION_BASE_URL = import.meta.env.VITE_CONSULTATION_API_URL || 'http://localhost:4002/api/consultation'
const CHAT_BASE_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:4003/api/chat'

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const authApi = axios.create({ ...config, baseURL: AUTH_BASE_URL })
export const consultationApi = axios.create({ ...config, baseURL: CONSULTATION_BASE_URL })
export const chatApi = axios.create({ ...config, baseURL: CHAT_BASE_URL })

/**
 * JWT Interceptor for all APIs
 */
const addTokenInterceptor = (api: AxiosInstance) => {
  // Request interceptor
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token')
      
      // Add token to headers if it exists and isn't the placeholder
      if (token && token !== 'cookie-based' && token !== 'cookie-based-auth' && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      console.log(`📡 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
      return config
    },
    (error) => {
      console.error('❌ Request error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      console.log(`✅ Response from ${response.config.url}:`, response.status)
      return response
    },
    (error) => {
      const status = error.response?.status
      const url = error.config?.url
      
      console.error(`❌ API Error [${status}] ${url}:`, error.response?.data)
      
      if (status === 401) {
        console.warn('🔒 Unauthorized - Clearing auth and redirecting to login')
        localStorage.removeItem('token')
        localStorage.removeItem('user-storage')
        
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
      
      if (status === 403) {
        console.error('🚫 Forbidden - Access denied')
        alert('❌ Access Forbidden: You don\'t have permission to access this resource.')
      }
      
      return Promise.reject(error)
    }
  )
}

// Apply interceptors
addTokenInterceptor(authApi)
addTokenInterceptor(consultationApi)
addTokenInterceptor(chatApi)

export default { authApi, consultationApi, chatApi }
