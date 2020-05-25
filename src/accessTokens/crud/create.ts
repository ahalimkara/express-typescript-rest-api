import { Request, Response } from 'express'

import { find } from '../../users/dataSource'
import logger from '../../helpers/logger'
import InvalidParam from '../../errors/InvalidParam'
import { generateToken } from '../../helpers/Authentication'
import getPasswordHash from '../../helpers/getPasswordHash'
import Token from '../Token'

async function createToken({
  email,
  password,
}: {
  email: any
  password: any
}): Promise<Token> {
  if (!email) {
    throw new InvalidParam('Email address is required')
  }
  if (!password) {
    throw new InvalidParam('Password is required')
  }

  const passwordHash = getPasswordHash(password)
  const user = await find(email, passwordHash)
  if (!user) {
    throw new InvalidParam('Email address and password are mismatched')
  }

  const token = generateToken(user.id)

  return token
}

export default async function create(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const token = await createToken(req.body)

    res.status(201).send(token.toJSON())
  } catch (error) {
    logger.error(error.message)

    res.status(400).send({ message: error.message })
  }
}
