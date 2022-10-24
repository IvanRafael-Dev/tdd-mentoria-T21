import User from '../database/models/User'
import { IUserService } from '../interfaces/services/IUserService'
import { MissingParamError } from './../errors/missing-param-error'
import { ConflictError } from './../errors/conflict-error'
export interface IUser {
  email: string
  username: string
  password: string
}

type RequiredFields = ['email', 'username', 'password']

export class UserService implements IUserService {
  async create (user: IUser): Promise<any> {
    const requiredFields: RequiredFields = ['email', 'username', 'password']
    for (const field of requiredFields) {
      if (!user[field]) {
        throw new MissingParamError(`O campo "${field}" é obrigatório`)
      }
    }

    const isUser = await User.findOne({ where: { email: user.email } })
    if (isUser) {
      throw new ConflictError('O email já está cadastrado')
    }

    const newUser = await User.create({ ...user })
    const { id, username, email } = newUser
    return { id, username, email }
  }
}
