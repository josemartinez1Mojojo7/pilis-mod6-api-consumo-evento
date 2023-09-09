import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fullname: string

  @Column({ unique: true })
  dni: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  role: string
}
