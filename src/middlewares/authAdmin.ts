import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (user: any) => {
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Usuario sin permiso' })
    }
    next()
  })(req, res, next)
}
