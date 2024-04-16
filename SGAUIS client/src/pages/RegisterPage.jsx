import { useForm } from 'react-hook-form'
import { useAuth } from '../context/Auth.context.jsx'

function registerPage () {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { rol: 'Estudiante' } })
  const { signUp, errors: signUpErrors, showSuccessMessage, registerData } = useAuth()
  const value = watch('rol')
  const onSubmit = handleSubmit(async (values) => {
    await signUp(values)
  })

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-200'>
      <div className='bg-white text-gray-200 shadow-md rounded-lg my-4 px-8 py-6 w-1/3'>
        {showSuccessMessage && (
          <div className='fixed z-10 inset-0 overflow-y-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
            <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
                <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                  <div className='bg-white sm:p-4 sm:pb-4'>
                    <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                      <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                        {registerData.rol} {registerData.nombre} creado de forma satisfactoria.
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <h1 className='text-lg font-bold text-center mb-4 text-gray-700'>SGA UIS</h1>
        <p className='text-base font-normal text-center mb-2 text-gray-700'>Formulario de registro de usuarios</p>
        <form onSubmit={onSubmit}>
          <div className='mb-2'>
            <label htmlFor='Codigo' className='block text-sm font-medium text-gray-700 mb-2'>Código</label>
            <input type='text' {...register('codigo', { required: true })} id='codigo' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el código universitario' />
            {errors.codigo && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
          </div>
          <div className='mb-2'>
            <label htmlFor='nombre' className='block text-sm font-medium text-gray-700 mb-2'>Nombre completo</label>
            <input type='text' {...register('nombre', { required: true })} id='nombre' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el nombre completo' />
            {errors.nombre && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
          </div>
          <div className='mb-2'>
            <label htmlFor='correo' className='block text-sm font-medium text-gray-700 mb-2'>Correo electrónico</label>
            <input type='email' {...register('correo', { required: true })} id='correo' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el correo electrónico' />
            {errors.email && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
          </div>
          <div className='mb-2'>
            <label htmlFor='contraseña' className='block text-sm font-medium text-gray-700 mb-2'>Contraseña</label>
            <input type='password' {...register('password', { required: true })} id='contraseña' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese la contraseña' />
            {errors.password && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
          </div>
          <div>
            <h1 className='block text-sm font-medium text-gray-700 mb-2'>Tipo de usuario</h1>
            <div className=' w-full place-items-center justify-between mb-4'>
              <div className='flex gap-2 rounded-xl bg-gray-200 p-1 text-black'>
                <div className='w-1/2'>
                  <input type='radio' {...register('rol')} value='Estudiante' checked={value === 'Estudiante'} id='estudiante' className='peer hidden' />
                  <label htmlFor='estudiante' className='block cursor-pointer select-none rounded-xl py-1 px-2 text-center text-sm peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>Estudiante</label>
                </div>
                <div className='w-1/2'>
                  <input type='radio' {...register('rol')} value='Profesor' checked={value === 'Profesor'} id='profesor' className='peer hidden' />
                  <label htmlFor='profesor' className='block cursor-pointer select-none rounded-xl py-1 px-2 text-center text-sm peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>Profesor</label>
                </div>
              </div>
            </div>
          </div>
          <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>Crear usuario</button>
        </form>
        {
          signUpErrors.map((error, i) => (
            <div className='bg-blue-200 p-2 text-gray-800 mt-4 rounded-lg text-justify' key={i}>
              {error}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default registerPage
