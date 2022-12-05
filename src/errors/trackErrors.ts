export class TrackCreateError extends Error {
  public code: string | null;
  constructor(err: string | any = 'Falha ao criar a Track!') {
    if (typeof err === typeof '') {
      super(<string>err);
      this.code = '1';
    } else {
      let message = err.message;
      if (err.name === 'ValidationError') {
        for (let prop in err.errors) {
          message = err.errors[prop].message;
        }
        super(message);
        this.code = '2';
      } else {
        super(message);
        this.code = null;
      }
    }
  }
}
