import app from './app'
import { appConfig, dbConfig } from './config'
import connectDB from './database'

async function initApp (appConfig, dbConfig) {
  try {
    await connectDB(dbConfig)
    app.listen(appConfig.port, () => console.log(`El servidor se ha inicializado correctamente sobre el puerto: ${appConfig.port}.`))
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

initApp(appConfig, dbConfig)
