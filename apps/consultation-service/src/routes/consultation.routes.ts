import { upload } from '../utils/multer.js';
import { Router } from 'express';
import { bookAppointment, getMyAppointments, verifyPayment } from '../controllers/consultation.controller.js';
import { PrescriptionController } from '../controllers/prescription.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
const prescriptionController = new PrescriptionController();
const router = Router();

router.post('/book', authenticateJWT, bookAppointment);
router.post('/verify', authenticateJWT, verifyPayment);
router.get('/my-appointments', authenticateJWT, getMyAppointments);


// Only Doctors can hit this, and they must provide a file named 'prescription'
router.post(
  '/upload-prescription',
  authenticateJWT,
  upload.single('prescription'),
  (req, res) => prescriptionController.upload(req, res)
);
// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'Consultation service is healthy' });
});

export default router;