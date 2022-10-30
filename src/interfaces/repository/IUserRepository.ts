import User from '../../database/entities/User'
import { IUserModel } from '../models/IUserModel'
import { IUser } from '../services/IUser'

export interface IUserRepository {
  create (user: IUser): Promise<IUserModel>
  findByEmail(email: string): Promise<User | null>
}
