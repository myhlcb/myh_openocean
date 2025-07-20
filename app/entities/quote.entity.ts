import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BaseEntity,
} from 'typeorm';

@Entity('quotes')
@Unique(['provider', 'chain', 'inTokenSymbol', 'outTokenSymbol', 'dex'])
export class Quote extends BaseEntity {
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
    name: 'in_token_address',
    comment: 'inToken Address',
  })
  public inTokenAddress: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'in_token_symbol',
    comment: 'inToken Symbol',
  })
  public inTokenSymbol: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'out_token_address',
    comment: 'outToken Address',
  })
  public outTokenAddress: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'out_token_symbol',
    comment: 'outToken Symbol',
  })
  public outTokenSymbol: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: 'dex',
  })
  public dex: string;
  @Column({
    type: 'decimal',
    precision: 32,
    scale: 16,
    name: 'swap_amount',
    comment: 'swapAmount',
  })
  public swapAmount: string;

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
