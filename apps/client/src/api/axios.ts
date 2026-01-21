// src/api/axios.ts
import axios from 'axios'

const AUTH_BASE_URL = 'http://localhost:4001/api/auth'
const CONSULTATION_BASE_URL = 'http://localhost:4002/api/consultation'
const CHAT_BASE_URL = 'http://localhost:4003/api/chat'

export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const consultationApi = axios.create({
  baseURL: CONSULTATION_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const chatApi = axios.create({
  baseURL: CHAT_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// JWT Interceptor for all APIs
const addTokenInterceptor = (api: typeof axios) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
}

addTokenInterceptor(authApi)
addTokenInterceptor(consultationApi)
addTokenInterceptor(chatApi)

export default { authApi, consultationApi, chatApi }    