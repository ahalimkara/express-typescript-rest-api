/* eslint-disable @typescript-eslint/camelcase */
export default class Token {
  constructor(
    public userId: string,
    public accessToken: string,
    public refreshToken: string
  ) {}

  toJSON(): Record<string, string> {
    return {
      jwt: this.accessToken,
      refresh_token: this.refreshToken,
    }
  }
}
