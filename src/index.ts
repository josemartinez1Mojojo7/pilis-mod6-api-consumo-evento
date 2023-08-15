import 'reflect-metadata'
import app from './app'
import { AppDataSource } from './db'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  try {
    await AppDataSource.initialize()
    console.log('Database conected..')
    app.listen(process.env.APP_PORT, () =>
      console.log(
        `App linstening on ${process.env.APP_HOST}:${process.env.APP_PORT}`
      )
    )
  } catch (error) {
    console.error(error)
  }
}

main()
