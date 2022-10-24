import { STRING, Model, INTEGER } from 'sequelize'
import db from '.'

class User extends Model {
  readonly id!: number
  public username!: string
  public email!: string
  public password!: string
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false
})

export default User
