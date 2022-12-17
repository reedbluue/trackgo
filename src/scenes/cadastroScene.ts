import { Scenes } from "telegraf";
import { WizardSceneInterface } from "../interfaces/WizardSceneInterface.js";

export const cadastroScene = new Scenes.WizardScene<WizardSceneInterface>("cadastroScene",
  async ctx => {
    await ctx.reply('Digite seu nome:');
    ctx.wizard.next();
  },
  async ctx => {
    ctx.scene.session.nome = ctx.message.text;
    await ctx.reply('Digite sua idade:');
    ctx.wizard.next();
  },
  async ctx => {
    ctx.scene.session.idade = ctx.message.text;
    await ctx.reply('Dados coletados:');
    await ctx.reply(`${ctx.scene.session.nome}, ${ctx.scene.session.idade}`);
    await ctx.scene.leave();
  }
);

cadastroScene.enter(async (ctx, next) => {
  await ctx.reply("Entrou Cadastro");
  next();
});

cadastroScene.use(async (ctx, next) => {
  ctx.scene.session.expires = Math.floor(Date.now() / 1000) + 65;
  clearTimeout(ctx.scene.session.inativeUserCallBack);
  ctx.scene.session.inativeUserCallBack = setTimeout(async function() {
    await ctx.reply('Inatividade detectada. Saindo de cadastro.');
    await ctx.scene.leave();
  }, 60000);
  next();
});

cadastroScene.leave(async ctx => {
  clearTimeout(ctx.scene.session.inativeUserCallBack);
});