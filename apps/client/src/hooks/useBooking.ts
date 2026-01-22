// src/hooks/useBooking.ts
import { useState } from 'react'
import { consultationApi } from '../api/axios'
import type { Appointment } from '../types/index'

export const useBooking = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bookAppointment = async (doctorId: string, date: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await consultationApi.post('/book', { doctorId, date })
      return data
    } catch (err: any) {
      setError(err.response?.data?.error || 'Booking failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const verifyPayment = async (paymentIntentId: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await consultationApi.post('/verify', { paymentIntentId })
      return data
    } catch (err: any) {
      setError(err.response?.data?.error || 'Payment verification failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getMyAppointments = async (): Promise<Appointment[]> => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await consultationApi.get('/my-appointments')
      return data
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch appointments')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { bookAppointment, verifyPayment, getMyAppointments, loading, error }
}