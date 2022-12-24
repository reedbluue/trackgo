import { Schema } from 'mongoose';
import { TrackDao } from '../daos/TrackDao.js';
import { TrackCreateError, TrackDeleteError, TrackReadError } from '../errors/trackErrors.js';
import { TrackerHelper } from '../helpers/TrackerHelper.js';
import { TrackInterface } from '../interfaces/TrackInterface.js';

export abstract class TrackService {
  public static async adicionar(
    track: TrackInterface
  ): Promise<TrackInterface> {
    try {
      const { code, user } = track;
      const isNotUnique = await TrackService.isDuplicate(code, <Schema.Types.ObjectId>user);
      if (isNotUnique)
        throw new TrackCreateError(
          'Já existe uma Track registrada com esse código para esse usuário!'
        );
      return await TrackDao.create(track);
    } catch (err: any) {
      throw new TrackCreateError(err);
    }
  }

  public static async deletar(trackId: Schema.Types.ObjectId | string): Promise<boolean> {
    try {
      const del = await TrackDao.delete({ _id: trackId });
      if(!del)
        return false;
      return true;
    } catch(err) {
      throw new TrackDeleteError(err);
    }
  }

  public static async listar(trackId: Schema.Types.ObjectId | string): Promise<Array<TrackInterface>> {
    try {
      return await TrackDao.read({ _id: trackId });
    } catch(err) {
      throw new TrackReadError(err);
    }
  }

  public static async listarTodos(userId: Schema.Types.ObjectId | string): Promise<Array<TrackInterface>> {
    try {
      return await TrackDao.read({ user: userId });
    } catch(err) {
      throw new TrackReadError(err);
    }
  }

  public static async atualizarTrack(trackId: Schema.Types.ObjectId | string, keys: Object): Promise<Array<TrackInterface> | undefined | null > {
    try {
      const updateReturn = await TrackDao.update({ _id: trackId }, keys);
      if(!updateReturn || updateReturn.length)
        return null;
      return updateReturn;
    } catch(err) {
      throw new TrackReadError(err);
    }
  }

  public static async atualizarTodasAsTracks() {
    try {
      const allTracks = await TrackDao.read({}, true);
      const tracksToUpdate = allTracks.filter(track => {
        if(!track.status || !track.status.length)
          return true;
        return track.status[track.status.length - 1].code !== 'BDE';
      });

      const rawTracks = await TrackerHelper.returnFrom(tracksToUpdate.map(tracks => tracks.code));

      let updatedTracks: Array<Array<TrackInterface>> = [];

      let i = 0;

      for(const track of tracksToUpdate) {
        const same = track.code == rawTracks[i].code;
        const statusNotExists = (!track.status && !rawTracks[i].status) || !rawTracks[i].status;
        const isNotSameLength = (track.status?.length == rawTracks[i].status?.length);
          
        if(same && !statusNotExists && !isNotSameLength) {
          const updatedTrack = await TrackDao.update({ _id: track.id }, rawTracks[i], true);
          updatedTracks = [...updatedTracks, updatedTrack];
        }

        i++;
      }

      return updatedTracks;
    } catch(err) {
      throw new TrackReadError(err);
    }
  }
  
  public static async isDuplicate(
    code: string, user: Schema.Types.ObjectId
  ): Promise<boolean> {
    try {
      const res = await TrackDao.read({ code, user });
      if (res.length > 0)
        return true;
      return false;
    } catch (err: any) {
      throw new TrackCreateError(err);
    }
  }
}