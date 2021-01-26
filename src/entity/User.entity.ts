import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Record } from './Record.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  private id: number;

  @VersionColumn()
  private version: number;

  @OneToMany(() => Record, (record) => record.getUser, { cascade: true })
  @JoinTable()
  private records: Record[];

  @Column({ name: 'name', type: 'varchar', length: 100, unique: true, comment: '名稱' })
  private name: string;

  @Column({ name: 'cash', type: 'decimal', precision: 10, scale: 2, comment: '額度' })
  private cash: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', comment: '建立時間' })
  private createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', comment: '更新時間' })
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
}
