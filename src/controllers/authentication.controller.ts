import { Request, Response } from 'express'
import { User } from '../entities/User'
import { Wallet } from '../entities/Wallet'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { toNewUserEntry } from '../utils/types.user.util'
import dotenv from 'dotenv'
import { generarCode, generarFechaExp } from '../controllers/wallet.controller'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET_KEY!
const jwtRefreshTokenSecret = process.env.JWT_SECRET_KEY_REFRESH!
const refreshTokens: Array<string | undefined> = []

export const signUp = async (req: Request, res: Response) => {
  try {
    const typeUser = toNewUserEntry(req.body)
    const user = await User.findOneBy({ email: typeUser.email })
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }
    const newUser = new User()
    newUser.fullname = typeUser.fullname
    newUser.dni = typeUser.dni
    newUser.email = typeUser.email
    newUser.password = await createHash(typeUser.password)
    newUser.role = typeUser.role
    if (newUser.role === 'client') {
      const wallet = new Wallet()
      wallet.balance = 0
      wallet.code = generarCode(process.env.CODE_DIGITS_NUNBER)
      wallet.expAt = generarFechaExp(process.env.CODE_EXPIRE_TIME)
      wallet.user = newUser
      await newUser.save()
      await wallet.save()
      return res.status(201).json({ credentials: createToken(newUser) })
    } else {
      return res.status(404).json({ message: 'El usuario no es cliente' })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Por favor. Envía tu correo y contraseña' })
  }
  const user = await User.findOneBy({ email })
  if (!user) {
    return res.status(400).json({ message: 'El usuario no existe' })
  }
  const isMatch = await comparePassword(user, password)
  if (isMatch) {
    return res.status(201).json({ credentials: createToken(user) })
  }
  return res.status(400).json({
    message: 'El correo o la contraseña son incorrectas'
  })
}

const createToken = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role
    },
    jwtSecret,
    {
      expiresIn: '86400s'
    }
  )
  const refreshToken = jwt.sign(
    { fullname: user.fullname, email: user.email, role: user.role },
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
          message: 'Token no encontrado'
        }
      ]
    })
  }
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          message: 'Token de actualización no válido'
        }
      ]
    })
  }
  try {
    const user = jwt.verify(refreshToken, jwtRefreshTokenSecret)
    const { email } = user as any
    const userFound = (await User.findOneBy({ email })) as User
    if (!userFound) {
      return res.status(400).json({ message: 'El usuario no existe' })
    }
    const accessToken = jwt.sign(
      {
        id: userFound.id,
        fullname: userFound.fullname,
        email: userFound.email,
        role: userFound.role
      },
      jwtSecret,
      { expiresIn: '300s' }
    )
    res.status(201).json({ accessToken })
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          message: 'Token inválido'
        }
      ]
    })
  }
}
