import { Context } from 'koa';
import { getConnection } from 'typeorm';
import { Record } from '../entity/Record';
import { User } from '../entity/User';
import ResourceNotFound from '../exception/ResourceNotFound';

class CashAction {
  /**
   * 增額.悲觀鎖
   *
   * @param context 上下文
   */
  public async add(context: Context): Promise<void> {
    const id = context.params.id;
    const { diff, operator } = context.request.body;

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, id, { lock: { mode: 'pessimistic_write' } });

      if (!user) {
        throw new ResourceNotFound('User not found', 'A001');
      }

      user.setCash(Number(user.getCash()) + Number(diff));
      await queryRunner.manager.save(user);

      const record = new Record();
      record.setOperator(operator)
        .setDiff(diff)
        .setCurrent(user.getCash())
        .setUser(user);
      await queryRunner.manager.save(record);
      await queryRunner.commitTransaction();

      context.body = {
        result: 'ok',
        res: user,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * 增額.樂觀鎖
   *
   * @param context 上下文
   */
  public async addOrFail(context: Context): Promise<void> {
    const id = context.params.id;
    const { diff, operator } = context.request.body;

    const queryRunner = getConnection().createQueryRunner();
    const fakeUser = await queryRunner.manager.findOne(User, id);

    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, id, {
        lock: {
          mode: 'optimistic',
          version: fakeUser.getVersion(),
        }
      });

      user.setCash(Number(user.getCash()) + Number(diff));
      await queryRunner.manager.save(user);

      const record = new Record();
      record.setOperator(operator)
        .setDiff(diff)
        .setCurrent(user.getCash())
        .setUser(user);
      await queryRunner.manager.save(record);
      await queryRunner.commitTransaction();

      context.body = {
        result: 'ok',
        res: user,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

export default new CashAction();
