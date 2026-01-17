import { PrismaClient } from '@prisma/client';

// Simple initialization. 
// Prisma will automatically look for DATABASE_URL in process.env
export const prisma = new PrismaClient();

// Add a connection test immediately to catch errors on startup
prisma.$connect()
  .then(() => console.log("✅ Database connected successfully to Consultation Service"))
  .catch((err) => console.error("❌ Database connection failed:", err.message));