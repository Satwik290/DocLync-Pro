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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const authService = new AuthService();
    const { user, token } = await authService.login(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // CRITICAL: Must return user object
    res.status(200).json({
      message: 'Login successful',
      user  // ← Make sure this is here!
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(401).json({ message });
  }
};

export const logout = async (req:Request, res:Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Logout failed';
    res.status(500).json({ message });
  }
};

export const getallUsers = async (req: Request, res: Response) => {
  try {
    const users = await authService.getallUsers();
    res.status(200).json(users);
    
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve users';
    res.status(500).json({ message });
  }
}