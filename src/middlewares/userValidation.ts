import { Context } from 'telegraf';
import { UserValidationError } from '../errors/userErrors.js';
import { UserInterface } from '../interfaces/UserInterface.js';
import { UserService } from '../services/UserService.js';
import { UserSessionService } from '../services/UserSessionService.js';

export const userValidation = async (ctx: Context, next: any) => {
  const user = ctx.from;

  if (!user)
    throw new UserValidationError('Falha ao obter dados do usuário!');

  const telegramId = ctx.from.id.toString();

  const sessionOk = await UserSessionService.checkSession(telegramId);

  if (!sessionOk) {
    const dbUser = await _isRegistered(telegramId);

    if (!dbUser) {
      return;
    } else {
      await UserSessionService.addSession(dbUser);
      next();
    }
  } else {
    next();
  }
};

const _isRegistered = async (
  telegramId: string
): Promise<UserInterface | null> => {
  const user = await UserService.buscaPorTelegramId(telegramId);
  if (!user) return null;
  return user;
};
