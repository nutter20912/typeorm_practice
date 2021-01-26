import Sequelize, { DataTypes, Model } from 'sequelize';
import { User } from './User.model';

export class Record extends Model {
  /**
   * @var id
   */
  private id: number;

  /**
   * @var 使用者
   */
  private user: User;

  /**
   * @var 操作者
   */
  private operator: string;

  /**
   * @var 額度異動
   */
  private diff: number;

  /**
   * @var 交易餘額
   */
  private current: number;

  /**
   * @var 新增時間
   */
  private createdAt: Date;

  /**
   * 取得id
   */
  public getId(): number {
    return this.id;
  }

  /**
   * 取得使用者
   */
  public getUser(): User {
    return this.user;
  }

  /**
   * 設定使用者
   *
   * @param user 使用者
   */
  public setUser(user: User): Record {
    this.user = user;

    return this;
  }

  /**
   * 取得操作者
   */
  public getOperator(): string {
    return this.operator;
  }

  /**
   * 設定操作者
   *
   * @param operator 操作者
   */
  public setOperator(operator: string): Record {
    this.operator = operator;

    return this;
  }

  /**
   * 取得額度異動
   */
  public getDiff(): number {
    return this.diff;
  }

  /**
   * 設定額度異動
   *
   * @param diff 額度異動
   */
  public setDiff(diff: number): Record {
    this.diff = diff;

    return this;
  }

  /**
   * 取得交易餘額
   */
  public getCurrent(): number {
    return this.current;
  }

  /**
   * 設定交易餘額
   *
   * @param current 交易餘額
   */
  public setCurrent(current: number): Record {
    this.current = current;

    return this;
  }

  /**
   * 取得新增時間
   */
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * 設定新增時間
   *
   * @param createdAt 新增時間
   */
  public setCreatedAt(createdAt: Date): Record {
    this.createdAt = createdAt;

    return this;
  }

  /**
   * 初始化model
   *
   * @param sequelize sequelize 實體
   */
  public static initModel(sequelize: Sequelize.Sequelize): typeof Record {
    Record.init({
      id: {
        autoIncrement: true,
        field: 'id',
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      operator: {
        field: 'operator',
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '操作者',
      },
      diff: {
        field: 'diff',
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '異動額度',
      },
      current: {
        field: 'current',
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '異動後額度',
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE(),
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '建立時間',
      },
      userId: {
        field: 'userId',
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    }, {
      sequelize,
      tableName: 'record',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' },
          ],
        },
        {
          name: 'FK_8675cd3761984947c2506f39a25',
          using: 'BTREE',
          fields: [
            { name: 'userId' },
          ],
        },
      ],
    });

    return Record;
  }
}
