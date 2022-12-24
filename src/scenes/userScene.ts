import { Schema } from 'mongoose';
import { Markup, Scenes } from 'telegraf';
import { StatusInterface } from '../interfaces/StatusInterface.js';
import { WizardSceneInterface } from '../interfaces/WizardSceneInterface.js';
import { TrackService } from '../services/TrackService.js';
import { UserService } from '../services/UserService.js';
import { DateTime } from 'luxon';

export const userScene = new Scenes.WizardScene<WizardSceneInterface>(
  'userScene',
  async (ctx) => {}
);

userScene.enter(async (ctx, next) => {
  await ctx.reply('Entrou Usuário');
  ctx.scene.session.userID = ctx.userID;
  next();
});

userScene.start(async (ctx) => {
  await ctx.replyWithHTML(`<b>Bem-Vindo(a) ao TrackBot, ${ctx.from.first_name}! 😁</b>

Descubra os recursos disponíveis com: <code>/ajuda</code>`);
});

userScene.command('ajuda', async (ctx, next) => {
  await ctx.replyWithHTML(
    `<b>Comandos disponíveis:</b>
<code>/adicionar</code> - Adicione novos Tracks 📝
<code>/listar</code> - Lista todos os seus Tracks 🗃️
    `
  );
});

userScene.command('adicionar', async (ctx, next) => {
  ctx.userID = ctx.scene.session.userID;
  await ctx.scene.enter('trackCreateScene');
});

userScene.command('listar', async (ctx) => {
  const user = await UserService.buscaPorTelegramId(ctx.from.id.toString());
  if (!user) return;
  const tracks = await TrackService.listarTodos(
    <Schema.Types.ObjectId>user._id
  );

  if (!tracks.length) {
    await ctx.replyWithHTML(
      `<b>Você não possui Tracks! 🙁</b>
Adicione um novo com o comando: <code>/adicionar</code>`
    );
  } else {
    await ctx.replyWithHTML(
      `📋 <b>Tracks cadastrados:</b>`,
      Markup.inlineKeyboard(
        tracks.map((track) =>
          Markup.button.callback(
            `${
              track.status?.length
                ? _statusIndicator(track.status[track.status.length - 1])
                : `❌`
            } ⠀ > ⠀ ${track.description.toUpperCase()}`,
            `desc-${track.id}`
          )
        ),
        { columns: 1 }
      )
    );
  }
});

userScene.action(/^desc-(.*)$/, async (ctx) => {
  const trackId = ctx.match[1];
  const track = (await TrackService.listar(trackId))[0];

  if (!track) return;

  if (track.status?.length) {
    await ctx.replyWithHTML(
      `➡️ <b>${track.description.toUpperCase()}</b>
${track.code.toUpperCase()}
${`${track.type}`}

${_statusIndicator(track.status[track.status.length - 1])} Status atual:\n${
        track.status[track.status.length - 1].description
      }`,
      Markup.inlineKeyboard([
        Markup.button.callback('📃 Rastreio Completo', `fullDesc-${trackId}`),
        Markup.button.callback('📝 Editar', `edit-${trackId}`),
        Markup.button.callback('🗑️ Deletar', `del-${trackId}`),
      ])
    );
  } else {
    await ctx.replyWithHTML(
      `<b>${track.description.toUpperCase()}</b>

❌ Rastreio não existente!

${track.code.toUpperCase()}`,
      Markup.inlineKeyboard([
        Markup.button.callback('📝 Editar', `edit-${trackId}`),
        Markup.button.callback('🗑️ Deletar', `del-${trackId}`),
      ])
    );
  }
});

userScene.action(/^fullDesc-(.*)$/, async (ctx) => {
  const trackId = ctx.match[1];
  const track = (await TrackService.listar(trackId))[0];

  if (!track) return;

  const allStatus = track.status;
  if (!allStatus || !allStatus.length) return;
  await ctx.replyWithHTML(`📃 <b>Histórico de rastreio:</b>

${allStatus
  .map((status) => {
    return `${status.unity.city} / ${status.unity.state.toUpperCase()}📍
${status.description} ${_statusIndicator(status)}
${
  status.dateTime
    ? DateTime.fromJSDate(status.dateTime)
        .setLocale('pt-br')
        .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
    : ''
} 🗓️
Local: ${
      status.unity.type
    } - ${status.unity.city.toUpperCase()} / ${status.unity.state.toUpperCase()} 📌${
      status.destiny
        ? `\nDestino: ${
            status.unity.type
          } - ${status.destiny.city.toUpperCase()} / ${status.destiny.state.toUpperCase()} 🛫`
        : ``
    }`;
  })
  .join('\n\n')}`);
});

const _statusIndicator = (
  status: StatusInterface | null | undefined
): string => {
  if (!status) return '❌';
  switch (status.code) {
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
};

userScene.action(/^del-(.*)$/, async (ctx) => {
  const trackId = ctx.match[1];
  const isOk = await TrackService.deletar(trackId);

  if (!isOk)
    return await ctx.replyWithHTML(`❌ <b>Falha ao deletar ou Track não existe!</b>
Tente novamente em alguns minutos.`);

  return await ctx.replyWithHTML(`🚮 <b>Track deletada!</b>`);
});

userScene.action(/^edit-(.*)$/, async (ctx) => {
  const trackId = ctx.match[1];
  await ctx.replyWithHTML(`O que você gostaria de editar?`,
  Markup.inlineKeyboard([
    Markup.button.callback('Descrição', `editDesc-${trackId}`),
    Markup.button.callback('Código', `editCode-${trackId}`)
  ])
  );
});

userScene.action(/^editDesc-(.*)$/, async (ctx) => {
  const trackId = ctx.match[1];
  ctx.trackID = trackId;
  ctx.scene.enter('trackUpdateDescScene');
});

userScene.action(/^editCode-(.*)$/, async (ctx) => {
  const trackId = ctx.match[1];
  ctx.trackID = trackId;
  ctx.scene.enter('trackUpdateCodeScene');
});