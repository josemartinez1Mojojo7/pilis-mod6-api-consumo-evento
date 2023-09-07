import { Request, Response } from 'express'
import { User } from '../entities/User'
import { createHash } from './authentication.controller'
import { toNewUserEntry, toUpdateUserEntry } from '../utils/types.user.util'
import { NonSensitiveInfoUserEntry, UserEntry } from '../utils/types.user'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    const auxusers: UserEntry[] = users as UserEntry[]
    const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoUserEntry[] => {
      return auxusers.map(({ id, fullname, dni, email, role }) => {
        return { id, fullname, dni, email, role }
      })
    }
    return res.status(200).json(getEntriesWithoutSensitiveInfo())
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findOneBy({ id: parseInt(id) })
    if (user == null) return res.status(404).json({ message: 'User Not Found' })
    const auxuser: UserEntry = user as UserEntry
    const getEntryWithoutSensitiveInfo = (): NonSensitiveInfoUserEntry => {
      const { password, ...resOfUser } = auxuser
      return resOfUser
    }
    return res.status(200).json(getEntryWithoutSensitiveInfo())
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
export const createUser = async (req: Request, res: Response) => {
  try {
    const typeUser = toNewUserEntry(req.body)
    const user = new User()
    user.fullname = typeUser.fullname
    user.dni = typeUser.dni
    user.email = typeUser.email
    user.password = await createHash(typeUser.password)
    user.role = typeUser.role
    await user.save()
    return res.status(201).json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const typeUser = toUpdateUserEntry(req.body)
    const user = await User.findOneBy({ id: parseInt(id) })
    if (user == null) return res.status(404).json({ message: 'User Not Found' })
    const auxUser = new User()
    auxUser.fullname = typeUser.fullname
    auxUser.dni = typeUser.dni
    auxUser.email = typeUser.email
    if (typeUser.password) {
      auxUser.password = await createHash(typeUser.password)
    }
    auxUser.role = typeUser.role
    await User.update({ id: parseInt(id) }, auxUser)
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await User.delete({ id: parseInt(id) })
    if (result.affected === 0)
      return res.status(404).json({ message: 'User Not Found' })
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
