import { prisma } from "@doclync/database";

export class DoctorService {
  //   async updateProfile(userId: string, data: {
  //     specialization: string;
  //     price: number;
  //     bio?: string
  //   }) {
  //     // Upsert: Create if doesn't exist, update if it does
  //     return await prisma.doctor.upsert({
  //       where: { userId },
  //       update: data,
  //       create: {
  //         userId,
  //         ...data,
  //       },
  //     });
  //   }

  async getProfile(userId: string) {
    return await prisma.doctor.findUnique({
      where: { userId },
      include: { user: { select: { name: true, email: true } } },
    });
  }

  // apps/auth-service/src/services/doctor.service.ts
  async updateProfile(userId: string, data: any) {
    // Add a log here to debug if it's still failing
    console.log("Updating profile for User ID:", userId);

    return await prisma.doctor.upsert({
      where: { userId: userId }, // This MUST be a string
      update: data,
      create: {
        userId: userId,
        ...data,
      },
    });
  }

  async getAllDoctors(filters?: { specialization?: string }) {
  return await prisma.doctor.findMany({
    where: {
      specialization: filters?.specialization ? {
        contains: filters.specialization,
        mode: 'insensitive'
      } : undefined
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
}
}
