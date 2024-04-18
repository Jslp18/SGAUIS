import { useAuth } from '../context/Auth.context'

function StudentPage () {
  const { user } = useAuth()
  return (
    <div>Bievenido Estudiante {user.nombre} </div>
  )
}

export default StudentPage
