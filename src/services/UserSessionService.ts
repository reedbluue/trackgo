import Keyv from '@keyvhq/core';
import { UserSessionError } from '../errors/userErrors.js';
import { UserInterface } from '../interfaces/UserInterface.js';

const userSessionStorage = new Keyv({namespace: 'users'});

export abstract class UserSessionService {
  public static async checkSession(telegramId: string) {
    if (!telegramId) throw new UserSessionError('ID do usuário inválido!');
    return await userSessionStorage.has(telegramId);
  }

  public static async addSession(user: UserInterface) {
    if (!user) throw new UserSessionError('Usuário indefinido!');
    return await userSessionStorage.set(<string>user.telegramId, user);
  }

  public static async resetAllSessions() {
    return await userSessionStorage.clear();
  }
}