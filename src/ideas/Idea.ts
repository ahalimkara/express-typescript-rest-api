export default class Idea {
  public createdAt: number

  constructor(
    public id: string,
    public content: string,
    public impact: number,
    public ease: number,
    public confidence: number
  ) {
    this.createdAt = Date.now()
  }

  get averageScore(): number {
    return parseFloat(
      ((this.impact + this.ease + this.confidence) / 3).toFixed(2)
    )
  }
}
