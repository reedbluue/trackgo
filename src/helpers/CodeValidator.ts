const regex = /^[a-z]{2}\d{9}[a-z]{2}$/i;

export abstract class CodeValidator {
  public static check(code: string): boolean {
    return regex.test(code);
  }
}