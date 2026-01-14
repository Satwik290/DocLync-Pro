import type { Request, Response } from 'express';
import type { signupSchema } from '@doclync/common';
import { AuthService } from '../services/auth.service.js';
import { generateToken } from '../utils/jwt.js';

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    // This is the most important part for a learning experience:
    console.error("DATABASE_ERROR_LOG:", err); 
    
    // Check if it's a Prisma unique constraint error (P2002)
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "Email already taken" });
    }

    // If it's not P2002, return the actual error details
    res.status(500).json({ 
      error: "Internal Server Error", 
      details: err.message 
    });
  }
};