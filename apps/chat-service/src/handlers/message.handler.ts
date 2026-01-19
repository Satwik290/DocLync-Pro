import { Server, Socket } from 'socket.io';
import { EVENTS } from '../constants/event.js';
import { ChatService } from '../services/chat.service.js';

const chatService = new ChatService();

export const registerMessageHandlers = (io: Server, socket: Socket) => {
  
  // 1. Join Room & Load History
  socket.on(EVENTS.JOIN_ROOM, async (appointmentId: string) => {
    socket.join(appointmentId);
    
    // Fetch history from DB
    const history = await chatService.getChatHistory(appointmentId);
    // Send history only to the user who just joined
    socket.emit('chat_history', history);
    
    console.log(`User joined room: ${appointmentId} and received history.`);
  });

  // 2. Handle New Message
  socket.on(EVENTS.SEND_MESSAGE, async (data: { appointmentId: string, message: string }) => {
    const { appointmentId, message } = data;
    const user = (socket as any).user;

    // Save to Postgres
    const savedMsg = await chatService.saveMessage(
      appointmentId,
      user.id,
      message
    );

    if (savedMsg) {
      // Broadcast the saved message (with sender info) to everyone in the room
      io.to(appointmentId).emit(EVENTS.RECEIVE_MESSAGE, savedMsg);
    }
  });
};