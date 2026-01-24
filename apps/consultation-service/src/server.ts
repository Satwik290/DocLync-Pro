import './preloader.js'; // MUST BE FIRST
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import consultationRoutes from './routes/consultation.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend
  credentials: true,               // Allow cookies/headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/consultation', consultationRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`🏥 Consultation Service is live on port ${PORT}`);
});