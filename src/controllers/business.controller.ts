import { Request, Response } from 'express'
import { Business } from '../entities/Business'
import { User } from '../entities/User'

export const getBusinesses = async (req: Request, res: Response) => {
  try {
    const bussiness = await Business.find({
      relations: { user: true, transaction: true }
    })
    return res.status(200).json(bussiness)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}

export const getBusiness = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const bussiness = await Business.findOne({
      where: { id: parseInt(id) },
      relations: ['user', 'transaction']
    })
    if (bussiness == null)
      return res.status(404).json({ messagge: 'Business Not Found' })
    return res.status(200).json(bussiness)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const createBusiness = async (req: Request, res: Response) => {
  const { name, balance, location, type, idUser } = req.body

  try {
    const user = await User.findOneBy({ id: parseInt(idUser) })
    if (user != null) {
      const business = new Business()
      business.name = name
      business.balance = balance
      business.location = location
      business.type = type
      business.user = idUser
      await business.save()
      return res.status(201).json(business)
    } else {
      return res.status(404).json({ messagge: 'User Not Exist' })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const updateBusiness = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const business = await Business.findOneBy({ id: parseInt(id) })
    if (business == null)
      return res.status(404).json({ messagge: 'Business Not Found' })
    await Business.update({ id: parseInt(id) }, req.body)
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
export const deleteBusiness = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Business.delete({ id: parseInt(id) })
    if (result.affected === 0)
      return res.status(404).json({ messagge: 'Business Not Found' })
    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ messagge: error.message })
    }
  }
}
