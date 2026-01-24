import type { Request, Response } from 'express';
import { ConsultationService } from '../services/consultation.service.js';

const service = new ConsultationService();

export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const { doctorId, date } = req.body;
    // req.user comes from the authenticateJWT middleware
    const result = await service.createAppointment(req.user!.id, doctorId, date);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: "Missing paymentIntentId" });
    }

    const result = await service.verifyAndConfirm(paymentIntentId);
    
    // Just return the result. It already contains the success status and message.
    res.json(result); 
  } catch (error: any) {
    // If the service threw "Payment not completed", it lands here
    res.status(400).json({ error: error.message });
  }
};

// export const getMyAppointments = async (req: Request, res: Response) => {
//   try {
//     // patientId comes from your authenticateJWT middleware
//     const patientId = (req as any).user.id; 
    
//     const appointments = await service.getPatientAppointments(patientId);
//     res.json(appointments);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getMyAppointments = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;
    
    let appointments;
    
    if (userRole === 'DOCTOR') {
      appointments = await service.getDoctorAppointments(userId);
    } else {
      appointments = await service.getPatientAppointments(userId);
    }
    
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};