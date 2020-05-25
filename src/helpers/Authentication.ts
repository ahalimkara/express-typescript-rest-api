import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

import Token from '../accessTokens/Token'

const tokens = []

// Ideally this should be implemented more secure with something like in this article: https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
// but for simplicity i will implement it with minimum requirements
export const generateToken = (id: string): Token => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
  const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN as string

  const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  })
  // ideally refresh token should be expired at some point but for simplicity it will not be implemented
  // also instead of uuid, a more secure and robust solution should be used
  const refreshToken = uuid()

  const token = new Token(id, accessToken, refreshToken)
  tokens.push(token)

  return token
}
