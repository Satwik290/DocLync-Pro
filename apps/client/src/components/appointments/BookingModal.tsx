import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBooking } from '@/hooks/useBooking'
import type { Doctor } from '@/types'
import { DollarSign } from 'lucide-react'

interface BookingModalProps {
  doctor: Doctor
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function BookingModal({ doctor, open, onClose, onSuccess }: BookingModalProps) {
  const [date, setDate] = useState('')
  const [paymentStep, setPaymentStep] = useState<'booking' | 'payment'>('booking')
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const { bookAppointment, verifyPayment, loading, error } = useBooking()

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date) {
      alert('Please select a date and time')
      return
    }

    try {
      const result = await bookAppointment(doctor.id, date)
      setPaymentIntentId(result.appointment.paymentId)
      setPaymentStep('payment')
    } catch (err) {
      console.error('Booking failed:', err)
    }
  }

  const handlePaymentVerification = async () => {
    if (!paymentIntentId) return

    try {
      const result = await verifyPayment(paymentIntentId)
      if (result.success) {
        alert('✅ Appointment booked successfully!')
        onSuccess()
        onClose()
        resetModal()
      } else {
        alert(`Payment status: ${result.status}. Please try again.`)
      }
    } catch (err) {
      console.error('Payment verification failed:', err)
    }
  }

  const resetModal = () => {
    setDate('')
    setPaymentStep('booking')
    setPaymentIntentId(null)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {paymentStep === 'booking' ? 'Book Appointment' : 'Payment Confirmation'}
          </DialogTitle>
          <DialogDescription>
            {paymentStep === 'booking' 
              ? `Schedule a consultation with Dr. ${doctor.user.name}`
              : 'Confirm your payment to complete the booking'
            }
          </DialogDescription>
        </DialogHeader>

        {paymentStep === 'booking' ? (
          <form onSubmit={handleBooking} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>Consultation Fee: ${(doctor.price / 100).toFixed(2)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Specialization: {doctor.specialization}
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="date">Select Date & Time</Label>
              <Input
                id="date"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <p className="text-sm">
                <strong>Doctor:</strong> Dr. {doctor.user.name}
              </p>
              <p className="text-sm">
                <strong>Amount:</strong> ${(doctor.price / 100).toFixed(2)}
              </p>
              <p className="text-sm">
                <strong>Payment ID:</strong> {paymentIntentId}
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                💳 <strong>Test Mode:</strong> In development, payments are simulated. 
                Click "Confirm Payment" to proceed with the booking.
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setPaymentStep('booking')} 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handlePaymentVerification} 
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Verifying...' : 'Confirm Payment'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

