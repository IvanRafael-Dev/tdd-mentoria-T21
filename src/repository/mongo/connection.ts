import { MongoClient } from 'mongodb'

const connection = async (): Promise<MongoClient> => {
  const client: MongoClient = new MongoClient('mongodb://localhost:27017')
  return await client.connect()
}

export { connection }
