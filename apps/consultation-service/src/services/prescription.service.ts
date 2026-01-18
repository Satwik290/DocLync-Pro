import { prisma } from '@doclync/database';

export class PrescriptionService {
  async issuePrescription(appointmentId: string, loggedInUserId: string, fileUrl: string, diagnosis: string) {
    
    // 1. Fetch the appointment and include the doctor's user information
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        doctor: true // This allows us to access the doctor's userId
      }
    });

    console.log("--- Corrected Prescription Debug ---");
    console.log("Logged in User ID (from Token):", loggedInUserId);
    console.log("Appointment belongs to Doctor Profile ID:", appointment?.doctorId);
    console.log("That Doctor Profile belongs to User ID:", appointment?.doctor?.userId);

    // 2. Verification Logic
    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    // Verify: Does the userId of the doctor assigned to this appointment 
    // match the userId from the JWT token?
    if (appointment.doctor.userId !== loggedInUserId) {
      throw new Error("Unauthorized: You are not the doctor assigned to this patient.");
    }

    if (appointment.status !== 'PAID') {
      throw new Error("Cannot issue prescription unless appointment status is PAID.");
    }

    // 3. Update the record
    return await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        prescriptionUrl: fileUrl,
        diagnosis: diagnosis,
        status: 'COMPLETED'
      }
    });
  }
}