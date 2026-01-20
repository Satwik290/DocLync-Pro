import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware to restrict access based on user roles
 * @param allowedRoles - Array of strings (e.g., ['DOCTOR', 'ADMIN'])
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Ensure the user is authenticated (middleware order matters!)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user session found' });
    }

    // 2. Check if the user's role is in the allowed list
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Forbidden: Access restricted to ${allowedRoles.join(' or ')}` 
      });
    }

    // 3. Role matches, proceed to the controller
    next();
  };
};