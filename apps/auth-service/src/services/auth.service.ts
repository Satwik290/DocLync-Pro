import { prisma } from '@doclync/database';
import bcrypt from 'bcrypt';
import type { SignupInput } from '@doclync/common';

export class AuthService {
  async registerUser(data: SignupInput) {
    // Check if user exists first to provide a clean error
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error("EMAIL_EXISTS");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.user.create({
      data: { ...data, password: hashedPassword }
    });
  }
}