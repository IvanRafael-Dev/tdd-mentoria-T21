import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../../api/app'

chai.use(chaiHttp)

// caso de uso: add user
// requerido: email, username, password

describe('POST /users', () => {
  describe('quando o campo "email" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ username: 'any_user', password: 'any_password' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "email" é obrigatório' })
    })
  })

  describe('quando o campo "username" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'any_email@mail.com', password: 'any_password' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "username" é obrigatório' })
    })
  })

  describe('quando o campo "password" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'any_email@mail.com', username: 'any_user' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "password" é obrigatório' })
    })
  })

  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 201', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'any_email@mail.com', username: 'any_user', password: 'any_password' })
      expect(httpResponse.status).to.equal(201)
    })
  })
})
