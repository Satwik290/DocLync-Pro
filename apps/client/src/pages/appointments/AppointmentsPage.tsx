import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useBooking } from '@/hooks/useBooking'
import { authApi } from '@/api/axios'
import type { Appointment, Doctor } from '@/types'
import { Calendar, DollarSign, User } from 'lucide-react'
import { format } from 'date-fns'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [showBooking, setShowBooking] = useState(false)
  const { getMyAppointments, loading } = useBooking()

  useEffect(() => {
    loadAppointments()
    loadDoctors()
  }, [])

  const loadAppointments = async () => {
    try {
      const data = await getMyAppointments()
      setAppointments(data)
    } catch (err) {
      console.error('Failed to load appointments:', err)
    }
  }

  const loadDoctors = async () => {
    try {
      const { data } = await authApi.get('/doctors')
      setDoctors(data)
    } catch (err) {
      console.error('Failed to load doctors:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'PAID':
        return 'bg-green-100 text-green-800'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Manage your consultations</p>
        </div>
        <Button onClick={() => setShowBooking(!showBooking)}>
          {showBooking ? 'View My Appointments' : 'Book New Appointment'}
        </Button>
      </div>

      {showBooking ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {doctor.user.name}
                </CardTitle>
                <CardDescription>{doctor.specialization}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <DollarSign className="h-4 w-4" />
                  <span>${(doctor.price / 100).toFixed(2)}</span>
                </div>
                {doctor.bio && <p className="text-sm text-muted-foreground mb-4">{doctor.bio}</p>}
                <Button className="w-full">Book Consultation</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : appointments.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                No appointments yet. Book your first consultation!
              </CardContent>
            </Card>
          ) : (
            appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Dr. {appointment.doctor?.user.name}
                      </CardTitle>
                      <CardDescription>
                        {appointment.doctor?.specialization}
                      </CardDescription>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{format(new Date(appointment.date), 'PPP')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${(appointment.doctor?.price || 0) / 100}</span>
                    </div>
                  </div>
                  {appointment.diagnosis && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-sm font-semibold">Diagnosis:</p>
                      <p className="text-sm text-muted-foreground">{appointment.diagnosis}</p>
                    </div>
                  )}
                  {appointment.prescriptionUrl && (
                    <Button variant="outline" className="mt-3" asChild>
                      <a href={appointment.prescriptionUrl} target="_blank" rel="noopener noreferrer">
                        View Prescription
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}