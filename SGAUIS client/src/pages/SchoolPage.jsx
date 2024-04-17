import { useAuth } from '../context/Auth.context'

function SchoolPage () {
  const { user } = useAuth()
  return (
    <div>Bievenido Escuela {user.nombre} </div>
  )
}

export default SchoolPage
