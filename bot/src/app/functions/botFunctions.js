import TrackController from '../controllers/TrackController.js';
import TrackView from '../views/TrackView.js';

// FUNÇÕES

export const returnAllTracks = async ctx => {
  try {
    const tracks = await TrackController.getAllTracks();
    tracks.forEach(async track => {
      await ctx.telegram.sendMessage(ctx.message.chat.id, track, {
        parse_mode: 'HTML'
      });
    });
  } catch (err) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, TrackView.error(err.message), { parse_mode: 'HTML' });
  }
};

export const returnTrack = async (ctx, regexp) => {
  const id = regexp.exec(ctx.message.text)[1];
  try {
    const track = await TrackController.getTrack(id);
    await ctx.telegram.sendMessage(ctx.message.chat.id, track, {
      parse_mode: 'HTML'
    });
  } catch (err) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, TrackView.error(err.message), { parse_mode: 'HTML' });
  }
}

export const returnIdList = async ctx => {
  try {
    const tracksId = await TrackController.getAllTracksId();
    await ctx.telegram.sendMessage(ctx.message.chat.id, tracksId, {
      parse_mode: 'HTML'
    });
  } catch (err) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, TrackView.error(err.message), { parse_mode: 'HTML' });
  }
}

export const deleteTrack = async (ctx, regexp) => {
  const id = regexp.exec(ctx.message.text)[1];
  try {
    const track = await TrackController.deleteTrack(id);
    await ctx.telegram.sendMessage(ctx.message.chat.id, track, {
      parse_mode: 'HTML'
    });
  } catch (err) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, TrackView.error(err.message), { parse_mode: 'HTML' });
  }
}

export const createTrack = async (ctx, code, description) => {
  try {
    const track = await TrackController.createTrack(code, description);
    await ctx.telegram.sendMessage(ctx.message.chat.id, track, {
      parse_mode: 'HTML'
    });
  } catch (err) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, TrackView.error(err.message), { parse_mode: 'HTML' });
    throw new Error();
  }
}

export const infoTrack = async (ctx, id) => {
  try {
    const track = await TrackController.getInfo(id);
    await ctx.telegram.sendMessage(ctx.message.chat.id, track, { parse_mode: 'HTML' });
  } catch (err) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, TrackView.error(err.message), { parse_mode: 'HTML' });
    throw new Error();
  }
}

export const updateTrack = async (ctx, id, ...params) => {
  try {
    let track = null;
    if(params[0] == null) {
      track = await TrackController.updateTrack(id, {description: params[1]});
    } else if (params[1] == null) {
      track = await TrackController.updateTrack(id, {code: params[0]});
    }
    const trackAtt = await TrackController.getTrack(id);
    await ctx.telegram.sendMessage(ctx.message.chat.id, trackAtt, {
      parse_mode: 'HTML'
    });
  } catch (err) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, TrackView.error(err.message), { parse_mode: 'HTML' });
    throw new Error();
  }
}

let timerNotify = null;

export const notifyTrackEnable = async (ctx) => {
  try {
    clearInterval(timerNotify);
    timerNotify = setInterval(async () => {
      const tracks = await TrackController.notificaTracks();
      const notifyArr = await TrackController.confirmNotificationTrack(tracks);
      notifyArr.forEach(async (track, index) => {
        await ctx.telegram.sendMessage(ctx.message.chat.id, track, { parse_mode: "HTML" });
        if (index == notifyArr.length - 1) {
          await ctx.telegram.sendMessage(ctx.message.chat.id, `Aee!! Tem atualização na parada &#x1F601;`, { parse_mode: "HTML" });
        }
      });
    }, 10000);
    await ctx.telegram.sendMessage(ctx.message.chat.id, `&#x2795;  Agora estou monitorando atualizações em suas Tracks!`, {
      parse_mode: 'HTML'
    });
  } catch (err) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, TrackView.error(err.message), { parse_mode: 'HTML' });
    throw new Error();
  }
}

export const notifyTrackDisable = async (ctx) => {
  clearInterval(timerNotify);
  await ctx.telegram.sendMessage(ctx.message.chat.id, `&#x2796;  Não estou monitorando atualizações em suas Tracks!`, {
    parse_mode: 'HTML'
  });
}