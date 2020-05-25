import { Request, Response } from 'express'

import logger from '../../helpers/logger'
import { refreshToken } from '../../helpers/Authentication'

export default async function refresh(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const token = await refreshToken(req.body.refresh_token)

    res.status(201).send({ jwt: token.accessToken })
  } catch (error) {
    logger.error(error.message)

    res.status(400).send({ message: error.message })
  }
}
