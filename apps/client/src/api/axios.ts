import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL;
const CONSULTATION_BASE_URL = import.meta.env.VITE_CONSULTATION_API_URL;
const CHAT_BASE_URL = import.meta.env.VITE_CHAT_API_URL;const config = {
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
 * Using AxiosInstance type instead of typeof axios
 */
const addTokenInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      
      // Safety check: ensure token exists and isn't the placeholder string
      if (token && token !== 'cookie-based' && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
      console.error("❌ 403 Forbidden Details:", error.response.data);
      alert("❌ Access Forbidden: You don't have permission to access this resource.");
      }
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // Only redirect if not already on the login page to avoid loops
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    }
  )
}

// Apply interceptors to instances
addTokenInterceptor(authApi)
addTokenInterceptor(consultationApi)
addTokenInterceptor(chatApi)

export default { authApi, consultationApi, chatApi }