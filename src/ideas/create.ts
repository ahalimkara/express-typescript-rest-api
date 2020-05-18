import Idea from './Idea'
import { insert } from './dataSource'
import InvalidParam from '../errors/InvalidParam'
import isValidScore from '../helpers/isValidScore'

const MAX_CONTENT_LENGTH = 255

export default async function createIdea({
  content,
  impact,
  ease,
  confidence,
}: {
  content: any
  impact: any
  ease: any
  confidence: any
}): Promise<Idea> {
  if (
    !content ||
    typeof content !== 'string' ||
    content.length > MAX_CONTENT_LENGTH
  ) {
    throw new InvalidParam(
      'Content param should be a valid string min 1 char, max 255 chars'
    )
  }
  if (!isValidScore(impact)) {
    throw new InvalidParam(
      'Impact param should a valid integer between 1 to 10'
    )
  }
  if (!isValidScore(ease)) {
    throw new InvalidParam(
      'Impact param should a valid integer between 1 to 10'
    )
  }
  if (!isValidScore(confidence)) {
    throw new InvalidParam(
      'Impact param should a valid integer between 1 to 10'
    )
  }

  const id = 'TODO' // TODO
  const idea = new Idea(id, content, impact, ease, confidence)

  await insert(idea)

  return idea
}
