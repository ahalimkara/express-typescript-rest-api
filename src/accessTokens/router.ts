import express from 'express'

import { authorizeMiddleware } from '../helpers/Authentication'
import create from './crud/create'
import remove from './crud/remove'
import refresh from './crud/refresh'

const tokensRouter = express.Router()

tokensRouter.post('/', create)
tokensRouter.post('/refresh', refresh)
tokensRouter.delete('/', authorizeMiddleware, remove)

export default tokensRouter
