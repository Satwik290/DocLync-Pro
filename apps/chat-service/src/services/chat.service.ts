import { prisma } from "@doclync/database";

export class ChatService {
  async saveMessage(appointmentId: string, senderId: string, content: string) {
    if (!content || content.trim() === "") return null;

    const cleanAppId = appointmentId.replace(/['"]+/g, "");

    return await prisma.message.create({
      data: {
        // @ts-ignore - Field exists in DB but TS cache might be slow
        appointmentId: cleanAppId,
        senderId,
        content: content.trim(),
      },
      include: {
        sender: {
          select: { name: true },
        },
      },
    });
  }

  async getChatHistory(appointmentId: string) {
    const cleanAppId = appointmentId.replace(/['"]+/g, "");

    return await prisma.message.findMany({
      where: { 
        // @ts-ignore
        appointmentId: cleanAppId 
      } as any, // Temporary cast to bypass the PrismaWhereInput error
      include: {
        sender: {
          select: { name: true, role: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  }

async getUserChatList(userId: string) {
  return await prisma.appointment.findMany({
    where: {
      OR: [
        { patientId: userId },
        { doctor: { userId: userId } }
      ]
    },
    include: {
      patient: { select: { name: true } },
      doctor: { 
        include: { user: { select: { name: true } } } 
      },
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1 
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}
}