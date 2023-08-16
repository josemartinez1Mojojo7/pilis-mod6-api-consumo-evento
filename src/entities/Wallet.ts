import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne
} from 'typeorm'
import { User } from './User'

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
