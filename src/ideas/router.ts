import express, { Request, Response } from 'express'
import createIdea from './create'
import Idea from './Idea'

export const ideasRouter = express.Router()

ideasRouter.post('/', async (req: Request, res: Response) => {
  try {
    const idea: Idea = await createIdea(req.body)

    res.sendStatus(201).send(idea)
  } catch (error) {
    // TODO log

    res.status(400).send(error.message)
  }
})
