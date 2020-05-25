import shortid from 'shortid'
import getPasswordHash from '../helpers/getPasswordHash'

export default class User {
  public id: string
  public email: string
  public password: string
  public name: string
  public createdAt: number

  constructor(email: string, passwordRaw: string, name: string) {
    this.id = shortid.generate()
    this.email = email
    this.password = getPasswordHash(passwordRaw)
    this.name = name
    this.createdAt = Date.now()
  }
}
