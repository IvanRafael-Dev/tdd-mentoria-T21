import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../../api/app'

chai.use(chaiHttp)

describe('Teste da rota básica', () => {
  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 200', async () => {
      const httpResponse = await chai.request(app).get('/')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal({ message: 'ok' })
    })
  })
})
