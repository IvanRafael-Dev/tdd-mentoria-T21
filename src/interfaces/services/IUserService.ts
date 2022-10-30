import { IUserDTO } from '../models/IUserDTO'
import { ILogin } from './ILogin'
import { INewUserBody } from './INewUserBody'

export interface IUserService {
  create (user: INewUserBody): Promise<IUserDTO>
  login (login: ILogin): Promise<string>
}
