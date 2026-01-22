// src/types/index.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN'
}

export interface Doctor {
  id: string
  userId: string
  specialization: string
  price: number
  bio?: string
  user: {
    name: string
    email: string
  }
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  status: 'PENDING' | 'PAID' | 'COMPLETED' | 'CANCELLED'
  paymentId?: string
  prescriptionUrl?: string
  diagnosis?: string
  createdAt: string
  doctor?: {
    specialization: string
    price: number
    user: {
      name: string
    }
  }
}

export interface Message {
  id: string
  appointmentId: string
  senderId: string
  content: string
  createdAt: string
  sender: {
    name: string
    role: string
  }
}

export interface ChatListItem {
  appointmentId: string
  chatPartner: string
  lastMessage: string
  timestamp: string
}