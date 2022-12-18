import { Composer, Markup } from 'telegraf';
import { AdminController } from '../controllers/AdminController.js';
import { adminValidation } from '../middlewares/adminValidation.js';

const adminRouter = new Composer();

adminRouter.command('admin', adminValidation, (ctx) => {
  ctx.replyWithHTML(
    `<b>Comandos administrativos:</b>`,
    Markup.inlineKeyboard([
      Markup.button.callback(`📩 Convidar`, 'inviteToken'),
      Markup.button.callback(`📨 Excluir convites`, 'resetTokens'),
      Markup.button.callback(`🔄 Resetar sessões`, 'resetSessions'),
    ])
  );
});

adminRouter.action('inviteToken', async (ctx) => {
  await AdminController.geraToken(ctx);
  await ctx.answerCbQuery(`Convite gerado com sucesso ✅`);
});

adminRouter.action('resetTokens', async (ctx) => {
  await AdminController.resetaTokens(ctx);
  await ctx.answerCbQuery(`Convites deletados com suceeso ✅`);
});

adminRouter.action('resetSessions', async (ctx) => {
  await AdminController.resetaSessions(ctx);
  await ctx.answerCbQuery(`Sessões resetadas com sucesso ✅`);
});

export default adminRouter;
