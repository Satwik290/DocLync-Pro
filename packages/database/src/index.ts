// packages/database/src/index.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

export * from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

// Debugging: This will show up in your terminal if it's missing
if (!connectionString) {
  console.error("❌ DATABASE_URL is undefined. Check if dotenv.config() is called in the main app.");
}

const pool = new Pool({ 
  connectionString,
  // Optional: Force IPv4 to avoid Windows "localhost" issues
  host: '127.0.0.1' 
});

const adapter = new PrismaPg(pool);
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;