import { Request, Response } from 'express'

import { remove } from '../dataSource'
import logger from '../../helpers/logger'

export default async function (req: Request, res: Response): Promise<void> {
  try {
    await remove(req.params.id)

    res.sendStatus(204)
  } catch (error) {
    logger.error(error.message)

    res.status(error.statusCode).send({ message: error.message })
  }
}
