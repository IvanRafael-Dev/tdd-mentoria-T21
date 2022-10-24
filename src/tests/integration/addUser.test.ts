import { Model } from 'sequelize'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import { app } from '../../api/app'
import User from '../../database/models/User'

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

  describe('quando o email já está cadastrado no banco de dados', () => {
    const user = { id: 1, username: 'any_user_log', email: 'email@mail.com', password: '123456' }
    before(() => sinon.stub(Model, 'findOne').resolves(user as User))
    after(() => sinon.restore())
    it('deve retornar um 409', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'any_email@mail.com', username: 'any_user', password: '123456' })
      expect(httpResponse.status).to.equal(409)
      expect(httpResponse.body).to.deep.equal({ error: 'O email já está cadastrado' })
    })
  })

  describe('quando a requisição é feita com sucesso', () => {
    const user = { id: 1, username: 'any_user_log', email: 'email@mail.com', password: '123456' }
    const { password, ...userWithoutPass } = user
    before(() => {
      sinon.stub(Model, 'findOne').resolves(null)
      sinon.stub(Model, 'create').resolves(user as User)
    })
    after(() => sinon.restore())
    it('deve retornar um status 201', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'any_email@mail.com', username: 'any_user', password: 'any_password' })
      expect(httpResponse.status).to.equal(201)
      expect(httpResponse.body).to.have.all.keys(['id', 'username', 'email'])
      expect(httpResponse.body).to.deep.equal(userWithoutPass)
    })
  })
})
