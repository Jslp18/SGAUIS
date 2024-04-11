import mongoose from 'mongoose'

mongoose.connection.on('open', () => console.log('La conexión a base de datos fue exitosa.'))

async function connectDB ({ username, password, clustername, dbname }) {
    const uri = `mongodb+srv://${username}:${password}@${clustername}.mongodb.net/?retryWrites=true&w=majority&appName=${dbname}`
    await mongoose.connect(uri)
}

export default connectDB