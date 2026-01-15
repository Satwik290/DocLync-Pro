import { Router } from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected route example: Get current user profile
router.get('/me', authenticateJWT, (req, res) => {
  // Because of the middleware, we know req.user exists here
  res.json({ message: "You are authorized!", user: req.user });
});

export default router;