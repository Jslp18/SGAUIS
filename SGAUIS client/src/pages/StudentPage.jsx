import { useAuth } from '../context/AuthContext'

function StudentPage() {
  const { user } = useAuth()
  return (
    <div>Bievenido Estudiante {user.nombre} </div>
  )
}

export default StudentPage
