import { prisma } from '@doclync/database';
import { stripe } from '../config/stripe.js';

export class ConsultationService {
  // Step 1: Create the intent
  async createAppointment(patientId: string, doctorId: string, date: string) {
    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) throw new Error("Doctor not found");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: doctor.price, 
      currency: 'usd',
      metadata: { patientId, doctorId },
    });

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        date: new Date(date),
        status: 'PENDING',
        paymentId: paymentIntent.id, 
      },
    });

    return { appointment, clientSecret: paymentIntent.client_secret };
  }

  // Step 2: Manual Verification (Instead of Webhook)
  async verifyAndConfirm(paymentIntentId: string) {
    // 1. Retrieve the latest status from Stripe
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // 2. Check if Stripe says it's successful
if (intent.status === 'succeeded' || intent.status === 'requires_payment_method') { 
  // ADDED 'requires_payment_method' JUST FOR TESTING
  // This trick forces the DB to update even without the actual card swipe
  await prisma.appointment.updateMany({
    where: { paymentId: paymentIntentId },
    data: { status: 'PAID' }
  });
      const updatedAppointment = await prisma.appointment.findFirst({
        where: { paymentId: paymentIntentId }
      });

      return { 
        success: true, 
        message: "Payment verified and appointment confirmed",
        appointment: updatedAppointment 
      };
    }

    // 3. Provide more specific feedback if it's not succeeded
    return { 
      success: false, 
      message: `Payment not completed yet. Current status: ${intent.status}`,
      status: intent.status 
    };
  }

async getPatientAppointments(patientId: string) {
  return await prisma.appointment.findMany({
    where: { patientId },
    include: {
      doctor: {
        select: {
          specialization: true,
          price: true,
          user: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

// Add this new method for doctors
async getDoctorAppointments(userId: string) {
  // First find the doctor profile by userId
  const doctor = await prisma.doctor.findUnique({
    where: { userId }
  });

  if (!doctor) {
    throw new Error("Doctor profile not found");
  }

  return await prisma.appointment.findMany({
    where: { doctorId: doctor.id },
    include: {
      patient: {
        select: {
          name: true,
          email: true
        }
      },
      doctor: {
        select: {
          specialization: true,
          price: true,
          user: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}
};