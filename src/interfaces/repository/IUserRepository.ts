import User from '../../database/entities/User'
import { IUserDTO } from '../models/IUserDTO'
import { INewUserBody } from '../services/INewUserBody'

export interface IUserRepository {
  create (user: INewUserBody): Promise<IUserDTO>
  findByEmail(email: string): Promise<User | null>
}
