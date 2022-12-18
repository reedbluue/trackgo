import { rastrearEncomendas } from "correios-brasil";
import { Status } from "../models/Status.js";

interface rawTracks {
  code: string;
  type: string;
  status: [Status];
}

export abstract class TrackerHelper {
  public static async returnFrom(codes: Array<string>): Promise<Array<rawTracks>> {
    const res:Array<any> = await rastrearEncomendas(codes);
    return res.map((track): rawTracks => {
      return {
        code: track.codObjeto,
        type: track.tipoPostal.categoria,
        status: track.eventos.map((status: any): Status => {
          if(status.unidadeDestino) {
            return {
              code: status.codigo,
              description: status.descricao,
              dateTime: new Date(status.dtHrCriado),
              unity: {
                city: status.unidade.endereco.cidade,
                state: status.unidade.endereco.uf,
                type: status.unidade.tipo
              },
              destiny: {
                city: status.unidadeDestino.endereco.cidade,
                state: status.unidadeDestino.endereco.uf,
                type: status.unidadeDestino.tipo
              }
            };
          } else {
            return {
              code: status.codigo,
              description: status.descricao,
              dateTime: new Date(status.dtHrCriado),
              unity: {
                city: status.unidade.endereco.cidade,
                state: status.unidade.endereco.uf,
                type: status.unidade.tipo
              }
            };
          }
        }).reverse(),
      };
    });
  }
}