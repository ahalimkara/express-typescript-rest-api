import { Request, Response } from 'express'

import Idea from '../Idea'
import { findAll } from '../dataSource'

export default async function (req: Request, res: Response) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)

    const ideas: Idea[] = await findAll(page)

    res.status(200).send(ideas.map((i) => i.toJSON()))
  } catch (error) {
    // TODO log

    res.status(404).send({ message: error.message })
  }
}
