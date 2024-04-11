import dotenv from 'dotenv'
dotenv.config()

const config = {
    appConfig: {
        port: process.env.APP_PORT
    },
    dbConfig: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        clustername: process.env.DB_CLUSTERNAME,
        dbname: process.env.DB_NAME
    }
}

module.exports = config