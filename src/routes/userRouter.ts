import { TokenServices } from './../utils/JWT/TokenServices'
import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { validateBody } from '../middleware/validateBody'
import { UserService } from '../service/UserService'
import UserMongoRepository from '../repository/mongo/UserRepository'
// import { UserSequelizeRepository } from '../repository/sequelize/UserRepository'

const userMongoRepository = new UserMongoRepository()
// const userSequelizeRepository = new UserSequelizeRepository()
const tokenServices = new TokenServices()
const userService = new UserService(userMongoRepository, tokenServices)
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
