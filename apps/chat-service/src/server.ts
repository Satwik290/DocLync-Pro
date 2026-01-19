import express from 'express';
import { createServer } from 'http';
import { initSocket } from './config/socket.js'; // Must have .js
import { authSocket } from './middleware/auth.socket.js';
import { registerMessageHandlers } from './handlers/message.handler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = initSocket(httpServer);

// Apply Security Middleware
io.use(authSocket);

io.on('connection', (socket) => {
  console.log(`✅ Connected: ${socket.id}`);
  
  registerMessageHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log(`❌ Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4003;
httpServer.listen(PORT, () => {
  console.log(`🚀 Chat Service running on http://localhost:${PORT}`);
});