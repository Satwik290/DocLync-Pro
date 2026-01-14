import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

// Manually load the env file if Prisma CLI isn't picking it up
dotenv.config(); 

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});