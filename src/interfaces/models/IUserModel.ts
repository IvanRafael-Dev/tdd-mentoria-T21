import { INewUserBody } from '../services/INewUserBody'
import { IUserDTO } from './IUserDTO'
import { IUserEntity } from './IUserEntity'

export interface IUserModel {
  create (user: INewUserBody): Promise<IUserDTO>
  findByEmail (email: string): Promise<IUserEntity | null>
}
