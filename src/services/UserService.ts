import { UserDao } from "../daos/UserDao.js";
import { UserCreateError } from "../errors/userErrors.js";
import { UserInterface } from "../interfaces/UserInterface.js";

export abstract class UserService {
  public static async adicionar(user: UserInterface): Promise<UserInterface> {
    try {
      return await UserDao.create(user);
    } catch (err: any) {
      throw new UserCreateError(err);
    }
  }

  public static async buscaPorTelegramId(telegramId: string): Promise<UserInterface | undefined | null> {
    try {
      return (await UserDao.read({ telegramId }))[0];
    } catch (err: any) {
      throw new UserCreateError(err);
    }
  }
}