import { prisma } from '@doclync/database';
import bcrypt from 'bcrypt';
import type { SignupInput } from '@doclync/common';
import jwt from 'jsonwebtoken';

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
    async login(email: string, password: string) {
    // 1. Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user.id, 
        email: user.email,
        role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },  
    });
    if (!user) throw new Error("User not found");   
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }   

  async getallUsers() {
    return await prisma.user.findMany({
      where: { role: 'PATIENT' },
      select: {
        id: true, 
        name: true, 
        email: true,
        role: true
      }
    }); 
  } 
};


