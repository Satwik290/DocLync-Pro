import { Router } from 'express';
import type { Request, Response } from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import { getDoctors, updateDoctorProfile } from '../controllers/doctor.controller.js';

const router = Router();

// --- Public Routes ---
// Anyone can access these to join or leave the platform
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// --- Protected Routes (Universal) ---
// Any logged-in user (regardless of role) can see their own data
router.get('/me', authenticateJWT, (req: Request, res: Response) => {
  res.json({ 
    message: "You are authorized!", 
    user: req.user 
  });
});

// --- Protected Routes (Role-Specific) ---

// 1. Doctor Portal: Only accessible if role is 'DOCTOR'
router.get('/doctor/dashboard', 
  authenticateJWT, 
  authorizeRoles('DOCTOR'), 
  (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Doctor Portal. Access granted." });
});

// 2. Patient Portal: Only accessible if role is 'PATIENT'
router.get('/patient/appointments', 
  authenticateJWT, 
  authorizeRoles('PATIENT'), 
  (req: Request, res: Response) => {
    res.json({ message: "Welcome to your Patient dashboard." });
});

// 3. Admin Only: Accessible by ADMIN, or if you want to allow DOCTOR too
router.get('/admin/stats', 
  authenticateJWT, 
  authorizeRoles('ADMIN'), 
  (req: Request, res: Response) => {
    res.json({ message: "System-wide statistics (Admin only)." });
});

// Only DOCTORs can update their professional details
router.put('/doctor/profile', 
  authenticateJWT, 
  authorizeRoles('DOCTOR'), 
  updateDoctorProfile
);

// Publicly searchable list of doctors
router.get('/doctors', getDoctors);

export default router;