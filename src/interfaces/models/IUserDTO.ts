import { ObjectId } from 'mongodb'

export interface IUserDTO {
  id: number | ObjectId
  email: string
  username: string
}
