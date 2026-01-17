import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 1. Define the interface to match your global UserPayload requirements
export interface UserPayload {
  id: string;    // Changed from 'userId' to 'id' to match your error message
  email: string; // Added because the error says it's required
  role: string;
}

// 2. Augment the Express namespace so you don't need a custom "AuthRequest" interface
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    // console.log("🔓 Token Decoded Successfully:", decoded);
    // Now req.user is recognized by standard Express Request!
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};