export class BotConnectionError extends Error {
  public code: string | null;
  constructor(err: string | any = 'Falha de conexão com a API do Telegram!') {
    if(typeof err === typeof '') {
      super(<string>err);
      this.code = '1';
    } else {
      let message = err.message;
      super(message);
      this.code = null;
    }
  }
}