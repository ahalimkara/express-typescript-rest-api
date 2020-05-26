import isValidPassword from './isValidPassword'

describe('isValidPassword', () => {
  it('should return false if missing lowercase', async () => {
    const password = 'ABC12345'
    const status = isValidPassword(password)

    expect(status).toBe(false)
  })

  it('should return false if missing uppercase', async () => {
    const password = 'abc12345'
    const status = isValidPassword(password)

    expect(status).toBe(false)
  })

  it('should return false if missing numbers', async () => {
    const password = 'ABCDabcd'
    const status = isValidPassword(password)

    expect(status).toBe(false)
  })

  it('should return false if length is less than 8', async () => {
    const password = 'ABC123'
    const status = isValidPassword(password)

    expect(status).toBe(false)
  })

  it('should return true for valid passwords', async () => {
    const password = 'ABC123ab'
    const status = isValidPassword(password)

    expect(status).toBe(true)
  })
})
