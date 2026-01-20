import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;

// This fixes the "no exported member PrismaClient" error
export * from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ 
  connectionString,
  host: '127.0.0.1' 
});

const adapter = new PrismaPg(pool);

// Use 'any' here temporarily to stop the IDE from blocking your build
// until the background 'generate' finishes syncing
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;