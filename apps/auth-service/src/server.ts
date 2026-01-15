// 1. MUST BE THE VERY FIRST IMPORT
import './config.js'; 

import express from 'express';
import cookieParser from 'cookie-parser';

// 2. Database and Routes come AFTER config
import { prisma } from '@doclync/database';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// Health Check to verify DB connection
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "Auth Service Active", database: "Connected ✅" });
  } catch (err) {
    // Cast to Error to access .message
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ status: "DB Error", error: errorMessage });
  }
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 Auth Service ready at http://localhost:${PORT}`);
});