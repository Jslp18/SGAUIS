import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import coursesRoutes from './routes/courses.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { createRoles, createUsers } from './libs/initialSetup'
import cookieParser from 'cookie-parser'

const app = express()
createRoles()
createUsers()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.set('pkg', pkg)

app.get('/', (req, res) => {
  res.json({
    author: app.get('pkg').author,
    integrantes: app.get('pkg').integrants,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use('/cursos', coursesRoutes)
app.use('/', authRoutes)
app.use('/usuarios', userRoutes)

export default app
