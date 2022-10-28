import { ITokenServices } from './../utils/JWT/TokenServices'
import { IUserService } from '../interfaces/services/IUserService'
import { ConflictError } from './../errors/conflict-error'
import { IUserModel } from '../interfaces/models/IUserModel'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { IUser } from '../interfaces/services/IUser'
import { ILogin } from '../interfaces/services/ILogin'
import { IUserRepository } from '../interfaces/repository/IUserRepository'

export class UserService implements IUserService {
  public readonly userRepository: IUserRepository
  public readonly tokenServices: ITokenServices

  constructor (userRepository: IUserRepository, tokenServices: ITokenServices) {
    this.userRepository = userRepository
    this.tokenServices = tokenServices
  }

  async create (user: IUser): Promise<IUserModel> {
    const isUser = await this.userRepository.findByEmail(user.email)
    if (isUser) {
      throw new ConflictError('O email já está cadastrado')
    }

    const newUser = await this.userRepository.create(user)
    return newUser
  }

  checkPassword (userPassword: string | undefined, bodyPassword: string): boolean {
    return userPassword === bodyPassword
  }

  async login (login: ILogin): Promise<string> {
    const user = await this.userRepository.findByEmail(login.email)

    if (!user || !this.checkPassword(user.password, login.password)) {
      throw new UnauthorizedError('Email ou Password são inválidos')
    }

    const { id, username, email } = user
    const payload = { id, username, email }
    const token = this.tokenServices.createToken(payload)
    return token
  }
}
