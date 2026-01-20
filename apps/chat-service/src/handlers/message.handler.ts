import { Server, Socket } from 'socket.io';
import { EVENTS } from '../constants/event.js';
import { ChatService } from '../services/chat.service.js';

const chatService = new ChatService();

export const registerMessageHandlers = (io: Server, socket: Socket) => {
  
  // 1. Join Room & Load History
  socket.on(EVENTS.JOIN_ROOM, async (appointmentId: string) => {
    try {
      // Clean the ID in case frontend sends it with extra quotes
      const cleanAppId = appointmentId.replace(/['"]+/g, '');
      socket.join(cleanAppId);
      
      const history = await chatService.getChatHistory(cleanAppId);
      socket.emit('chat_history', history);
      
      console.log(`User ${(socket as any).user?.name} joined room: ${cleanAppId}`);
    } catch (error) {
      console.error("Error in JOIN_ROOM:", error);
      socket.emit("error", { message: "Failed to load chat history" });
    }
  });

  // 2. Handle New Message
  socket.on(EVENTS.SEND_MESSAGE, async (data: { appointmentId: string, message: string }) => {
    try {
      const { appointmentId, message } = data;
      const cleanAppId = appointmentId.replace(/['"]+/g, '');
      const user = (socket as any).user;

      if (!user) {
        return socket.emit("error", { message: "Unauthorized" });
      }

      const savedMsg = await chatService.saveMessage(
        cleanAppId,
        user.id,
        message
      );

      if (savedMsg) {
        // io.to() sends to everyone in room including sender
        io.to(cleanAppId).emit(EVENTS.RECEIVE_MESSAGE, savedMsg);
      }
    } catch (error) {
      console.error("Error in SEND_MESSAGE:", error);
      socket.emit("error", { message: "Message could not be sent" });
    }
  });

  // 3. Typing Indicator (Real-time only, no DB save)
  socket.on("typing", (data: { appointmentId: string, isTyping: boolean }) => {
    const cleanAppId = data.appointmentId.replace(/['"]+/g, '');
    const user = (socket as any).user;

    // socket.to() sends to everyone EXCEPT the sender
    socket.to(cleanAppId).emit("user_typing", {
      userId: user?.id,
      name: user?.name,
      isTyping: data.isTyping
    });
  });

  // 4. Handle Prescription Upload Notification
  socket.on("send_prescription", async (data: { appointmentId: string, prescriptionUrl: string }) => {
    try {
      const { appointmentId, prescriptionUrl } = data;
      const cleanAppId = appointmentId.replace(/['"]+/g, '');
      const user = (socket as any).user;

      // Security check: Only Doctors should send prescriptions
      if (user.role !== 'DOCTOR') {
        return socket.emit("error", { message: "Only doctors can issue prescriptions." });
      }

      // Save the prescription notification as a special message
      const savedMsg = await chatService.saveMessage(
        cleanAppId,
        user.id,
        `📄 New Prescription uploaded: ${prescriptionUrl}`
      );

      if (savedMsg) {
        io.to(cleanAppId).emit(EVENTS.RECEIVE_MESSAGE, savedMsg);
        // Also emit a specific event for the frontend to show a "Download" button
        io.to(cleanAppId).emit("prescription_ready", { url: prescriptionUrl });
      }
    } catch (error) {
      console.error("Prescription error:", error);
    }
  });
};