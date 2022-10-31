import { IUserModel } from './../interfaces/models/IUserModel'
import { ITokenServices } from './../utils/JWT/TokenServices'
import { IUserService } from '../interfaces/services/IUserService'
import { ConflictError } from './../errors/conflict-error'
import { IUserDTO } from '../interfaces/models/IUserDTO'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { INewUserBody } from '../interfaces/services/INewUserBody'
import { ILogin } from '../interfaces/services/ILogin'

export class UserService implements IUserService {
  public readonly userModel: IUserModel
  public readonly tokenServices: ITokenServices

  constructor (userModel: IUserModel, tokenServices: ITokenServices) {
    this.userModel = userModel
    this.tokenServices = tokenServices
  }

  async create (user: INewUserBody): Promise<IUserDTO> {
    const isUser = await this.userModel.findByEmail(user.email)
    if (isUser) {
      throw new ConflictError('O email já está cadastrado')
    }

    const newUser = await this.userModel.create(user)
    console.log(newUser)

    return newUser
  }

  checkPassword (userPassword: string | undefined, bodyPassword: string): boolean {
    return userPassword === bodyPassword
  }

  async login (login: ILogin): Promise<string> {
    const user = await this.userModel.findByEmail(login.email)

    if (!user || !this.checkPassword(user.password, login.password)) {
      throw new UnauthorizedError('Email ou Password são inválidos')
    }

    const { id, username, email } = user
    const payload = { id, username, email }
    const token = this.tokenServices.createToken(payload)
    return token
  }
}
