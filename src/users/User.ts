export default class User {
  public createdAt: number

  constructor(
    public id: string,
    public email: string,
    public password: string,
    public name: string
  ) {
    this.createdAt = Date.now()
  }
}
