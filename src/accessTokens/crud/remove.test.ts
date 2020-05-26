/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express'

import remove from './remove'
import { removeToken } from '../../helpers/Authentication'

jest.mock('../../helpers/Authentication')

const mockRemoveToken = removeToken as jest.MockedFunction<any>

describe('removeToken', () => {
  const send = jest.fn()
  const status = jest.fn()
  const sendStatus = jest.fn()
  const res = ({ status, send, sendStatus } as unknown) as Response
  status.mockReturnValue(res)

  beforeEach(() => {
    jest.clearAllMocks()
    mockRemoveToken.mockReset()
  })

  it('should handle errors gracefully', async () => {
    const refresh_token = 'refresh_token'
    const req = { body: { refresh_token } } as Request
    const error = { statusCode: 400, message: 'Error message' }
    mockRemoveToken.mockRejectedValue(error)

    await remove(req, res)

    expect(status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalledWith({ message: error.message })
  })

  it('should remove token successfully', async () => {
    const refresh_token = 'refresh_token'
    const req = { body: { refresh_token } } as Request

    await remove(req, res)

    expect(sendStatus).toHaveBeenCalledWith(204)
    expect(status).not.toHaveBeenCalled()
    expect(send).not.toHaveBeenCalled()
  })
})
