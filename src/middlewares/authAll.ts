import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

export const authAll = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (user: any) => {
    if (
      user.role !== 'admin' &&
      user.role !== 'seller' &&
      user.role !== 'client'
    ) {
      return res.status(403).json({ message: 'Usuario sin permiso' })
    }
    next()
  })(req, res, next)
}
