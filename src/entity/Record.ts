import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(() => User, user => user.getRecords)
  private user: User;

  @Column({ name: 'operator', type: 'varchar', length: 100, comment: '操作者' })
  private operator: string;

  @Column({ name: 'diff', type: 'decimal', precision: 10, scale: 2, comment: '異動額度' })
  private diff: number;

  @Column({ name: 'current', type: 'decimal', precision: 10, scale: 2, comment: '異動後額度' })
  private current: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', comment: '建立時間' })
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
}
