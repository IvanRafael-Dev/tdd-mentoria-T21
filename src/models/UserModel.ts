import { IUserEntity } from './../interfaces/models/IUserEntity'
import { IUserRepository } from './../interfaces/repository/IUserRepository'
import { IUserModel } from './../interfaces/models/IUserModel'
import { IUserDTO } from '../interfaces/models/IUserDTO'
import { INewUserBody } from '../interfaces/services/INewUserBody'

export class UserModel implements IUserModel {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async create (user: INewUserBody): Promise<IUserDTO> {
    const newUser = await this.userRepository.create(user)
    return newUser
  }

  async findByEmail (email: string): Promise<IUserEntity | null> {
    const user = await this.userRepository.findByEmail(email)
    return user
  }
}
