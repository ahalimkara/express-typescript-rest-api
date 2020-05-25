import { Request, Response } from 'express'

import User from '../User'
import { findBy, insert } from '../dataSource'
import logger from '../../helpers/logger'
import isValidEmail from '../../helpers/isValidEmail'
import isValidPassword from '../../helpers/isValidPassword'
import InvalidParam from '../../errors/InvalidParam'
import { generateToken } from '../../helpers/Authentication'
import Token from '../../accessTokens/Token'

async function createUser({
  email,
  password,
  name,
}: {
  email: any
  password: any
  name: any
}): Promise<Token> {
  if (!isValidEmail(email)) {
    throw new InvalidParam('Email address should be valid')
  }
  if (!isValidPassword(password)) {
    throw new InvalidParam(
      'Password should be at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number'
    )
  }
  if (!name || typeof name !== 'string' || name.length > 255) {
    throw new InvalidParam(
      'Name should be a valid string min 1 char, max 255 chars'
    )
  }
  if (await findBy(email)) {
    throw new InvalidParam('Email address is already being used')
  }

  const user = new User(email, password, name)
  const token = generateToken(user.id)

  await insert(user)

  return token
}

export default async function create(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const token = await createUser(req.body)

    res.status(201).send(token.toJSON())
  } catch (error) {
    logger.error(error.message)

    res.status(400).send({ message: error.message })
  }
}
