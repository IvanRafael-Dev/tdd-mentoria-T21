import { IUserEntity } from './IUserEntity'
import { INewUserBody } from '../payloads/INewUserBody'
import { IUserDTO } from './IUserDTO'

export interface IUserModel {
  create (user: INewUserBody): Promise<IUserDTO>
  findByEmail (email: string): Promise<IUserEntity | null>
}
