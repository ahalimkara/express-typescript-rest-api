import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

import Token from '../accessTokens/Token'
import InvalidParam from '../errors/InvalidParam'
import { Request, Response } from 'express'
import { findById } from '../users/dataSource'
import User from '../users/User'
import logger from './logger'

const tokens: Token[] = []

// Ideally this should be implemented more secure with something like in this article: https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
// but for simplicity i will implement it with minimum requirements
const generateAccessToken = (userId: string): string => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
  const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN as string

  const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  })

  return accessToken
}

export const generateToken = (userId: string): Token => {
  const accessToken = generateAccessToken(userId)

  // ideally refresh token should be expired at some point but for simplicity it will not be implemented
  // also instead of uuid, a more secure and robust solution should be used
  const refreshToken = uuid()

  const token = new Token(userId, accessToken, refreshToken)
  tokens.push(token)

  return token
}

export const refreshToken = (refreshToken: string): Token => {
  const token = tokens.find((t: Token) => t.refreshToken === refreshToken)

  if (!token) {
    throw new InvalidParam('Refresh token is not found')
  }

  token.accessToken = generateAccessToken(token.userId)

  return token
}

export const removeToken = (refreshToken: string): void => {
  const tokenIndex = tokens.findIndex(
    (t: Token) => t.refreshToken === refreshToken
  )

  if (tokenIndex < 0) {
    throw new InvalidParam('Refresh token is not found')
  }

  tokens.splice(tokenIndex, 1)
}

export const authorizeMiddleware = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

  const accessToken = req.get('X-Access-Token') as string

  let payload
  try {
    payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as {
      userId: string
    }
  } catch (error) {
    logger.debug('Authorization failed', { error })
  }

  if (payload) {
    req.user = (await findById(payload.userId)) as User

    next()
  } else {
    res.status(403).send({ message: 'Unauthorized' })
  }
}
