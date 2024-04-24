import { useCourses } from '../../context/CoursesContext'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function SearchCourse () {
  const { getCoursesByName, deleteCourse, editCourse, showSuccessMessage, errors: coursesErrors, courseData} = useCourses()

  const [nombre, setNombre] = useState('')
  const [busqueda, setBusqueda] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const [totalPages, setTotalPages] = useState(1)
  const [coursesSearch, setCoursesSearch] = useState([])
  const [currentId, setCurrentId] = useState('')

  const handleSearch = async () => {
    setBusqueda(true)
    const res = await getCoursesByName(nombre)
    setCoursesSearch(res)
    setTotalPages(Math.ceil(res.length / itemsPerPage))
    setCurrentPage(1)
    if(res.length === 0) setNombre('')
  }

  const eliminarCurso = async (idCurso) => {
    const res = await deleteCourse(idCurso)
    if(res.status === 204){
      setCoursesSearch(coursesSearch.filter(course => course._id !== idCurso))
    }
  }

  const editarCurso = async (courseId) => {
    showCourse('editarCurso')
    setCurrentId(courseId)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCourses = coursesSearch.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const [showCoursePage, setShowCoursePage] = useState(null)
  const showCourse = (pagina) => {
    setShowCoursePage(pagina)
  }

  // Actualizar Curso

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async (values) => {
    await editCourse(currentId, values)
  })

  return (
<div className='flex flex-col items-center w-full'>
  {showCoursePage !== 'editarCurso' && (
        <div className='flex-col w-[90%]'>
        <div className='border-2 border-stone-800 flex flex-row items-center gap-3 shadow-2xl rounded-md py-2 px-3 mt-4'>
        <input type='text' placeholder='Ingrese el nombre del curso' value={nombre} onChange={(e) => setNombre(e.target.value)}  onKeyDown={(e) => {if (e.key === 'Enter') {handleSearch();}}}className='border-2 border-stone-700 py-1 rounded-lg w-full pl-2 focus:border-stone-400 ' />
          <button onClick={handleSearch} className='bg-[#A1AFBA] hover:bg-white border-2 border-black text-white block mx-auto rounded-md font-sm font-medium transition hover:text-black transform scale-x-[-1] focus:outline-none active:transform active:scale-95'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-7 h-7 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' /></svg>
          </button>
        </div>
        <div>
          {
            busqueda && (coursesSearch.length === 0) && (
              <div className='flex items-center mt-20'>
                <h1 className='font-bold text-2xl tracking-widest text-[#231F20] text-opacity-35 text-center'>Lo sentimos, no pudimos encontrar ningún resultado para tu búsqueda. Por favor, inténtalo de nuevo.</h1>
              </div>
            )
          }
          {
            coursesSearch.length !== 0 && (
              <div className='relative overflow-x-auto shadow-gray-500 shadow-2xl rounded-md mt-4 w-full'>
                <table className='w-full text-sm text-left rtl:text-right text-neutral-800'>
                  <thead className='text-xs text-gray-800 uppercase bg-gray-100'>
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        Nombre del curso
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Descripción
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        ImagenURL
                      </th>
                      <th scope='col' className='px-6 py-3 text-center'>
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCourses.map((course, index) => (
                      <tr key={index} className='bg-stone-50 border border-transparent hover:bg-stone-200'>
                        <th scope='row' className='px-6 py-1 font-medium text-gray-900 whitespace-nowrap'>
                          {course.nombre}
                        </th>
                        <td className='px-6 py-1'>
                          {course.descripcion.substring(0, 20)}{course.descripcion.length > 20 ? '...' : ''}
                        </td>
                        <td className='px-6 py-1'>
                        {course.imagenURL.substring(0, 20)}{course.imagenURL.length > 20 ? '...' : ''}
                        </td>
                        <td className='flex flex-row items-center justify-center p-4 gap-4'>
                          <button onClick={() => {editarCurso(course._id)}} className='flex flex-row items-center px-4 py-1 group cursor-pointer text-md bg-[#92A8C1] focus:bg-blue-300 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125' /></svg><p className='text-black font-normal group-focus:text-black'>Editar Curso</p></button>
                          <button onClick={() => {eliminarCurso(course._id)}} className='flex flex-row items-center px-4 py-1 group cursor-pointer text-md bg-[#c19492] focus:bg-red-300 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5' /></svg><p className='text-black font-normal group-focus:text-black'>Eliminar Curso</p></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='my-2 flex justify-center'>
                  <nav className='block'>
                    <ul className='flex list-none flex-row space-x-5 items-center'>
                      <li>
                        <button
                          className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage === 1 ? 'bg-[#A1AFBA] text-white' : ''}`}
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Anterior
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <li key={number}>
                          <button
                            className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage === number ? 'bg-[#A1AFBA] text-white' : ''}`}
                            onClick={() => paginate(number)}
                          >
                            {number}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage === totalPages ? 'bg-[#A1AFBA] text-white' : ''}`}
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Siguiente
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )
          }
        </div>
      </div>
  )}
  { showCoursePage === 'editarCurso' && (
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
                    Curso {courseData.nombre} actualizado de forma satisfactoria.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    <h1 className='text-lg font-bold text-center mb-4 text-gray-700'>Actualizar curso</h1>
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
      <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>Actualizar curso</button>
    </form>
    {
      coursesErrors.map((error, i) => (
        <div className='bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
          {error}
        </div>
      ))
    }
  </div>
  ) }
</div>
  )
}

export default SearchCourse
