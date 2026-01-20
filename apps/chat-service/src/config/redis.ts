import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  // Add retry strategy to prevent constant crashing during dev
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
};

export const pubClient = new Redis(redisConfig);
export const subClient = new Redis(redisConfig);

// 🛑 Error Handlers: This stops the "missing error handler" logs
pubClient.on('error', (err) => console.error('Redis PubClient Error:', err));
subClient.on('error', (err) => console.error('Redis SubClient Error:', err));

pubClient.on('connect', () => console.log('✅ Redis PubClient Connected'));
subClient.on('connect', () => console.log('✅ Redis SubClient Connected'));