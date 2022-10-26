import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { validateBody } from '../middleware/validateBody'
import { UserService } from '../service/UserService'

const userService = new UserService()
const userController = new UserController(userService)
const router = Router()

router
  .post('/users',
    validateBody(['email', 'username', 'password']),
    (req, res) => userController.create(req, res))
  .post('/login',
    validateBody(['email', 'password']),
    (req, res) => userController.login(req, res))

export { router as userRouter }
