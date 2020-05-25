import crypto from 'crypto'

// for simplicity md5 is used
export default function getPasswordHash(passwordRaw: string): string {
  return crypto.createHash('md5').update(passwordRaw).digest('hex')
}
