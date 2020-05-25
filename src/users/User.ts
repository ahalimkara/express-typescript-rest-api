/* eslint-disable @typescript-eslint/camelcase */
import crypto from 'crypto'
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

  get avatarUrl(): string {
    const hash = crypto
      .createHash('md5')
      .update(this.email.trim())
      .digest('hex')
    return `https://www.gravatar.com/avatar/${hash}?s=200`
  }

  toJSON(): Record<string, string> {
    return {
      email: this.email,
      name: this.name,
      avatar_url: this.avatarUrl,
    }
  }
}
