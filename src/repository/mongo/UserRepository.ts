import { IUserEntity } from './../../interfaces/models/IUserEntity'
import { IUserDTO } from './../../interfaces/models/IUserDTO'
import { ObjectId, WithId } from 'mongodb'
import { INewUserBody } from '../../interfaces/payloads/INewUserBody'
import { IUserRepository } from './../../interfaces/repository/IUserRepository'
import { connection } from './connection'

export class UserMongoRepository implements IUserRepository {
  constructor (private readonly mongodb = connection()) {}

  public mongoMapper (result: any): IUserDTO {
    return { id: result._id, username: result.username, email: result.email }
  }

  async create (user: INewUserBody): Promise<IUserDTO> {
    const db = await this.mongodb.then(conn => conn.db('tdd-trybers').collection('user'))
    const newUser = await db.insertOne(user).then(result => db.findOne({ _id: new ObjectId(result.insertedId) }))
    return this.mongoMapper(newUser as WithId<IUserDTO>)
  }

  async findByEmail (email: string): Promise<IUserEntity | null> {
    const db = await this.mongodb.then(conn => conn.db('tdd-trybers').collection('user'))
    const user = await db.findOne({ email })
    if (!user) return null
    const result = Object.assign(this.mongoMapper(user as WithId<IUserDTO>), {}, { password: user?.password })
    return result
  }
}
