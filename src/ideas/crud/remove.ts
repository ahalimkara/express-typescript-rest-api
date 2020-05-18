import { Request, Response } from 'express'

import { remove } from '../dataSource'

export default async function (req: Request, res: Response) {
  try {
    await remove(req.params.id)

    res.sendStatus(204)
  } catch (error) {
    // TODO log

    res.status(400).send({ message: error.message })
  }
}
