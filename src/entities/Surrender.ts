import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm'
import { Business } from './Business'

@Entity()
export class Surrender extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'datetime' })
  startAt: Date

  @Column({ type: 'datetime' })
  endAt: Date

  @Column('float', { precision: 10, scale: 2 })
  amount: number

  @ManyToOne(() => Business, (business) => business.id)
  business: Business
}
