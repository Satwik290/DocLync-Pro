import { Server, Socket } from 'socket.io';
import { registerMessageHandlers } from './message.handler.js';
// import { registerVideoHandlers } from './video.handler.js'; // Future expansion

export const onConnection = (io: Server, socket: Socket) => {
  // Log connection for debugging
  console.log(`📡 Handler attached to socket: ${socket.id}`);

  // Register different modules of logic
  registerMessageHandlers(io, socket);
  
  // You can easily add more handlers here as the app grows:
  // registerVideoHandlers(io, socket);
  // registerNotificationHandlers(io, socket);
};