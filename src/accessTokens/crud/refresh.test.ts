/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express'

import refresh from './refresh'
import { refreshToken } from '../../helpers/Authentication'
import Token from '../Token'

jest.mock('../../helpers/Authentication')

const mockRefreshToken = refreshToken as jest.MockedFunction<any>

describe('refreshToken', () => {
  const send = jest.fn()
  const status = jest.fn()
  const res = ({ status, send } as unknown) as Response
  status.mockReturnValue(res)

  beforeEach(() => {
    jest.clearAllMocks()
    mockRefreshToken.mockReset()
  })

  it('should handle errors gracefully', async () => {
    const refresh_token = 'refresh_token'
    const req = { body: { refresh_token } } as Request
    const error = { message: 'Error message' }
    mockRefreshToken.mockRejectedValue(error)

    await refresh(req, res)

    expect(status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalledWith(error)
  })

  it('should refresh token successfully', async () => {
    const refresh_token = 'refresh_token'
    const req = { body: { refresh_token } } as Request
    const token = new Token('id', 'accessToken', 'refreshToken')
    mockRefreshToken.mockResolvedValue(token)

    await refresh(req, res)

    expect(status).toHaveBeenCalledWith(201)
    expect(send).toHaveBeenCalledWith({ jwt: token.accessToken })
  })
})
