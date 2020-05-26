import verifyIdeaParams from './verifyIdeaParams'

describe('verifyIdeaParams', () => {
  it('should throw error if content is invalid', async () => {
    const impact = 1
    const ease = 2
    const confidence = 3
    const error = 'Content should be a valid string min 1 char, max 255 chars'

    expect(() => {
      verifyIdeaParams({ content: '', impact, ease, confidence })
    }).toThrowError(error)
    expect(() => {
      verifyIdeaParams({ content: 1, impact, ease, confidence })
    }).toThrowError(error)
    expect(() => {
      verifyIdeaParams({ content: '1'.repeat(256), impact, ease, confidence })
    }).toThrowError(error)
  })

  it('should throw error if impact is invalid', async () => {
    const content = '1'
    const ease = 2
    const confidence = 3
    const error = 'Impact score should a valid integer between 1 to 10'

    expect(() => {
      verifyIdeaParams({ content, impact: 0, ease, confidence })
    }).toThrowError(error)
  })

  it('should throw error if ease is invalid', async () => {
    const content = '1'
    const impact = 2
    const confidence = 3
    const error = 'Ease score should a valid integer between 1 to 10'

    expect(() => {
      verifyIdeaParams({ content, impact, ease: 0, confidence })
    }).toThrowError(error)
  })

  it('should throw error if confidence is invalid', async () => {
    const content = '1'
    const impact = 2
    const ease = 3
    const error = 'Confidence score should a valid integer between 1 to 10'

    expect(() => {
      verifyIdeaParams({ content, impact, ease, confidence: 0 })
    }).toThrowError(error)
  })

  it('should not throw error when all params are valid', async () => {
    const content = '1'
    const impact = 1
    const ease = 2
    const confidence = 3

    expect(() => {
      verifyIdeaParams({ content, impact, ease, confidence })
    }).not.toThrowError()
  })
})
