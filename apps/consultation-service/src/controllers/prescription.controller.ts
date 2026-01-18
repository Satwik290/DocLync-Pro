import type { Request, Response } from 'express';
import { PrescriptionService } from '../services/prescription.service.js';

const prescriptionService = new PrescriptionService();

export class PrescriptionController {
  async upload(req: Request, res: Response) {
    try {
      const user = (req as any).user; // Injected by authenticateJWT
      const { appointmentId, diagnosis } = req.body;
      const file = req.file; // Injected by Multer

      // 1. Validation: Ensure user is a doctor
      if (user.role !== 'DOCTOR') {
        return res.status(403).json({ error: "Only doctors can issue prescriptions." });
      }

      // 2. Validation: Ensure file exists
      if (!file) {
        return res.status(400).json({ error: "No prescription file uploaded." });
      }

      // 3. Validation: Ensure required fields are present
      if (!appointmentId || !diagnosis) {
        return res.status(400).json({ error: "Missing appointmentId or diagnosis." });
      }

      // 4. Service Call: Process the upload and update DB
      // Note: 'file.path' is the Cloudinary URL provided by the storage engine
      const updatedAppointment = await prescriptionService.issuePrescription(
        appointmentId,
        user.id,
        file.path, 
        diagnosis
      );

      res.status(200).json({
        success: true,
        message: "Prescription issued and appointment completed.",
        data: updatedAppointment
      });

    } catch (error: any) {
      console.error("Prescription Upload Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }
}