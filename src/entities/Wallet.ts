import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany
} from 'typeorm'
import { User } from './User'
import { Transaction } from './Transaction'

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @OneToMany(() => Transaction, (transaction) => transaction.business)
  transaction: Transaction[]
}
