import { Context, NarrowedContext } from 'telegraf';
import { Update, Message } from 'telegraf/typings/core/types/typegram';
import { TokenService } from '../services/TokenService.js';
import { UserService } from '../services/UserService.js';
import { UserSessionService } from '../services/UserSessionService.js';

export abstract class RegistrationController {
  public static signIn = async (
    ctx: NarrowedContext<
      Context<Update>,
      {
        message: Update.New & Update.NonChannel & Message.TextMessage;
        update_id: number;
      }
    >
  ) => {
    const telegramId = ctx.from.id.toString();

    if (await UserSessionService.checkSession(telegramId) ||
        await UserService.buscaPorTelegramId(telegramId))
      return ctx.reply('Você já é um usuário cadastrado!');

    const token = ctx.message.text.split(' ', 2)[1];
    if(!token)
      return;
    if(!(await TokenService.validateKey(token)))
      return ctx.reply('Token inválido ou expirado! Verifique o token e tente novamente.');

    const userRegistered = await UserService.adicionar({
      name: ctx.from.first_name,
      telegramId: telegramId,
      lastName: ctx.from.last_name,
    });
    
    return await ctx.reply(
      `Parabéns, ${userRegistered.name}! Seu registro foi feito com sucesso!` // TODO: Melhorar mensagem de boas vindas
    );
  };
}