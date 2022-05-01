import DateTimeConverter from "../helpers/DateTimeConverter.js";

class TrackView {
  constructor() {
    throw new Error('A classe TrackView não deve ser instanciada!');
  }

  static completeFormat(track) {
    let response = `&#x1F4E6;  <b>${track.description}  |  ID: ${track.id}</b>
<code>${track.code}</code>  &#x2B05;  clique para copiar

Última atualização: 
<i>${track.status}</i>

&#x1F4C5;  ${DateTimeConverter.convert(track.data)}  |  &#x1F551;  ${track.hora.slice(0, -3)}`;
    if (!track.local) {
      response += `
&#x1F6EB;  ${track.origem}
&#x1F6EC;  ${track.destino}`;
    } else {
      response += `
&#x2705;  ${track.local}`;
    }
    return response;
  }

  static idListFormat(arr) {
    return `&#x2139;  Lista de rastreios  &#x2139;

${arr.map(track => {
  if (track.status) {
    return `&#x1F4E6;  <b>${track.description}  |  ID: ${track.id}</b>`;
  } else {
    return `&#x274C;  <b><s>${track.description}</s>  |  ID: ${track.id}</b>`;
  }
}).join('\n')}`;
  }

  static error(err) {
    return `&#x274C;  ERROR  &#x274C;
${err}`
  }

  static untrackedFormat(track) {
    return `&#x274C;  <b>${track.description}  |  ID: ${track.id}</b>
<code>${track.code}</code>  &#x2B05;  clique para copiar

Última atualização: 
<i>Não há registros no sistema!</i>

Porfavor, considere verificar novamente o código.`;
  }

  static smallFormat(track) {
    if(track.status) {
      return `&#x1F4E6;  <b>${track.description}  |  ID: ${track.id}</b>
<code>${track.code}</code>  &#x2B05;  clique para copiar`;
    } else {
      return `&#x274C;  <b>${track.description}  |  ID: ${track.id}</b>
<code>${track.code}</code>  &#x2B05;  clique para copiar`;
    }
  }
}

export default TrackView;