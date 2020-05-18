import ApiError from './ApiError'

export default class InvalidParam extends ApiError {
  constructor(public message: string = 'Specified param is invalid') {
    super(message, 400)
  }
}
