import { Router } from 'express';
// We will import controllers here in the next step
const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'Consultation service is healthy' });
});

export default router;