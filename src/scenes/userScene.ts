import { Schema } from "mongoose";
import { Markup, Scenes } from "telegraf";
import { TrackInterface } from "../interfaces/TrackInterface.js";
import { WizardSceneInterface } from "../interfaces/WizardSceneInterface.js";
import { TrackService } from "../services/TrackService.js";
import { UserService } from "../services/UserService.js";

export const userScene = new Scenes.WizardScene<WizardSceneInterface>("userScene",
  async ctx => {}
);

userScene.enter(async (ctx, next) => {
  await ctx.reply("Entrou Usuário");
  ctx.scene.session.userID = ctx.userID;
  next();
});

userScene.start(async ctx => {
  await ctx.replyWithHTML(`<b>Bem-Vindo(a) ao TrackBot, ${ctx.from.first_name}! 😁</b>

Descubra os recursos disponíveis com: <code>/ajuda</code>`);
});

userScene.command('ajuda', async (ctx, next) => {
  await ctx.replyWithHTML(
    `<b>Comandos disponíveis:</b>
<code>/adicionar</code> - Adicione novos Tracks 📝
    `);
});

userScene.command('adicionar', async (ctx, next) => {
  ctx.userID = ctx.scene.session.userID;
  await ctx.scene.enter('trackCreateScene');
});

userScene.command('listar', async ctx => {
  const user = await UserService.buscaPorTelegramId(ctx.from.id.toString());
  if(!user) return;
  const tracks = await TrackService.listarTodos(<Schema.Types.ObjectId>user._id);

  ctx.replyWithHTML(`Tracks cadastradas:`,
  Markup.inlineKeyboard(tracks.map(track => Markup.button.callback(`${statusIndicator(track)} -> ${track.description}`, `desc-${track.id}`)), { columns: 1 })
  );
});

const statusIndicator = (track: TrackInterface): string => {
  if(!track.status || !track.status[track.status.length - 1])
    return '❌';
  switch(track.status[track.status.length - 1].code) {
    case 'BDE':
      return '🏁';
    case 'OEC':
      return '🏠';
    case 'RO':
      return '🚚';
    case 'DO':
      return '🚚';
    case 'LDI':
      return '⏳';
    case 'BDI':
      return '⌛';
    case 'PO':
      return '📦';
    default:
      return '📦';
  }
}