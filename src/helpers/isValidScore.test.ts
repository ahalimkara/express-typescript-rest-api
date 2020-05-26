import isValidScore from './isValidScore'

describe('isValidScore', () => {
  it('should return false if input is not number', async () => {
    const input = 'str'
    const status = isValidScore(input)

    expect(status).toBe(false)
  })

  it('should return false if input is not integer', async () => {
    const input = 1.2
    const status = isValidScore(input)

    expect(status).toBe(false)
  })

  it('should return false if input less than 1', async () => {
    const input = 0
    const status = isValidScore(input)

    expect(status).toBe(false)
  })

  it('should return false if input is greater than 10', async () => {
    const input = 11
    const status = isValidScore(input)

    expect(status).toBe(false)
  })

  it('should return true if input is valid', async () => {
    const input = 3
    const status = isValidScore(input)

    expect(status).toBe(true)
  })
})
