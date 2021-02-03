import { injectable } from 'inversify';
import { Context } from 'koa';
import ResourceNotFound from '../exception/ResourceNotFound';
import { User } from '../models/User.model';
import { Controller } from '../contracts/Controller';

@injectable()
export default class UserAction implements Controller {
  public getRoutes() {
    return [
      { method: 'post', path: '/user', action: this.store },
      { method: 'get', path: '/user/:id', action: this.show },
    ];
  }

  /**
   * 查詢
   *
   * @param context 上下文
   */
  public async show(context: Context): Promise<object> {
    const user = await User.findOne({ where: { id: context.params.id } });

    if (!user) {
      throw new ResourceNotFound('User not found', 'A001');
    }

    return {
      result: 'ok',
      res: user,
    };
  }

  /**
   * 新增
   *
   * @param context 上下文
   */
  public async store(context: Context): Promise<object> {
    const { name } = context.request.body;

    const user = await User.create({
      name,
      cash: 0,
      version: 1,
    });

    return {
      result: 'ok',
      res: user,
    };
  }
}
