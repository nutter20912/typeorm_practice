export default class RuntimeException extends Error {
  private msg: string;
  private code: string;

  public constructor(msg, code) {
    super(msg);
    this.code = code;
  }
}
