import express from 'express';
import { createServer } from 'http';
import { initSocket } from './config/socket.js'; 
import chatRoutes from './routes/chat.routes.js';
import { authSocket } from './middleware/auth.socket.js';
import { registerMessageHandlers } from './handlers/message.handler.js';
import dotenv from 'dotenv';
import cors from 'cors'; // Highly recommended for Monorepos

dotenv.config();

const app = express();

// 1. Standard Middleware
app.use(cors()); 
app.use(express.json());

// 2. HTTP Routes
app.use('/api/chat', chatRoutes);

// 3. Create single HTTP Server instance
const httpServer = createServer(app);

// 4. Initialize Socket.io on that server
const io = initSocket(httpServer);

// 5. Apply Socket Security Middleware
io.use(authSocket);

// 6. Socket Connection Logic
io.on('connection', (socket) => {
  console.log(`✅ Socket Connected: ${socket.id} (User: ${(socket as any).user?.name})`);
  
  registerMessageHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log(`❌ Socket Disconnected: ${socket.id}`);
  });
});

// 7. Start the Server
const PORT = process.env.PORT || 4003;
httpServer.listen(PORT, () => {
  console.log(`🚀 Chat Service running on http://localhost:${PORT}`);
});