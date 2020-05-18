import { Request, Response } from 'express'

import Idea from '../Idea'
import { find } from '../dataSource'
import verifyIdeaParams from '../../helpers/verifyIdeaParams'
import logger from '../../helpers/logger'

async function updateIdea({
  id,
  content,
  impact,
  ease,
  confidence,
}: {
  id: string
  content: any
  impact: any
  ease: any
  confidence: any
}): Promise<Idea> {
  const idea = await find(id)

  if (!idea) {
    throw new Error('Idea not found')
  }

  verifyIdeaParams({ content, impact, ease, confidence })

  idea.content = content
  idea.impact = impact
  idea.ease = ease
  idea.confidence = confidence

  return idea
}

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const idea = await updateIdea({ id: req.params.id, ...req.body })

    res.status(201).send(idea.toJSON())
  } catch (error) {
    logger.error(error.message)

    res.status(400).send({ message: error.message })
  }
}
