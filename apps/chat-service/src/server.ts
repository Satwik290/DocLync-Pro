import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import { initSocket } from './config/socket.js'; 
import chatRoutes from './routes/chat.routes.js';
import { authSocket } from './middleware/auth.socket.js';
import { onConnection } from './handlers/index.js'; // The new aggregator

dotenv.config();

const app = express();

// 1. Standard Middleware
app.use(cors()); 
app.use(express.json());

// 2. HTTP Routes (for Chat List & History)
app.use('/api/chat', chatRoutes);

// 3. Create Server Instance
const httpServer = createServer(app);

// 4. Initialize Socket.io
const io = initSocket(httpServer);

// 5. Security Handshake Middleware
io.use(authSocket);

// 6. Socket Connection Logic (Delegated to Handlers)
io.on('connection', (socket) => {
  onConnection(io, socket);
});

// 7. Start the Server
const PORT = process.env.PORT || 4003;
httpServer.listen(PORT, () => {
  console.log(`🚀 Chat Service running on http://localhost:${PORT}`);
});