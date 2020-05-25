import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import errorHandler from './middleware/errorHandler'
import notFoundHandler from './middleware/notFoundHandler'
import ideasRouter from './ideas/router'
import usersRouter from './users/router'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000

const app = express()

app.use(morgan('combined'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/ideas', ideasRouter)
app.use('/users', usersRouter)
// TODO on logout, remove the refresh token from the storage

app.use(errorHandler)
app.use(notFoundHandler)

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.close())
}
