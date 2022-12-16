import { UserDao } from '../daos/UserDao.js';
import { UserCreateError } from '../errors/userErrors.js';
import { UserInterface } from '../interfaces/UserInterface.js';
import { UserSessionService } from './UserSessionService.js';

export abstract class UserService {
  public static async adicionar(user: UserInterface): Promise<UserInterface> {
    try {
      return await UserDao.create(user);
    } catch (err: any) {
      throw new UserCreateError(err);
    }
  }

  public static async buscaPorTelegramId(
    telegramId: string
  ): Promise<UserInterface | undefined | null> {
    try {
      const user = (await UserDao.read({ telegramId }))[0];
      if(!user) {
        if(await UserSessionService.checkSession(telegramId)) {
          await UserSessionService.removeSession(telegramId);
          return null;
        } else {
          return null;
        }
      } else {
        return user;
      }
    } catch (err: any) {
      throw new UserCreateError(err);
    }
  }
}
