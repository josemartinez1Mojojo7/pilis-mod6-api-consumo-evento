import { Request, Response } from 'express'
import { Surrender } from '../entities/Surrender'
import { Business } from '../entities/Business'
import { toNewSurrenderEntry } from '../utils/types.surrender.util'

export const getSurrender = async (req: Request, res: Response) => {
  let surrender
  try {
    surrender = await Surrender.find({
      relations: { business: true }
    })
    if (req.query.business) {
      const idBusiness = parseReqParam(req.query.business)
      surrender = await Surrender.find({
        relations: ['business'],
        where: {
          business: {
            id: idBusiness
          }
        }
      })
    }
    return res.status(200).json(surrender)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
export const createSurrender = async (req: Request, res: Response) => {
  try {
    const typeSurrender = toNewSurrenderEntry(req.body)
    const business = await Business.findOneBy({
      id: typeSurrender.idBusiness
    })
    if (business == null)
      return res.status(404).json({ message: 'Business Not Exist' })
    const surrender = new Surrender()
    surrender.startAt = generarFecha(typeSurrender.startAt)
    surrender.endAt = generarFecha(typeSurrender.endAt)
    surrender.amount = typeSurrender.amount
    surrender.business = business

    business.balance -= typeSurrender.amount
    await Business.update({ id: typeSurrender.idBusiness }, business)

    await surrender.save()
    return res.status(201).json(surrender)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

const generarFecha = (date: any) => {
  const fechaActual = new Date(date)
  fechaActual.setHours(fechaActual.getHours() - 3)
  return fechaActual
}
const parseReqParam = (ReqParam: any): number => {
  return parseInt(ReqParam)
}
