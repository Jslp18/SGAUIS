import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import coursesRoutes from './routes/courses.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import professorRoutes from './routes/professor.routes'
import studentRoutes from './routes/student.routes'
import { createRoles, createUsers } from './libs/initialSetup'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
createRoles()
createUsers()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use('/public', express.static(`${__dirname}/libs/pdf`))
app.set('pkg', pkg)

app.get('/', (req, res) => {
  res.json({
    author: app.get('pkg').author,
    integrantes: app.get('pkg').integrants,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use('/escuela/cursos', coursesRoutes)
app.use('/profesor/cursos', professorRoutes)
app.use('/estudiante/cursos', studentRoutes)
app.use('/', authRoutes)
app.use('/usuarios', userRoutes)

export default app
