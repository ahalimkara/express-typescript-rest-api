import express from 'express'

import create from './crud/create'

const tokensRouter = express.Router()

tokensRouter.post('/', create)

export default tokensRouter
