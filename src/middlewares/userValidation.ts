import { Schema } from 'mongoose';
import { UserValidationError } from '../errors/userErrors.js';
import { UserInterface } from '../interfaces/UserInterface.js';
import { WizardSceneInterface } from '../interfaces/WizardSceneInterface.js';
import { UserService } from '../services/UserService.js';
import { UserSessionService } from '../services/UserSessionService.js';

export const userValidation = async (ctx: WizardSceneInterface, next: any) => {
  const user = ctx.from;
  const scene = ctx.scene.current?.id;

  if (!user) throw new UserValidationError('Falha ao obter dados do usuário!');

  const telegramId = ctx.from.id.toString();

  const sessionOk = await UserSessionService.checkSession(telegramId);

  if (!sessionOk) {
    const dbUser = await _isRegistered(telegramId);
    if (!dbUser) {
      if (!scene || scene != 'guestScene') await ctx.scene.enter('guestScene');
      return next();
    } else {
      await UserSessionService.addSession(dbUser);
      ctx.userID = <Schema.Types.ObjectId>dbUser._id;
      if (!scene) await ctx.scene.enter('userScene');
      return next();
    }
  } else {
    ctx.userID = sessionOk._id;
    if (!scene || scene != 'userScene') await ctx.scene.enter('userScene');
    return next();
  }
};

const _isRegistered = async (
  telegramId: string
): Promise<UserInterface | null> => {
  const user = await UserService.buscaPorTelegramId(telegramId);
  if (!user) return null;
  return user;
};
