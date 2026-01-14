import { UserPayload } from './user.js';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}