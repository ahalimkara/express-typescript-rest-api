/* eslint-disable @typescript-eslint/camelcase */
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

  toJSON(): Record<string, number | string> {
    return {
      id: this.id,
      content: this.content,
      impact: this.impact,
      ease: this.ease,
      confidence: this.confidence,
      average_score: this.averageScore,
      created_at: this.createdAt,
    }
  }
}
