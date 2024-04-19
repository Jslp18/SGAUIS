import { useForm } from 'react-hook-form'
import { useAuth } from '../context/Auth.context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage () {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { rol: 'Estudiante' } })
  const { signIn, isAuthenticated, errors: signInErrors } = useAuth()
  const navigation = useNavigate()
  useEffect(() => {
    if (isAuthenticated) return navigation('/')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(data => { signIn(data) })
  const value = watch('rol')

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
      <div className='bg-white text-gray-200 shadow-2xl rounded-lg my-4 px-8 py-6 w-[26%]'>
        <h1 className='text-3xl font-bold text-center mb-4 text-gray-700'>¡Bienvenido!</h1>
        <p className='text-xl font-normal text-center mb-2 text-gray-700'> SGA UIS</p>
        <form onSubmit={onSubmit}>
          <div className='mb-2'>
            <label htmlFor='Codigo' className='block text-sm font-medium text-gray-700 mb-2'>Código</label>
            <input type='text' {...register('codigo', { required: true })} id='codigo' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el código universitario' />
            {errors.codigo && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
          </div>
          <div className='mb-2'>
            <label htmlFor='contraseña' className='block text-sm font-medium text-gray-700 mb-2'>Contraseña</label>
            <input type='password' {...register('password', { required: true })} id='contraseña' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese la contraseña' />
            {errors.password && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
          </div>
          <div>
            <h1 className='block text-sm font-medium text-gray-700 mb-2'>Tipo de usuario</h1>
            <div className=' w-full place-items-center justify-between mb-4'>
              <div className='flex gap-2 rounded-xl bg-[#CCD3D9] p-1 text-black'>
                <div className='w-1/3'>
                  <input type='radio' {...register('rol')} value='Estudiante' checked={value === 'Estudiante'} id='estudiante' className='peer hidden' />
                  <label htmlFor='estudiante' className='block cursor-pointer select-none rounded-xl py-1 px-2 text-center text-sm font-medium text-gray-900 peer-checked:bg-[#A1AFBA] peer-checked:font-bold peer-checked:text-white'>Estudiante</label>
                </div>
                <div className='w-1/3'>
                  <input type='radio' {...register('rol')} value='Profesor' checked={value === 'Profesor'} id='profesor' className='peer hidden' />
                  <label htmlFor='profesor' className='block cursor-pointer select-none rounded-xl py-1 px-2 text-center text-sm font-medium text-gray-900 peer-checked:bg-[#A1AFBA] peer-checked:font-bold peer-checked:text-white'>Profesor</label>
                </div>
                <div className='w-1/3'>
                  <input type='radio' {...register('rol')} value='Escuela' checked={value === 'Escuela'} id='escuela' className='peer hidden' />
                  <label htmlFor='escuela' className='block cursor-pointer select-none rounded-xl py-1 px-2 text-center text-sm font-medium text-gray-900 peer-checked:bg-[#A1AFBA] peer-checked:font-bold peer-checked:text-white'>Escuela</label>
                </div>
              </div>
            </div>
          </div>
          <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>Iniciar Sesión</button>
        </form>
        {
        signInErrors.map((error, i) => (
          <div className='bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
            {error}
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default LoginPage
