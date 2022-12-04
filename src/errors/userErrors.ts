export class UserCreateError extends Error {
  public code: string | null;
  constructor(err: string | any = 'Falha ao cadastrar o usuário!') {
    if(typeof err === typeof '') {
      super(<string>err);
      this.code = '1';
    } else {
      let message = err.message;
      if(err.name === 'ValidationError') {
        for(let prop in err.errors) {
          message = err.errors[prop].message;
        }
        super(message);
          this.code = '2';
      } else if (err.name === 'MongoServerError') {
        switch (err.code) {
          case 11000:
            super('Usuário já cadastrado no sistema!');
            this.code = null;
            break;
          default:
            super(err.message);
            this.code = null;
            break;  
        }
      } else {
        super(message);
        this.code = null;
      }
    }
  }
}