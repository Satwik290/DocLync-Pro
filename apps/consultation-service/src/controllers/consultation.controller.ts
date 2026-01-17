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
    const result = await service.verifyAndConfirm(paymentIntentId);
    res.json({ message: "Payment verified successfully", ...result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};