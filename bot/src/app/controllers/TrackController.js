import fetch from "node-fetch";
import TrackView from "../views/TrackView.js";

class TrackController {
  constructor() {
    throw new Error('A classe TrackController não deve ser instanciada!');
  }

  static async getAllTracks() {
      const rawAllTracks = await fetch('http://localhost:3010/track');
      if (!rawAllTracks.ok) {
        const err = await rawAllTracks.json();
        throw new Error(err.error);
      }
      const tracks = (await rawAllTracks.json()).filter(track => track.status);
      return tracks.map(track => TrackView.completeFormat(track));
  }

  static async getTrack(id) {
    const rawTrack = await fetch(`http://localhost:3010/track/${id}`);
    if (!rawTrack.ok) {
      const err = await rawTrack.json();
      throw new Error(err.error);
    }
    const track = await rawTrack.json();
    if (track.status){
      return TrackView.completeFormat(track);
    } else {
      return TrackView.untrackedFormat(track);
    }
  }

  static async getInfo(id) {
    const rawTrack = await fetch(`http://localhost:3010/track/${id}`);
    if (!rawTrack.ok) {
      const err = await rawTrack.json();
      throw new Error(err.error);
    }
    const track = await rawTrack.json();
    return TrackView.smallFormat(track);
  }

  static async getAllTracksId() {
    const request = await fetch(`http://localhost:3010/track`);
    if (!request.ok) {
      const err = await request.json();
      throw new Error(err.error);
    }
    return TrackView.idListFormat(await request.json());
  }

  static async createTrack(code, description) {
    const request = await fetch('http://localhost:3010/track', {
      method: 'POST',
      body: JSON.stringify({
        code: code,
        description: description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!request.ok) {
      const err = await request.json();
      throw new Error(err.error);
    }

    const track = await request.json();

    if (track.status){
      return TrackView.completeFormat(track);
    } else {
      return TrackView.untrackedFormat(track);
    }
  }

  static async deleteTrack(id) {
    const request = await fetch(`http://localhost:3010/track/${id}`, {
      method: 'DELETE'
    });
    if (!request.ok) {
      const err = await request.json();
      throw new Error(err.error);
    }
    return `&#x267B; Rastreio de ID: ${id} deletado com sucesso! &#x267B;`;
  }

  static async updateTrack(id, params) {
    const request = await fetch(`http://localhost:3010/track/${id}`, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!request.ok) {
      const err = await request.json();
      throw new Error(err.error);
    }
    const track = await request.json();

    if (track.status){
      return TrackView.completeFormat(track);
    } else {
      return TrackView.untrackedFormat(track);
    }
  }

  static async confirmNotificationTrack(arr) {
    arr.forEach(async track => {
      const request = await fetch(`http://localhost:3010/track/${track.id}/notificado`);
      if (!request.ok) {
        const err = await request.json();
        throw new Error(err.error);
      }
    });
    const notifyArr = arr.map(track => {
      return TrackView.completeFormat(track);
    });
    return notifyArr;
  }

  static async notificaTracks() {
    const rawAllTracks = await fetch('http://localhost:3010/track');
    if (!rawAllTracks.ok) {
      const err = await rawAllTracks.json();
      throw new Error(err.error);
    }
    const tracks = (await rawAllTracks.json()).filter(track => {
      if (track.status == true || track.notifica == true) {
        return true;
      }
      return false;
    });
    return tracks;
  }
}

export default TrackController;
