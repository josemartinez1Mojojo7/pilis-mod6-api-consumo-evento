import { User } from '../entities/User'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
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

export const validateRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('jwt', { session: false }, (user: any) => {
    if (user.role !== 'vendedor' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Rol de usuario no valido' })
    }
    next()
  })(req, res, next)
}
