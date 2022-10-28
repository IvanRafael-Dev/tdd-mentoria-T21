import 'dotenv/config'
import { JwtPayload } from 'jsonwebtoken'
import { IUserModel } from '../../interfaces/models/IUserModel'

export interface ITokenServices {
  createToken (payload: IUserModel): string
  decodeToken (token: string): JwtPayload
}

export class OtherTokenServices implements ITokenServices {
  createToken (payload: IUserModel): string {
    return 'toma aqui teu toqui'
  }

  decodeToken (token: string): JwtPayload {
    return { ok: 'ok' }
  }
}
