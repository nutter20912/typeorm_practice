import { Context } from 'koa';
import ResourceNotFound from '../exception/ResourceNotFound';
import { User } from '../models/User.model';

class UserAction {
  /**
   * 查詢
   *
   * @param context 上下文
   */
  public async show(context: Context): Promise<void> {
    const user = await User.findOne({ where: { id: context.params.id } });

    if (!user) {
      throw new ResourceNotFound('User not found', 'A001');
    }

    context.body = {
      result: 'ok',
      res: user,
    };
  }

  /**
   * 新增
   *
   * @param context 上下文
   */
  public async store(context: Context): Promise<void> {
    const { name } = context.request.body;

    const user = await User.create({
      name,
      cash: 0,
      version: 1,
    });

    context.body = {
      result: 'ok',
      res: user,
    };
  }
}

export default new UserAction();
