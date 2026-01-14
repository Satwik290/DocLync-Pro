// packages/common/src/middlewares/verifyToken.ts
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from 'express';
import type { UserPayload } from '../types/user.js';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const secret = process.env.JWT_SECRET || "default_secret";
        const decoded = jwt.verify(token, secret) as UserPayload;
        
        // This is now type-safe!
        req.user = decoded; 
        
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};