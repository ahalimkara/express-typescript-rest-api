import { Request, Response } from 'express'

export default function me(req: Request, res: Response): void {
  res.status(200).send(req.user?.toJSON())
}
