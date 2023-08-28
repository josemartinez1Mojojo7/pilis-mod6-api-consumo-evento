import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './User'
import { Transaction } from './Transaction'

@Entity()
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('float', { precision: 10, scale: 2 })
  balance: number

  @Column()
  location: number

  @Column()
  type: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @OneToMany(() => Transaction, (transaction) => transaction.business)
  transaction: Transaction[]
}
