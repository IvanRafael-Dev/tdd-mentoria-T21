import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const userController = new UserController()
const router = Router()

router
  .post('/users', (req, res) => userController.create(req, res))

export { router as userRouter }
