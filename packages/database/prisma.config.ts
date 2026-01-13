// packages/database/src/prisma.config.ts
import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// This ensures the .env is loaded from the current package directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  datasource: {
    // Force Prisma to use the environment variable
    url: process.env.DATABASE_URL,
  },
});