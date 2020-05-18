import ApiError from './ApiError'

export default class NotFound extends ApiError {
  constructor(public message: string = 'Resource not found') {
    super(message, 404)
  }
}
