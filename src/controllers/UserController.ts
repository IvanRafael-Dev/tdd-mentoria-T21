import { Request, Response } from 'express'
import { UserService } from '../service/UserService'

export class UserController {
  private readonly userService: UserService

  constructor () {
    this.userService = new UserService()
  }

  create (request: Request, response: Response): Response {
    const error = this.userService.create(request.body)
    if (error) {
      return response.status(400).json(error)
    }
    return response.sendStatus(201)
  }
}
