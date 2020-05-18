import express from 'express'

import create from './crud/create'
import read from './crud/read'
import remove from './crud/remove'
import update from './crud/update'

const ideasRouter = express.Router()

ideasRouter.get('/', read)
ideasRouter.post('/', create)
ideasRouter.put('/:id', update)
ideasRouter.delete('/:id', remove)

export default ideasRouter
