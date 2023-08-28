import { User } from '../entities/User'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import dotenv from 'dotenv'

dotenv.config()

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
}

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findOneBy({ id: parseInt(payload.id) })
    if (user) {
      return done(user, user)
    }
    return done(user, false)
  } catch (error) {
    console.log(error)
  }
})
