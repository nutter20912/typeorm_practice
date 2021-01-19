import { Context } from 'koa';
import { getManager } from 'typeorm';
import { User } from '../entity/User';
import ResourceNotFound from '../exception/ResourceNotFound';

class UserAction {
  /**
   * 查詢
   *
   * @param context 上下文
   */
  public async show(context: Context): Promise<void> {
    const user = await getManager().findOne(User, context.params.id);

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
    const user = new User();
    user.setName(name)
      .setCash(0);

    await getManager().save(user);

    context.body = {
      result: 'ok',
      res: user,
    };
  }
}

export default new UserAction();
