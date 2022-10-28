import 'dotenv/config'
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { IUserModel } from '../../interfaces/models/IUserModel'

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '30d'
}

export interface ITokenServices {
  createToken (payload: IUserModel): string
  decodeToken (token: string): JwtPayload
}

export class TokenServices implements ITokenServices {
  constructor (private readonly tokenServices = jwt) {}

  createToken (payload: IUserModel): string {
    return this.tokenServices.sign(payload, process.env.JWT_SECRET as string, jwtConfig)
  }

  decodeToken (token: string): JwtPayload {
    return this.tokenServices.verify(token, process.env.JWT_SECRET as string) as JwtPayload
  }
}
