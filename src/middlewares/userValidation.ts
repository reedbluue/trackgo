import { Context } from 'telegraf';
import { UserValidationError } from '../errors/userErrors.js';
import { UserInterface } from '../interfaces/UserInterface.js';
import { UserService } from '../services/UserService.js';
import { UserSessionService } from '../services/UserSessionService.js';

export const userValidation = async (ctx: Context, next: any) => {
  const telegramId = ctx.from?.id.toString();

  if (!telegramId)
    throw new UserValidationError('Falha ao obter o Telegram ID!');

  const sessionOk = await UserSessionService.checkSession(telegramId);

  if (!sessionOk) {
    const user = await isRegistered(telegramId);

    if (!user) {
      const userRegistered = await UserService.adicionar({
        name: <string>ctx.from?.first_name,
        telegramId: telegramId,
        lastName: ctx.from?.last_name,
      });

      await ctx.reply(
        `Parabéns, ${userRegistered.name}! Seu registro foi feito com sucesso!`
      );
    } else {
      await UserSessionService.addSession(user);
      next();
    }
  } else {
    next();
  }
};

const isRegistered = async (
  telegramId: string
): Promise<UserInterface | null> => {
  const user = await UserService.buscaPorTelegramId(telegramId);
  if (!user) return null;
  return user;
};
