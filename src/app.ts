import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passportMiddleware from './middlewares/passport'
import passport from 'passport'

import routeAuthentication from './routes/authentication.route'
import routeUser from './routes/user.route'
import routeWallet from './routes/wallet.route'
import routeBusiness from './routes/business.route'
import routeTransaction from './routes/transaction.route'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
passport.use(passportMiddleware)

app.use('/api', routeAuthentication)
app.use('/api', routeUser)
app.use('/api', routeWallet)
app.use('/api', routeBusiness)
app.use('/api', routeTransaction)

export default app
