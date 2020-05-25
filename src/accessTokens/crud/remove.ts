import { Request, Response } from 'express'

import logger from '../../helpers/logger'
import { removeToken } from '../../helpers/Authentication'

export default async function (req: Request, res: Response): Promise<void> {
  try {
    await removeToken(req.body.refresh_token)

    res.sendStatus(204)
  } catch (error) {
    logger.error(error.message)

    res.status(error.statusCode).send({ message: error.message })
  }
}
