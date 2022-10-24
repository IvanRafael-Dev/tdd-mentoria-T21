import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { UserService } from '../service/UserService'

const userService = new UserService()
const userController = new UserController(userService)
const router = Router()

router
  .post('/users', (req, res) => userController.create(req, res))

export { router as userRouter }
