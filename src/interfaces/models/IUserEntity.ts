import { ObjectId } from 'mongodb'

export interface IUserEntity {
  id: number | ObjectId
  email: string
  username: string
  password: string
}
