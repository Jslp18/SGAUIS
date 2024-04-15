import { useForm } from 'react-hook-form'
import { useAuth } from '../context/Auth.context.jsx'

function registerPage () {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { rol: 'Estudiante' } })
  const { signUp, user } = useAuth()
  console.log(user)
  const value = watch('rol')
  const onSubmit = handleSubmit(async (values) => {
    signUp(values)
  })

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-200'>
      <div className='bg-white text-gray-200 shadow-md rounded-lg my-4 px-8 py-6 w-1/2'>
        <h1 className='text-lg font-bold text-center mb-4 text-gray-700'>SGA UIS</h1>
        <p className='text-base font-normal text-center mb-2 text-gray-700'>Formulario de registro de usuarios</p>
        <form onSubmit={onSubmit}>
          <div className='mb-2'>
            <label htmlFor='Codigo' className='block text-sm font-medium text-gray-700 mb-2'>Código</label>
            <input type='text' {...register('codigo', { required: true, minLength: 7, maxLength: 7 })} id='codigo' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' placeholder='Ingrese el código universitario' />
            {errors.codigo && (<p className='text-blue-300'>Es necesario completar el siguiente campo: Código.</p>)}
          </div>
          <div className='mb-2'>
            <label htmlFor='nombre' className='block text-sm font-medium text-gray-700 mb-2'>Nombre completo</label>
            <input type='text' {...register('nombre', { required: true })} id='nombre' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' placeholder='Ingrese el nombre completo' />
            {errors.nombre && (<p className='text-blue-300'>Es necesario completar el siguiente campo: Nombre completo.</p>)}
          </div>
          <div className='mb-2'>
            <label htmlFor='correo' className='block text-sm font-medium text-gray-700 mb-2'>Correo electrónico</label>
            <input type='email' {...register('email', { required: true })} id='correo' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' placeholder='Ingrese el correo electrónico' />
            {errors.email && (<p className='text-blue-300'>Es necesario completar el siguiente campo: Correo electrónico.</p>)}
          </div>
          <div className='mb-2'>
            <label htmlFor='contraseña' className='block text-sm font-medium text-gray-700 mb-2'>Contraseña</label>
            <input type='password' {...register('password', { required: true })} id='contraseña' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' placeholder='Ingrese la contraseña' />
            {errors.password && (<p className='text-blue-300'>Es necesario completar el siguiente campo: Contraseña.</p>)}
          </div>
          <div>
            <h1 className='block text-sm font-medium text-gray-700 mb-2'>Tipo de usuario</h1>
            <div className=' w-full place-items-center justify-between mb-4'>
              <div className='flex gap-2 rounded-xl bg-gray-200 p-1 text-black'>
                <div className='w-1/2'>
                  <input type='radio' {...register('rol')} value='Estudiante' checked={value === 'Estudiante'} id='estudiante' className='peer hidden' />
                  <label htmlFor='estudiante' className='block cursor-pointer select-none rounded-xl py-1 px-2 text-center text-sm peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>ESTUDIANTE</label>
                </div>
                <div className='w-1/2'>
                  <input type='radio' {...register('rol')} value='Profesor' checked={value === 'Profesor'} id='profesor' className='peer hidden' />
                  <label htmlFor='profesor' className='block cursor-pointer select-none rounded-xl py-1 px-2 text-center text-sm peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>PROFESOR</label>
                </div>
              </div>
            </div>
          </div>
          <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>Crear usuario</button>
        </form>
      </div>
    </div>
  )
}

export default registerPage
