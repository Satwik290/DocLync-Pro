import type { Request, Response } from 'express';
import { DoctorService } from '../services/doctor.service.js';

const doctorService = new DoctorService();

export const updateDoctorProfile = async (req: Request, res: Response) => {
  try {
    // Check if user exists and get the 'id' (from the JWT payload)
    const userIdFromToken = req.user?.id; 

    if (!userIdFromToken) {
      return res.status(401).json({ message: "User ID not found in token" });
    }

    // const doctorService = new DoctorService();
    const profile = await doctorService.updateProfile(userIdFromToken, req.body);
    
    res.status(200).json({
      message: "Profile updated successfully",
      profile
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    res.status(500).json({ message });
  }
};

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const { specialization } = req.query;
    const doctors = await doctorService.getAllDoctors({ 
      specialization: specialization as string 
    });
    
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
};