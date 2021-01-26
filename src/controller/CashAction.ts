import { Context } from 'koa';
import ResourceNotFound from '../exception/ResourceNotFound';
import { User as UserEntity } from '../entity/User.entity';
import { Record as RecordEntity } from '../entity/Record.entity';
import { User as UserModel } from '../models/User.model';
import { Record as RecordModel } from '../models/Record.model';

class CashAction {
  /**
   * typeOrm 增額.悲觀鎖
   *
   * @param context 上下文
   */
  public async addByTypeOrm(context: Context): Promise<void> {
    const { id } = context.params;
    const { diff, operator } = context.request.body;
    const { typeorm: conn } = context;

    const result = await conn.transaction(async (t) => {
      const user = await t.findOne(UserEntity, id, { lock: { mode: 'pessimistic_write' } });

      if (!user) {
        throw new ResourceNotFound('User not found', 'A001');
      }

      const cash = Number(user.getCash()) + Number(diff);

      t.createQueryBuilder()
        .update(UserEntity)
        .set({ cash })
        .where('id = :id', { id })
        .execute();

      const record = new RecordEntity();
      record.setOperator(operator)
        .setDiff(diff)
        .setCurrent(cash)
        .setUser(user);
      await t.save(record, { reload: false });

      return user;
    });

    context.body = {
      result: 'ok',
      res: result,
    };
  }

  /**
   * Sequelize 增額.悲觀鎖
   *
   * @param context 上下文
   */
  public async addBySequelizeOrm(context: Context): Promise<void> {
    const { id } = context.params;
    const { diff, operator } = context.request.body;
    const { sequelize: conn } = context;

    const result = await conn.transaction(async (t) => {
      const user = await UserModel.findOne({
        where: { id },
        transaction: t,
        lock: true,
      });

      if (!user) {
        throw new ResourceNotFound('User not found', 'A001');
      }

      user.setCash(Number(user.getCash()) + Number(diff));

      const record = {
        operator,
        diff,
        current: user.getCash(),
        userId: user.getId(),
      };

      await user.save({ transaction: t });
      await RecordModel.create(record, { transaction: t });

      return user;
    });

    context.body = {
      result: 'ok',
      res: result,
    };
  }

  /**
   * Sequelize 增額.樂觀鎖
   *
   * @param context 上下文
   */
  public async addOrFail(context: Context): Promise<void> {
    const { id } = context.params;
    const { diff, operator } = context.request.body;
    const { sequelize: conn } = context;

    const user = await UserModel.findOne({ where: { id } });

    if (!user) {
      throw new ResourceNotFound('User not found', 'A001');
    }

    const result = await conn.transaction(async (t) => {
      user.setCash(Number(user.getCash()) + Number(diff));
      const record = {
        operator,
        diff,
        current: user.getCash(),
        userId: user.getId(),
      };

      await RecordModel.create(record, { transaction: t });
      await user.save({ transaction: t });

      return user;
    });

    context.body = {
      result: 'ok',
      res: result,
    };
  }
}

export default new CashAction();
