import { NextFunction, Request, Response } from 'express'
import { MissingParamError } from '../errors/missing-param-error'

type CreateFields = ['email', 'username', 'password']
type LoginFields = ['email', 'password']

type RequiredFields = LoginFields | CreateFields

const validateBody = (requiredFields: RequiredFields) => (req: Request, res: Response, next: NextFunction): void => {
  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new MissingParamError(`O campo "${field}" é obrigatório`)
    }
  }
  next()
}

export { validateBody }
