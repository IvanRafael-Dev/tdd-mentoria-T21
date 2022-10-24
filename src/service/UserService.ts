import { IUserService } from '../interfaces/services/IUserService'
import { MissingParamError } from './../errors/missing-param-error'
export interface IUser {
  email: string
  username: string
  password: string
}

type RequiredFields = ['email', 'username', 'password']

export class UserService implements IUserService {
  create (user: IUser): any {
    const requiredFields: RequiredFields = ['email', 'username', 'password']
    for (const field of requiredFields) {
      if (!user[field]) {
        throw new MissingParamError(`O campo "${field}" é obrigatório`)
      }
    }
  }
}
