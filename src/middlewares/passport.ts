import { User } from '../entities/User'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'somesecrettoken'
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

export const auth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (user: any) => {
    if (!user) {
      return res.status(401).json({ message: 'Sin autenticación' })
    }
    next()
  })(req, res, next)
}

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (user: any) => {
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Usuario sin permiso' })
    }
    next()
  })(req, res, next)
}
