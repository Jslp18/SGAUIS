import { useAuth } from '../context/Auth.context'

function HomePage () {
  const { user } = useAuth()
  user.rol 
  return (
    <div>Bievenido {user.nombre} </div>
  )
}

export default HomePage
