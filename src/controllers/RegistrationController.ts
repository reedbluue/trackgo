import { WizardSceneInterface } from '../interfaces/WizardSceneInterface.js';
import { TokenService } from '../services/TokenService.js';
import { UserService } from '../services/UserService.js';
import { UserSessionService } from '../services/UserSessionService.js';

export abstract class RegistrationController {
  public static signIn = async (
    ctx: WizardSceneInterface) => {
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

    await UserSessionService.addSession(userRegistered);
    await ctx.reply(
      `Parabéns, ${userRegistered.name}! Seu registro foi feito com sucesso!` // TODO: Melhorar mensagem de boas vindas
    );
    return await ctx.scene.enter('userScene');
  };
}