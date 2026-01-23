import { upload } from '../utils/multer.js';
import { Router } from 'express';
import { bookAppointment, getMyAppointments, verifyPayment } from '../controllers/consultation.controller.js';
import { PrescriptionController } from '../controllers/prescription.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js'; // 1. Import your role middleware

const prescriptionController = new PrescriptionController();
const router = Router();

// 2. Only PATIENTS should be allowed to book or verify payments
router.post('/book', authenticateJWT, authorizeRoles('PATIENT'), bookAppointment);
router.post('/verify', authenticateJWT, authorizeRoles('PATIENT'), verifyPayment);

// 3. Both roles can view their own appointments
router.get('/my-appointments', authenticateJWT, authorizeRoles('PATIENT', 'DOCTOR'), getMyAppointments);

// 4. Only DOCTORS should upload prescriptions
router.post(
  '/upload-prescription',
  authenticateJWT,
  authorizeRoles('DOCTOR'), // Restrict this endpoint
  upload.single('prescription'),
  (req, res) => prescriptionController.upload(req, res)
);

router.get('/health', (req, res) => {
  res.json({ status: 'Consultation service is healthy' });
});

export default router;