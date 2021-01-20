import jwt from 'jsonwebtoken';

export default class AuthService {
  public static generateToken(payload: Record<string, unknown>): string {
    return jwt.sign(payload, 'secret-key', {
      expiresIn: 20000000,
    });
  }

  public static decodeToken(token: string): string | object {
    return jwt.verify(token, 'secret-key');
  }
}
