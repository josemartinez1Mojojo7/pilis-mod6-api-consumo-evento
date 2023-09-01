import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { Wallet } from './entities/Wallet'
import { Business } from './entities/Business'
import { Transaction } from './entities/Transaction'
import { User } from './entities/User'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port:
    process.env.DB_PORT != null ? parseInt(process.env.DB_PORT, 10) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [Wallet, Business, Transaction, User],
  timezone: '+03:00'
})
