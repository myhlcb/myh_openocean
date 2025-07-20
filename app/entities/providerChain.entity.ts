import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
@Entity('provider_chains')
export class ProviderChain extends BaseEntity {
  @PrimaryGeneratedColumn() public id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
    name: 'chain_name',
    comment: 'EVM Chains',
  })
  public chainName: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    name: 'chain_code',
    comment: 'Chain Code',
  })
  public chainCode: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'chain_id',
    comment: 'uid',
  })
  public chainId: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    name: 'provider',
    comment: '供应商',
  })
  public providerName: string;

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
