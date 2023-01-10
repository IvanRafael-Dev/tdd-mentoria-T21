import 'dotenv/config'
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { IUserDTO } from '../../interfaces/models/IUserDTO'

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '30d'
}

export interface ITokenServices {
  createToken (payload: IUserDTO): string
  decodeToken (token: string): JwtPayload
}

export class TokenServices implements ITokenServices {
  constructor (private readonly tokenServices = jwt) {}

  createToken (payload: IUserDTO): string {
    return this.tokenServices.sign(payload, process.env.JWT_SECRET as string, jwtConfig)
  }

  decodeToken (token: string): JwtPayload {
    return this.tokenServices.verify(token, process.env.JWT_SECRET as string) as JwtPayload
  }
}
