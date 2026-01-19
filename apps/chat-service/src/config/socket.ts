import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { pubClient, subClient } from './redis.js';
import { Server as HttpServer } from 'http';

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // In production, match your frontend URL
      methods: ["GET", "POST"]
    }
  });

  io.adapter(createAdapter(pubClient, subClient));
  return io;
};