import { Schema } from 'mongoose';
import { TrackDao } from '../daos/TrackDao.js';
import { TrackCreateError, TrackDeleteError, TrackReadError } from '../errors/trackErrors.js';
import { StatusInterface } from '../interfaces/StatusInterface.js';
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