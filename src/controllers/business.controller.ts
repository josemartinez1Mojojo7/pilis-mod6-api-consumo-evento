import { Request, Response } from 'express'
import { Business } from '../entities/Business'
import { User } from '../entities/User'
import {
  toNewBusinessEntry,
  toUpdateBusinessEntry
} from '../utils/types.business.util'
import dotenv from 'dotenv'

dotenv.config()

async function verifLocation(location: number) {
  const bussinessLocation = await Business.findOneBy({ location })
  return bussinessLocation === null
}

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
  try {
    const typeBusiness = toNewBusinessEntry(req.body)
    const maxLocations = parseInt(process.env.MAX_LOCATIONS!)
    const totalCount = Business.count()
    const user = await User.findOneBy({
      id: typeBusiness.idUser
    })
    if (user == null)
      return res.status(404).json({ messagge: 'User Not Exist' })
    if (user.role !== 'seller')
      return res.status(404).json({ messagge: 'User is Not Seller ' })
    if ((await totalCount) >= maxLocations)
      return res.status(401).json({ message: 'Capacidad de locales llenos' })

    if (await verifLocation(typeBusiness.location)) {
      const business = new Business()
      business.name = typeBusiness.name
      business.balance = 0
      business.location = typeBusiness.location
      business.type = typeBusiness.type
      business.user = user
      await business.save()
      return res.status(201).json(business)
    } else {
      return res.status(401).json({ message: 'Ubicacion ya asignada' })
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
    const typeBusiness = toUpdateBusinessEntry(req.body)
    const business = await Business.findOneBy({ id: parseInt(id) })
    if (business == null)
      return res.status(404).json({ messagge: 'Business Not Found' })
    if (await verifLocation(typeBusiness.location)) {
      const auxBusiness = new Business()
      auxBusiness.name = typeBusiness.name
      auxBusiness.location = typeBusiness.location
      auxBusiness.type = typeBusiness.type
      await Business.update({ id: parseInt(id) }, auxBusiness)
      return res.sendStatus(204)
    } else {
      return res.status(401).json({ message: 'Ubicacion ya asignada' })
    }
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
