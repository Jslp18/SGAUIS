import { useAuth } from '../context/Auth.context'

function ProfesorPage () {
  const { user } = useAuth()
  return (
    <div>Bievenido Profesor {user.nombre} </div>
  )
}

export default ProfesorPage
