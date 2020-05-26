import isValidEmail from './isValidEmail'

describe('isValidEmail', () => {
  it('should return false for missing @', async () => {
    const email = 'ab.c'
    const status = isValidEmail(email)

    expect(status).toBe(false)
  })

  it('should return false for missing tld', async () => {
    const email = 'a@b'
    const status = isValidEmail(email)

    expect(status).toBe(false)
  })

  it('should return false for whitespaces', async () => {
    const email = 'a\n@b.c'
    const status = isValidEmail(email)

    expect(status).toBe(false)
  })

  it('should return true for valid emails', async () => {
    const email = 'a@b.c'
    const status = isValidEmail(email)

    expect(status).toBe(true)
  })
})
