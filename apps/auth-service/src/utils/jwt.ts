import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export const generateToken = (payload: object): string =>{
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'});
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};