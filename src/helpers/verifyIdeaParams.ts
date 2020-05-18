import InvalidParam from '../errors/InvalidParam'
import isValidScore from '../helpers/isValidScore'

const MAX_CONTENT_LENGTH = 255

export default function verifyIdeaParams({
  content,
  impact,
  ease,
  confidence,
}: {
  content: any
  impact: any
  ease: any
  confidence: any
}): void {
  if (
    !content ||
    typeof content !== 'string' ||
    content.length > MAX_CONTENT_LENGTH
  ) {
    throw new InvalidParam(
      'Content should be a valid string min 1 char, max 255 chars'
    )
  }

  if (!isValidScore(impact)) {
    throw new InvalidParam(
      'Impact score should a valid integer between 1 to 10'
    )
  }

  if (!isValidScore(ease)) {
    throw new InvalidParam('Ease score should a valid integer between 1 to 10')
  }

  if (!isValidScore(confidence)) {
    throw new InvalidParam(
      'Confidence score should a valid integer between 1 to 10'
    )
  }
}
