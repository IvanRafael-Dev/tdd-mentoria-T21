import { Request, Response } from 'express'
import { IUserService } from '../interfaces/services/IUserService'

export class UserController {
  private readonly userService: IUserService

  constructor (userService: IUserService) {
    this.userService = userService
  }

  create (request: Request, response: Response): Response {
    this.userService.create(request.body)
    return response.sendStatus(201)
  }
}
