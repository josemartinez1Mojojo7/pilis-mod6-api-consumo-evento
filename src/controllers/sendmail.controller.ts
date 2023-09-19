import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const createEmail = async (req: Request, res: Response) => {
  try {
    const { email, subject, message } = req.body
    await sentMail(email, subject, message)
    return res.status(200).json({ message: 'You email is on the way' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

const sentMail = async (email: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASSWORD
    }
  })
  await transporter.sendMail({
    from: `Consumo en Evento <${process.env.TRANSPORTER_EMAIL}>`,
    to: email,
    subject,
    text
  })
}
