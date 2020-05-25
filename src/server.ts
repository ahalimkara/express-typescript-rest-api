import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import errorHandler from './middleware/errorHandler'
import notFoundHandler from './middleware/notFoundHandler'
import ideasRouter from './ideas/router'
import usersRouter from './users/router'
import tokensRouter from './accessTokens/router'
import { authorizeMiddleware } from './helpers/Authentication'
import me from './users/crud/me'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000

const app = express()

app.use(morgan('combined'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/ideas', authorizeMiddleware, ideasRouter)
app.use('/me', authorizeMiddleware, me)
app.use('/users', usersRouter)
app.use('/access-tokens', tokensRouter)
// TODO on logout, remove the refresh token from the storage

app.use(errorHandler)
app.use(notFoundHandler)

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
