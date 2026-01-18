import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary as any, 
  params: {
    folder: 'prescriptions',
    allowed_formats: ['jpg', 'png', 'pdf'],
  } as any,
});

export const upload = multer({ storage });