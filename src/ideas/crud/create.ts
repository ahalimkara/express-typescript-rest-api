import { Request, Response } from 'express'

import Idea from '../Idea'
import { insert } from '../dataSource'
import verifyIdeaParams from '../../helpers/verifyIdeaParams'

async function createIdea({
  content,
  impact,
  ease,
  confidence,
}: {
  content: any
  impact: any
  ease: any
  confidence: any
}): Promise<Idea> {
  verifyIdeaParams({ content, impact, ease, confidence })

  const id = 'TODO' // TODO
  const idea = new Idea(id, content, impact, ease, confidence)

  await insert(idea)

  return idea
}

export default async function create(req: Request, res: Response) {
  try {
    const idea = await createIdea(req.body)

    res.status(201).send(idea.toJSON())
  } catch (error) {
    // TODO log

    res.status(400).send({ message: error.message })
  }
}
