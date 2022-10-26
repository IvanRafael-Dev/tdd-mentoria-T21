import jwt from 'jsonwebtoken'
import User from '../database/models/User'
import { IUserService } from '../interfaces/services/IUserService'
import { ConflictError } from './../errors/conflict-error'
import { IUserModel } from '../interfaces/models/IUserModel'
import { UnauthorizedError } from '../errors/unauthorized-error'
export interface IUser {
  email: string
  username: string
  password: string
}

export interface ILogin {
  email: string
  password: string
}

export class UserService implements IUserService {
  async create (user: IUser): Promise<IUserModel> {
    const isUser = await User.findOne({ where: { email: user.email } })
    if (isUser) {
      throw new ConflictError('O email já está cadastrado')
    }

    const newUser = await User.create({ ...user })
    const { id, username, email } = newUser
    return { id, username, email }
  }

  checkPassword (userPassword: string | undefined, bodyPassword: string): boolean {
    return userPassword === bodyPassword
  }

  async login (login: ILogin): Promise<string> {
    const user = await User.findOne({ where: { email: login.email } })
    if (!user || !this.checkPassword(user.password, login.password)) {
      throw new UnauthorizedError('Email ou Password são inválidos')
    }

    const { id, username, email } = user
    const payload = { id, username, email }
    const token = jwt.sign(payload, 'senhaSecreta')
    return token
  }
}
