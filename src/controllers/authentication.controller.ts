import { Request, Response } from 'express'
import { User } from '../entities/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const jwtSecret = 'somesecrettoken'
const jwtRefreshTokenSecret = 'somesecrettokenrefresh'
const refreshTokens: Array<string | undefined> = []

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { fullname, dni, email, password, role } = req.body
  if (!fullname || !dni || !email || !password || !role) {
    return res.status(400).json({ msg: 'Please. Send your data' })
  }
  const user = await User.findOneBy({ email })
  if (user) {
    return res.status(400).json({ msg: 'The User already Exists' })
  }
  const newUser = new User()
  newUser.fullname = fullname
  newUser.dni = dni
  newUser.email = req.body.email
  newUser.password = await createHash(req.body.password)
  newUser.role = role
  await newUser.save()
  return res.status(201).json({ credentials: createToken(newUser) })
}

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please. Send your email and password' })
  }
  const user = await User.findOneBy({ email })
  if (!user) {
    return res.status(400).json({ msg: 'The User does not exists' })
  }
  const isMatch = await comparePassword(user, password)
  if (isMatch) {
    return res.status(201).json({ credentials: createToken(user) })
  }
  return res.status(400).json({
    msg: 'The email or password are incorrect'
  })
}

const createToken = (user: User) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    {
      expiresIn: '86400s'
    }
  )
  const refreshToken = jwt.sign(
    { email: user.email, role: user.role },
    jwtRefreshTokenSecret,
    {
      expiresIn: '1d'
    }
  )
  refreshTokens.push(refreshToken)
  return {
    token,
    refreshToken
  }
}

const comparePassword = async (
  user: User,
  password: string
): Promise<boolean> => {
  return await bcrypt.compare(password, user.password)
}

export const createHash = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export const refresh = async (req: Request, res: Response): Promise<any> => {
  const refreshToken = req.body.refresh
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: 'Token not found'
        }
      ]
    })
  }
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: 'Invalid refresh token'
        }
      ]
    })
  }
  try {
    const user = jwt.verify(refreshToken, jwtRefreshTokenSecret)
    const { email } = user as any
    const userFound = (await User.findOneBy({ email })) as User
    if (!userFound) {
      return res.status(400).json({ msg: 'The User does not exists' })
    }
    const accessToken = jwt.sign(
      { id: userFound.id, email: userFound.email, role: userFound.role },
      jwtSecret,
      { expiresIn: '300s' }
    )
    res.status(201).json({ accessToken })
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: 'Invalid token'
        }
      ]
    })
  }
}
