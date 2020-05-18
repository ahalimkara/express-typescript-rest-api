import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.close())
}