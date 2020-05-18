import { Request, Response } from 'express'

import Idea from '../Idea'
import { findAll } from '../dataSource'
import logger from '../../helpers/logger'

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)

    const ideas: Idea[] = await findAll(page)

    res.status(200).send(ideas.map((i) => i.toJSON()))
  } catch (error) {
    logger.error(error.message)

    res.status(404).send({ message: error.message })
  }
}
