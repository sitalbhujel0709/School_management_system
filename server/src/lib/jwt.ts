import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig';

const createAccessToken = (payload:Record<string, string>): string=>{
  const token = jwt.sign(payload, envConfig.JWT_SECRET, { expiresIn: '7d' });
  return token;
}

const verifyAccessToken = (token: string): jwt.JwtPayload| null => {
  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET) as Record<string, unknown>;
    return decoded;
  } catch (error) {
    console.error('Error verifying access token:', error);
    return null;
  }
}

export { createAccessToken, verifyAccessToken };