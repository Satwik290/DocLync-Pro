import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import consultationRoutes from './routes/consultation.routes.js'; 

dotenv.config();

const app = express();

// Standard Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Your React Frontend
  credentials: true
}));

// Route Middlewares
app.use('/api/consultation', consultationRoutes);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`🏥 Consultation Service is live on port ${PORT}`);
});