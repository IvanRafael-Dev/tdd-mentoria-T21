import 'express-async-errors'
import express from 'express'
import { errorMiddleware } from './../middleware/errorMiddleware'
import { userRouter } from '../routes/userRouter'

class App {
  public app: express.Express

  constructor () {
    this.app = express()
    this.config()
    this.routes()
  }

  private config (): void {
    this.app.use(express.json())
  }

  private routes (): void {
    this.app.get('/', (req, res) => res.status(200).json({ message: 'ok' }))
    this.app.use(userRouter)
    this.app.use(errorMiddleware)
  }

  public start (PORT: number): void {
    this.app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
  }
}

export { App }

// app urtilizado pelos tests

export const { app } = new App()
