import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import coursesRoutes from './routes/courses.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { createRoles } from './libs/initialSetup'

const app = express()
createRoles()
app.use(morgan('dev'))
app.use(express.json())
app.set('pkg', pkg)

app.get('/', (req, res) => {
  res.json({
    author: app.get('pkg').author,
    integrantes: app.get('pkg').integrants,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use('/courses', coursesRoutes)
app.use('/', authRoutes)
app.use('/users', userRoutes)

export default app
