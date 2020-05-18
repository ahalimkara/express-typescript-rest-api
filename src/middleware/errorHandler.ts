import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'

const errorHandler = (
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500
  const message = error.message || 'Something went wrong!'

  response.status(status).send(message)
}

export default errorHandler
