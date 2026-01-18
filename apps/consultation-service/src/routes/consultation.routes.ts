import { Router } from 'express';
import { bookAppointment, verifyPayment } from '../controllers/consultation.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/book', authenticateJWT, bookAppointment);
router.post('/verify', authenticateJWT, verifyPayment);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'Consultation service is healthy' });
});

export default router;