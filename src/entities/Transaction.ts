import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne
} from 'typeorm'
import { Business } from './Business'
import { Wallet } from './Wallet'

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'datetime' })
  date: Date

  @Column('float', { precision: 10, scale: 2 })
  amount: number

  @Column()
  type: string

  @ManyToOne(() => Business, (business) => business.id)
  business: Business

  @ManyToOne(() => Wallet, (wallet) => wallet.id)
  wallet: Wallet
}
