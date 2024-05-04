import { appConfig } from '../config.js'
import jwt from 'jsonwebtoken'

export function createAccessToken (payload) {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: payload }, appConfig.secret, { expiresIn: 10800 }, // Token que expira en un día. La palabra secret se encuentra en el archivo .env como variable de entorno,
      (error, token) => {
        if (error) reject(error)
        resolve(token)
      })
  })
}
