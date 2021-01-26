export default class ResourceNotFound extends Error {
  /**
   * @var 錯誤訊息
   */
  private msg: string;

  /**
   * @var 錯誤代碼
   */
  private code: string;

  public constructor(msg: string, code: string) {
    super(msg);
    this.code = code;
  }
}
