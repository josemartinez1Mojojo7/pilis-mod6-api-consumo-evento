import { Request, Response } from 'express'
import { User } from '../entities/User'
import { createHash } from './authentication.controller'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findOneBy({ id: parseInt(id) })
    if (user == null)
      return res.status(404).json({ messagge: 'User Not Found' })
    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const createUser = async (req: Request, res: Response) => {
  const { fullname, email, dni, password, role } = req.body
  try {
    const user = new User()
    user.fullname = fullname
    user.dni = dni
    user.email = email
    user.password = await createHash(password)
    user.role = role
    await user.save()
    return res.status(201).json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { fullname, email, dni, password, role } = req.body
  try {
    const user = await User.findOneBy({ id: parseInt(id) })
    if (user == null)
      return res.status(404).json({ messagge: 'User Not Found' })
    const auxUser = new User()
    auxUser.fullname = fullname
    auxUser.dni = dni
    auxUser.email = email
    if (password) {
      auxUser.password = await createHash(password)
    }
    auxUser.role = role
    await User.update({ id: parseInt(id) }, auxUser)
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await User.delete({ id: parseInt(id) })
    if (result.affected === 0)
      return res.status(404).json({ messagge: 'User Not Found' })
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
