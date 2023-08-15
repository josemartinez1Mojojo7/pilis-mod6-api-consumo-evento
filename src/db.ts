import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
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
  entities: []
})
