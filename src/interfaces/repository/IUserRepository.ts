import User from '../../database/models/User'
import { IUserModel } from '../models/IUserModel'
import { IUser } from '../services/IUser'

export interface IUserRepository {
  create (user: IUser): Promise<IUserModel>
  findByEmail(email: string): Promise<User | null>
}
