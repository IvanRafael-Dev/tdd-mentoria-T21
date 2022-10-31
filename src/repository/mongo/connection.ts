import { Db, MongoClient } from 'mongodb'

const connection = async (): Promise<Db> => {
  const client: MongoClient = new MongoClient('mongodb://localhost:27017')
  await client.connect()
  return client.db('tdd-tryber')
}

export { connection }
