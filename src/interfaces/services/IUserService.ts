import { IUserModel } from '../models/IUserModel'
import { ILogin } from './ILogin'
import { IUser } from './IUser'

export interface IUserService {
  create (user: IUser): Promise<IUserModel>
  login (login: ILogin): Promise<string>
}
