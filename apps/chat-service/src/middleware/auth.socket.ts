import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

export const authSocket = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];

  if (!token) {
    return next(new Error('Authentication error: No token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (socket as any).user = decoded; 
    next();
  } catch (err) {
    next(new Error('Authentication error: Invalid token'));
  }
};