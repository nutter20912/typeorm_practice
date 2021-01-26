import { Context, Next } from 'koa';

export default class HttpKernel {
  /**
   * Exception 例外處理
   * @param context 上下文
   * @param next 調用下層中間件
   */
  public async errorHandler(context: Context, next: Next): Promise<void> {
    try {
      await next();
    } catch (err) {
      context.status = err.status || 500;

      context.body = {
        result: 'error',
        code: err.code,
        msg: err.message,
      };
    }
  }
}
