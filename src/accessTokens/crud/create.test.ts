import { Request, Response } from 'express'

import create from './create'
import { find } from '../../users/dataSource'
import { generateToken } from '../../helpers/Authentication'
import Token from '../Token'
import User from '../../users/User'

jest.mock('../../users/dataSource')
jest.mock('../../helpers/Authentication')

const mockFind = find as jest.MockedFunction<any>
const mockGenerateToken = generateToken as jest.MockedFunction<any>

describe('create accessToken', () => {
  const send = jest.fn()
  const status = jest.fn()
  const res = ({ status, send } as unknown) as Response
  status.mockReturnValue(res)

  beforeEach(() => {
    jest.clearAllMocks()
    mockGenerateToken.mockReset()
  })

  it('should throw error when email is missed', async () => {
    const req = { body: {} } as Request

    await create(req, res)

    expect(status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalledWith({
      message: 'Email address is required',
    })
  })

  it('should throw error when password is missed', async () => {
    const req = { body: { email: 'a@b.c' } } as Request

    await create(req, res)

    expect(status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalledWith({
      message: 'Password is required',
    })
  })

  it('should throw error when email and password are mismatched', async () => {
    const email = 'a@b.c'
    const password = '123'
    const req = { body: { email, password } } as Request

    await create(req, res)

    expect(status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalledWith({
      message: 'Email address and password are mismatched',
    })
  })

  it('should generate token successfully', async () => {
    const email = 'a@b.c'
    const password = '123'
    const user = new User(email, password, '')
    const token = new Token(user.id, 'accessToken', 'refreshToken')
    const req = { body: { email, password } } as Request
    mockFind.mockResolvedValue(user)
    mockGenerateToken.mockResolvedValue(token)

    await create(req, res)

    expect(status).toHaveBeenCalledWith(201)
    expect(send).toHaveBeenCalledWith(token.toJSON())
  })
})
