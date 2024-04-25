import mongoose from 'mongoose'
import { dbConfig } from './config'

mongoose.connection.on('open', () => console.log(`Se ha establecido la conexión a ${dbConfig.dbname} de forma exitosa.`))

async function connectDB ({ username, password, clustername, dbname, projectname }) {

  const uri = `mongodb+srv://${username}:${password}@${clustername}.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=${projectname}`
  await mongoose.connect(uri)
}

export default connectDB
