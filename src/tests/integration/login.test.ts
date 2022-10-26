import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { Model } from 'sequelize'
import sinon from 'sinon'
import { app } from '../../api/app'
import User from '../../database/models/User'
import { UserService } from '../../service/UserService'

chai.use(chaiHttp)

// caso de uso: login de usuario
// requerido: email, password
// retorne token || string

describe('POST /login', () => {
  describe('quando o campo "email" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'any_password' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "email" é obrigatório' })
    })
  })

  describe('quando o campo "password" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@mail.com' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "password" é obrigatório' })
    })
  })

  describe('quando o email informado não consta no bando de dados', () => {
    before(() => sinon.stub(Model, 'findOne').resolves(null))
    after(() => sinon.restore())
    it('deve retornar um status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@mail.com', password: 'any_password' })
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ error: 'Email ou Password são inválidos' })
    })
  })

  describe('quando o email é encontrado mas a senha é incorreta', () => {
    const user = { id: 1, username: 'any_user', email: 'email@mail.com', password: '123456' }
    before(() => sinon.stub(Model, 'findOne').resolves(user as User))
    before(() => sinon.stub(UserService.prototype, 'checkPassword').returns(false))
    after(() => sinon.restore())
    it('deve retornar um status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@mail.com', password: '123456' })
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ error: 'Email ou Password são inválidos' })
    })
  })

  describe('quando as credenciais estão corretas', () => {
    const user = { id: 1, username: 'any_user', email: 'email@mail.com', password: '123456' }
    before(() => sinon.stub(Model, 'findOne').resolves(user as User))
    before(() => sinon.stub(UserService.prototype, 'checkPassword').returns(true))
    after(() => sinon.restore())

    it('deve retornar um status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'email@mail.com', password: '123456' })
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.have.key('token')
      expect(httpResponse.body.token).to.be.a('string')
    })
  })
})
