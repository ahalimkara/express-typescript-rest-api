import getPasswordHash from './getPasswordHash'

describe('getPasswordHash', () => {
  it('should return md5 hash', async () => {
    const password = 'abc'
    const hash = getPasswordHash(password)

    expect(hash).toBe('900150983cd24fb0d6963f7d28e17f72')
  })
})
