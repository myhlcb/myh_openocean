import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BaseEntity,
} from 'typeorm';

@Entity('tokens')
@Unique(['provider', 'chain', 'symbol', 'name'])
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: '渠道商',
  })
  public provider: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: '链',
  })
  public chain: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'code',
    comment: 'code',
  })
  public code: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'name',
    comment: 'name',
  })
  public name: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'address',
    comment: 'Address',
  })
  public address: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'symbol',
    comment: 'Symbol',
  })
  public symbol: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'decimals',
  })
  public decimals: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_time',
    comment: '创建时间',
  })
  public createdTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_time',
    comment: '更新时间',
  })
  public updatedTime: Date;
}
