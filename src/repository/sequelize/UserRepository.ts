import User from '../../database/entities/User'
import { IUserDTO } from '../../interfaces/models/IUserDTO'
import { IUserRepository } from '../../interfaces/repository/IUserRepository'
import { INewUserBody } from '../../interfaces/payloads/INewUserBody'

export class UserSequelizeRepository implements IUserRepository {
  constructor (private readonly userModel = User) {}

  async create (user: INewUserBody): Promise<IUserDTO> {
    const newUser = await this.userModel.create({ ...user })
    const { id, username, email } = newUser
    return { id, username, email }
  }

  async findByEmail (email: string): Promise<IUserDTO & { password: string } | null> {
    return await this.userModel.findOne({ where: { email } })
  }
}
