import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (user: any) => {
    if (!user) {
      return res.status(401).json({ message: 'Sin autenticación' })
    }
    next()
  })(req, res, next)
}
