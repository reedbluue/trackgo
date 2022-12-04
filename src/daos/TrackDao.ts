import { TrackInterface } from "../interfaces/TrackInterface.js";
import { Track } from "../models/Track.js";

export abstract class TrackDao {
  static async create(model: TrackInterface): Promise<TrackInterface> {
    const track = await Track.create(model);
    return track;
  }
  
  static async read(keys: Object): Promise<Array<TrackInterface>> {
    const tracks = await Track.find(keys);
    return tracks;
  }

  static async update(keys: Object, model: TrackInterface): Promise<Array<TrackInterface>> {
    const tracks = await Track.find(keys);
    tracks.map(async track => {
      return await track.update(model);
    });
    return await Track.find(keys);
  }

  static async delete(keys: Object): Promise<void> {
    const tracks = await Track.find(keys);
    tracks.forEach(async track => {
      return await track.delete();
    });
  }
}