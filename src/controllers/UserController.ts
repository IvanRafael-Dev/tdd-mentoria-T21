import { Request, Response } from 'express'
import { IUserService } from '../interfaces/services/IUserService'

export class UserController {
  private readonly userService: IUserService

  constructor (userService: IUserService) {
    this.userService = userService
  }

  async create (request: Request, response: Response): Promise<Response> {
    const user = await this.userService.create(request.body)
    return response.status(201).json(user)
  }

  async login (request: Request, response: Response): Promise<Response | void> {
    const token = await this.userService.login(request.body)
    return response.status(200).json({ token })
  }
}
