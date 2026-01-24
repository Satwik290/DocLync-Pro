import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 1. Define the interface to match your global UserPayload requirements
export interface UserPayload {
  id: string;    
  email: string; 
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
const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
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