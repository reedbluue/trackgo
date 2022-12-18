import { Scenes } from "telegraf";
import { WizardSceneInterface } from "../interfaces/WizardSceneInterface.js";

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

userScene.command('adicionar', async (ctx, next) => {
  ctx.userID = ctx.scene.session.userID;
  await ctx.scene.enter('trackCreateScene');
});

userScene.command('ajuda', async (ctx, next) => {
  await ctx.replyWithHTML(
    `<b>Comandos disponíveis:</b>
<code>/adicionar</code> - Adicione novos Tracks 📝
    `);
});