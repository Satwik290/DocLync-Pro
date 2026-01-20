import { Router } from 'express';
import { ChatService } from '../services/chat.service.js';
// Assuming you have an auth middleware to get req.user
import { authenticateJWT } from '../middleware/auth.middleware.js'; 

const router = Router();
const chatService = new ChatService();

// GET /api/chat/list
router.get('/list', authenticateJWT, async (req, res) => {
  try {
    const user = (req as any).user;
    const chats = await chatService.getUserChatList(user.id);
    
    // Formatting the response for the Frontend
    const formattedChats = chats.map(app => ({
      appointmentId: app.id,
      // Logic to show the name of the OTHER person
      chatPartner: user.role === 'PATIENT' ? app.doctor.user.name : app.patient.name,
      lastMessage: app.messages[0]?.content || "No messages yet",
      timestamp: app.messages[0]?.createdAt || app.createdAt,
    }));

    res.json(formattedChats);
  } catch (error) {
    console.error("Chat list error:", error);
    res.status(500).json({ error: "Could not fetch chat list" });
  }
});

export default router;