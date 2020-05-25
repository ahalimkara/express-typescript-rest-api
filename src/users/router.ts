import express from 'express'

import create from './crud/create'

const usersRouter = express.Router()

usersRouter.post('/', create)

export default usersRouter
