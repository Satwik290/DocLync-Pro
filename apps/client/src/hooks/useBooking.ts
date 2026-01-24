import { useState, useCallback } from 'react'
import { consultationApi } from '@/api/axios'
import type { Appointment } from '@/types'
import { AxiosError } from 'axios'

interface ApiError {
  message?: string
  error?: string
}

export const useBooking = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bookAppointment = useCallback(async (doctorId: string, date: string) => {
    setLoading(true)
    setError(null)
    try {
      console.log('📅 Booking appointment:', { doctorId, date })
      const { data } = await consultationApi.post('/book', { doctorId, date })
      console.log('✅ Booking response:', data)
      return data
    } catch (err) {
      console.error('❌ Booking error:', err)
      const axiosError = err as AxiosError<ApiError>
      const errorMsg = axiosError.response?.data?.error || 
                      axiosError.response?.data?.message || 
                      'Booking failed'
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }, [])

  const verifyPayment = useCallback(async (paymentIntentId: string) => {
    setLoading(true)
    setError(null)
    try {
      console.log('💳 Verifying payment:', paymentIntentId)
      const { data } = await consultationApi.post('/verify', { paymentIntentId })
      console.log('✅ Payment verification response:', data)
      return data
    } catch (err) {
      console.error('❌ Payment verification error:', err)
      const axiosError = err as AxiosError<ApiError>
      const errorMsg = axiosError.response?.data?.error || 
                      axiosError.response?.data?.message || 
                      'Payment verification failed'
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }, [])

  const getMyAppointments = useCallback(async (): Promise<Appointment[]> => {
    setLoading(true)
    setError(null)
    try {
      console.log('📋 Fetching appointments...')
      const { data } = await consultationApi.get('/my-appointments')
      console.log('✅ Appointments fetched:', data)
      return data
    } catch (err) {
      console.error('❌ Fetch appointments error:', err)
      const axiosError = err as AxiosError<ApiError>
      const errorMsg = axiosError.response?.data?.error || 
                      axiosError.response?.data?.message || 
                      'Failed to fetch appointments'
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }, [])

  return { bookAppointment, verifyPayment, getMyAppointments, loading, error }
}
