import { ILogin, IUser } from '../../service/UserService'
import { IUserModel } from '../models/IUserModel'

export interface IUserService {
  create (user: IUser): Promise<IUserModel>
  login (login: ILogin): Promise<string>
}
