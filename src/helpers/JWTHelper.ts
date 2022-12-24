import jsonwebtoken, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { PRIVATE_KEY } = process.env;

export abstract class JWTHelper {
  public static generate(): string {
    return jsonwebtoken.sign({}, <Secret>PRIVATE_KEY, {
      expiresIn: '24h',
    });
  }

  public static validate(token: string): Boolean {
    return jsonwebtoken.verify(token, <Secret>PRIVATE_KEY) ? true : false;
  }
}
