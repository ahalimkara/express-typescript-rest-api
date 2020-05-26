import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'

const errorHandler = (
  error: ApiError,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const status = error.statusCode || 500
  const message = error.message || 'Something went wrong!'

  response.status(status).send(message)
}

export default errorHandler
