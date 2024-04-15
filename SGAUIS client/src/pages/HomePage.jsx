import { useAuth } from '../context/Auth.context'

function HomePage () {
  const { user } = useAuth()
  console.log(user)
  return (
    <div>Bievenido {user.nombre} </div>
  )
}

export default HomePage
