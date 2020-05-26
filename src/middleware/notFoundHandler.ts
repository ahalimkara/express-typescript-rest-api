import { NextFunction, Request, Response } from 'express'

const notFoundHandler = (
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const message = 'Resource not found'

  response.status(404).send(message)
}

export default notFoundHandler
