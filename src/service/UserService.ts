interface IUser {
  email: string
  username: string
  password: string
}

type RequiredFields = ['email', 'username', 'password']

export class UserService {
  create (user: IUser): any {
    const requiredFields: RequiredFields = ['email', 'username', 'password']
    for (const field of requiredFields) {
      if (!user[field]) {
        return { error: `O campo "${field}" é obrigatório` }
      }
    }
  }
}
