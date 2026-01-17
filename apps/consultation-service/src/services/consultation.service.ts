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
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (intent.status === 'succeeded') {
      await prisma.appointment.updateMany({
        where: { paymentId: paymentIntentId },
        data: { status: 'PAID' }
      });
      return { success: true };
    }
    throw new Error("Payment not completed");
  }
}