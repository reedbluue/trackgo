import { Markup, Scenes } from "telegraf";
import { CodeValidator } from "../helpers/CodeValidator.js";
import { TrackerHelper } from "../helpers/TrackerHelper.js";
import { WizardSceneInterface } from "../interfaces/WizardSceneInterface.js";
import { TrackService } from "../services/TrackService.js";

export const trackCreateScene = new Scenes.WizardScene<WizardSceneInterface>("trackCreateScene",
  async ctx => {
    ctx.scene.session.userID = ctx.userID;
    await ctx.replyWithHTML(`Tudo bem, ${ctx.from.first_name}!  &#x1F44B  Vamos criar uma nova Track!

Para sair do assistente, basta digitar "/sair" ^^

Para começar, precisamos do código do objeto!
Por favor, me informe os 13 dígitos no padrão (XX123456789XX):`, 
    Markup.keyboard([
      ["/ajuda", "/sair"]
    ])
    );
    ctx.wizard.next();
  },
  async ctx => {
    ctx.scene.session.code = ctx.message.text;

    if(!CodeValidator.check(ctx.scene.session.code)) {
      await ctx.replyWithHTML(`&#x26A0;  <b>Formato do código inválido!</b>  &#x26A0;
<i>Digite os 13 dígitos no padrão "XX123456789XX"</i>`);
    } else {

      if(await TrackService.isDuplicate(ctx.scene.session.code, ctx.scene.session.userID)) {
        await ctx.replyWithHTML(`&#x26A0;  <b>Código da Track já registrada para seu usuário!</b>  &#x26A0;
<i>Por favor, digite um código diferente.</i>`);
      } else {
        await ctx.replyWithHTML(`Isso aí!  &#x1F601  Você está indo super bem!
Agora vamos precisar de uma descrição!
Digite a descrição da encomenda:`);
        ctx.wizard.next();
      }
    }
  },
  async ctx => {
    ctx.scene.session.description = ctx.message.text;

    if(ctx.scene.session.description.length < 3) {
      await ctx.replyWithHTML(`&#x26A0;  <b>Descrição muito curta</b>  &#x26A0;
<i>A descrição precisa ser maior do que 3 caracteres!</i>`);
    } else if (ctx.scene.session.description.length > 20) {
      await ctx.replyWithHTML(`&#x26A0;  <b>Descrição muito longa</b>  &#x26A0;
<i>A descrição somente pode ter até 20 caracteres!</i>`);
    } else {

      try {
        const rawTrack = await TrackerHelper.returnFrom([ctx.scene.session.code]);

        const track = await TrackService.adicionar({
          code: rawTrack[0].code,
          description: ctx.scene.session.description,
          type: rawTrack[0].type,
          user: ctx.scene.session.userID,
          status: rawTrack[0].status
        });
      } catch (err) {
        console.log(err);
      }

      await ctx.replyWithHTML(`&#x2705  Track criada com sucesso!  &#x2705`);

      await ctx.scene.leave();
    }
  }
);

trackCreateScene.use(async (ctx, next) => {
  ctx.scene.session.expires = Math.floor(Date.now() / 1000) + 65;
  clearTimeout(ctx.scene.session.inativeUserCallBack);
  ctx.scene.session.inativeUserCallBack = setTimeout(async function() {
    await ctx.reply('Inatividade detectada. Saindo do assistente de criação de Tracks.',
    Markup.removeKeyboard());
    await ctx.scene.leave();
  }, 60000);
  next();
});

trackCreateScene.command('sair', async ctx => {
  await ctx.reply('Tudo bem! Saindo do assistente de criação de Tracks.',
  Markup.removeKeyboard());
  await ctx.scene.leave();
});

trackCreateScene.command('ajuda', async ctx => {
  await ctx.replyWithHTML(`O código de rastreio deve ser no padrão dos CORREIOS BRASIL.
O parão é composto por duas letras, seguidas por nove números e, por fim, mais duas letras.

Já a descrição da Track, deve conter uma breve descrição do seu pacote, e deve conter de 5 à 20 caractéres!`);
});

trackCreateScene.leave(async ctx => {
  clearTimeout(ctx.scene.session.inativeUserCallBack);
});