import User from '../../database/entities/User'
import { IUserDTO } from '../../interfaces/models/IUserModel'
import { IUserRepository } from '../../interfaces/repository/IUserRepository'
import { IUser } from '../../interfaces/services/IUser'

export class UserRepository implements IUserRepository {
  constructor (private readonly userModel = User) {}

  async create (user: IUser): Promise<IUserDTO> {
    const newUser = await this.userModel.create({ ...user })
    const { id, username, email } = newUser
    return { id, username, email }
  }

  async findByEmail (email: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { email } })
  }
}
