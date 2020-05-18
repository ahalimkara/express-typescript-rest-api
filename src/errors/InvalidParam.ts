export default class InvalidParam extends Error {
  constructor(public message: string = 'Specified param is invalid') {
    super(message)
  }
}
