import Keyv from '@keyvhq/core';
import { JWTHelper } from '../helpers/JWTHelper.js';

const TokenStorage = new Keyv({namespace: 'tokens'});

export abstract class TokenService {
  public static async generateKey(): Promise<string> {
    const token = JWTHelper.generate();
    await TokenStorage.set(token, true);
    return token;
  }

  public static async validateKey(token: string): Promise<boolean> {
    const isValid = await TokenStorage.has(token);
    if(!isValid)
      return false;
    await TokenStorage.delete(token);
    return true;
  }

  public static async resetAllSessions(): Promise<void> {
    return await TokenStorage.clear();
  }
}