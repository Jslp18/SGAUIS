import { useForm } from 'react-hook-form'
import { useCourses } from '../../context/CoursesContext'

function CreateCourse () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { coursesCreate, errors: coursesErrors, showSuccessMessage, courseData } = useCourses()
  const onSubmit = handleSubmit(async (values) => {
    await coursesCreate(values)
  })

  return (
    <div className='bg-white text-gray-200 shadow-md rounded-lg px-8 mt-10 py-4 w-[45%] '>
      {showSuccessMessage && (
        <div className='fixed z-10 inset-0 overflow-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='flex items-end justify-center min-h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
              <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
              <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                <div className='bg-white sm:p-4 sm:pb-4'>
                  <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                      Curso {courseData.nombre} creado de forma satisfactoria.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className='text-lg font-bold text-center mb-4 text-gray-700'>Crear curso</h1>
      <form onSubmit={onSubmit}>
        <div className='mb-2'>
          <label htmlFor='nombre' className='block text-sm font-medium text-gray-700 mb-2'>Nombre</label>
          <input type='text' {...register('nombre', { required: true })} id='nombre' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el nombre del curso' />
          {errors.nombre && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
        </div>
        <div className='mb-2'>
          <label htmlFor='descripcion' className='block text-sm font-medium text-gray-700 mb-2'>Descripción</label>
          <textarea rows='3' {...register('descripcion', { required: true })} id='descripcion' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese la descripción del curso' />
          {errors.descripcion && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
        </div>
        <div className='mb-8'>
          <label htmlFor='imagenUrl' className='block text-sm font-medium text-gray-700 mb-2'>Imagen URL</label>
          <input type='url' {...register('imagenURL', { required: true })} id='imagen' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el url de la imagen del curso' />
          {errors.imagenURL && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
        </div>
        <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>Crear curso</button>
      </form>
      {
        coursesErrors.map((error, i) => (
          <div className='bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
            {error}
          </div>
        ))
      }
    </div>
  )
}

export default CreateCourse
