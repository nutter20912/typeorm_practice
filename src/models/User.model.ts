import Sequelize, { DataTypes, Model } from 'sequelize';
import { Record } from './Record.model';

export class User extends Model {
  /**
   * @var id
   */
  private id: number;

  /**
   * @var 版本號
   */
  private version: number;

  /**
   * @var 異動紀錄
   */
  private records: Record[];

  /**
   * @var 名稱
   */
  private name: string;

  /**
   * @var 現金額度
   */
  private cash: number;

  /**
   * @var 新增時間
   */
  private createdAt: Date;

  /**
   * @var 更新時間
   */
  private updatedAt: Date;

  /**
   * 取得id
   */
  public getId(): number {
    return this.id;
  }

  /**
   * 取得版本
   */
  public getVersion(): number {
    return this.version;
  }

  /**
   * 設定版本
   *
   * @param version 版本
   */
  public setVersion(version: number): User {
    this.version = version;

    return this;
  }

  /**
   * 取得異動紀錄
   */
  public getRecords(): Record[] {
    return this.records;
  }

  /**
   * 設定異動紀錄
   *
   * @param records 異動紀錄
   */
  public setRecords(records: Record[]): User {
    this.records = records;

    return this;
  }

  /**
   * 取得名稱
   */
  public getName(): string {
    return this.name;
  }

  /**
   * 設定名稱
   *
   * @param name 名稱
   */
  public setName(name: string): User {
    this.name = name;

    return this;
  }

  /**
   * 取得現金額度
   */
  public getCash(): number {
    return this.cash;
  }

  /**
   * 設定現金額度
   *
   * @param cash 現金額度
   */
  public setCash(cash: number): User {
    this.cash = cash;

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
  public setCreatedAt(createdAt: Date): User {
    this.createdAt = createdAt;

    return this;
  }

  /**
   * 取得更新時間
   */
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * 設定更新時間
   *
   * @param updatedAt 更新時間
   */
  public setUpdatedAt(updatedAt: Date): User {
    this.updatedAt = updatedAt;

    return this;
  }

  /**
   * 初始化model
   *
   * @param sequelize sequelize 實體
   */
  public static initModel(sequelize: Sequelize.Sequelize): typeof User {
    User.init({
      id: {
        autoIncrement: true,
        field: 'id',
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      version: {
        field: 'version',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        field: 'name',
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '名稱',
        unique: 'IDX_065d4d8f3b5adb4a08841eae3c',
      },
      cash: {
        field: 'cash',
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '額度',
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE(),
        allowNull: false,
        comment: '建立時間',
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE(),
        allowNull: false,
        comment: '更新時間',
      },
    }, {
      sequelize,
      tableName: 'user',
      timestamps: true,
      version: true,
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
          name: 'IDX_065d4d8f3b5adb4a08841eae3c',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'name' },
          ],
        },
      ],
    });

    return User;
  }
}
