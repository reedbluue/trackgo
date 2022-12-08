import Keyv from '@keyvhq/core';
import crypto from 'crypto';

const TokenStorage = new Keyv({namespace: 'tokens'});

export abstract class TokenService {
  public static async generateKey(): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex'); // TODO: ALTERAR ESTRATÉGIA DE AUTENTICAÇÃO PARA JSON WEB TOKEN
    await TokenStorage.set(token, false);
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