import { useCourses } from '../../../context/CoursesContext'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SGAUIS4 from '../../../resources/SGA UIS 4.png'

function SearchCourse() {
  const { getCoursesByName, deleteCourse, editCourse, inscribeUser, inscribedUser, undoInscribeUser, undoInscribedUser, showSuccessMessage, errors: coursesErrors, courseData } = useCourses()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [name, setName] = useState('')
  const [search, setSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [totalPages, setTotalPages] = useState(1)
  const [coursesSearch, setCoursesSearch] = useState([])
  const [currentId, setCurrentId] = useState('')
  const [currentCourse, setCurrentCourse] = useState(null);
  const [autocomplete, setAutocomplete] = useState([])
  const [showAutocomplete, setShowAutocomplete] = useState(false)


  const handleSearch = async () => {
    const res = await getCoursesByName(name)
    setSearch(true)
    setCoursesSearch(res)
    setTotalPages(Math.ceil(res.length / itemsPerPage))
    setCurrentPage(1)
    setShowAutocomplete(false)
    if (res.length === 0) setName('')
  }

  const coincidencias = async (coincidencias) => {
    setName(coincidencias)
    if (coincidencias.length > 0) {
      const res = await getCoursesByName(coincidencias)
      const coincidences = res.map(coincidences => coincidences.nombre)
      setAutocomplete(coincidences)
      setShowAutocomplete(true)
    } else {
      setAutocomplete([]) // Limpiar las sugerencias si no se han ingresado suficientes caracteres
      setShowAutocomplete(false)
    }
  }

  const selectAutocomplete = (value) => {
    setName(value)
    setShowAutocomplete(false)
  }

  const eliminarCurso = async (idCurso) => {
    const res = await deleteCourse(idCurso)
    if (res.status === 204) {
      setCoursesSearch(coursesSearch.filter(course => course._id !== idCurso))
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCourses = coursesSearch.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const [showCoursePage, setShowCoursePage] = useState('busquedaCurso')
  const showCourse = (pagina) => {
    setShowCoursePage(pagina)
  }

  // Actualizar Curso

  const editarCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('editarCurso')
    const idCurso = course._id
    setCurrentId(idCurso)
  }

  const onSubmit = handleSubmit(async (values) => {
    await editCourse(currentId, values)
  })

  // Matricula de  usuarios

  const matricularUsuarios = async (course) => {
    setCurrentCourse(course)
    showCourse('matricularUsuarios')
    const idCurso = course._id
    setCurrentId(idCurso)
  }

  const onInscribe = handleSubmit(async (value) => {
    await inscribeUser(currentId, value)
  })

  const desmatricularUsuarios = async (course) => {
    setCurrentCourse(course)
    showCourse('desmatricularUsuarios')
    const idCurso = course._id
    setCurrentId(idCurso)
  }

  const onUndoInscribe = handleSubmit(async (value) => {
    await undoInscribeUser(currentId, value)
  })

  return (
    <div className='flex flex-col items-center'>
      {showCoursePage === 'busquedaCurso' && (
        <div className='flex-col w-[70%]'>
          <div className='border-2 border-stone-800 flex flex-row items-center gap-3 rounded-md py-2 px-3 mt-4'>
            <div className='flex flex-col w-full'>
              <input type='text' placeholder='Ingrese el nombre del curso' value={name} onChange={(e) => coincidencias(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch() } }} className='border-2 border-stone-700 py-1 rounded-lg w-full pl-2 focus:border-stone-500' />
              {name && showAutocomplete && (
                <div className="sticky bg-slate-300 mt-1 rounded-md shadow-md w-full z-10">
                  {autocomplete.map((option, index) => (
                    <div
                      key={index}
                      className="py-1 px-3 hover:bg-slate-400 cursor-pointer rounded-md"
                      onClick={() => selectAutocomplete(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={handleSearch} className='bg-[#A1AFBA] hover:bg-white border-2 border-black text-white block mx-auto rounded-md font-sm font-medium transition hover:text-black transform scale-x-[-1] focus:outline-none active:transform active:scale-95'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-7 h-7 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' /></svg>
            </button>
          </div>
          {!search && (
            <div className='justify-center flex w-full bg-slate-100'>
              <img className='w-[50%] opacity-75' src={SGAUIS4} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
            </div>
          )}
          <div>
            {
              search && coursesSearch.length === 0 && (
                <div className='flex items-center mt-20'>
                  <h1 className='font-bold text-2xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Lo sentimos, no pudimos encontrar ningún resultado para tu búsqueda. Por favor, inténtalo de nuevo.</h1>
                </div>
              )
            }
            {
              coursesSearch.length !== 0 && (
                <div className='relative overflow-x-auto shadow-gray-500 shadow-2xl rounded-md mt-5 w-full'>
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
                        <tr key={index} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                          <th scope='row' className='px-6 py-1 font-medium text-gray-900 whitespace-nowrap'>
                            {course.nombre}
                          </th>
                          <td className='px-6 py-1'>
                            {course.descripcion.substring(0, 30)}{course.descripcion.length > 30 ? '...' : ''}
                          </td>
                          <td className='px-6 py-1'>
                            {course.imagenURL.substring(0, 20)}{course.imagenURL.length > 20 ? '...' : ''}
                          </td>
                          <td className='flex flex-row items-center justify-center p-4 gap-4'>
                            <div className='flex flex-col items-center justify-center gap-3'>
                              <button onClick={() => { editarCurso(course) }} className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#92A8C1] hover:bg-blue-300 focus:bg-blue-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125' /></svg><p className='text-black font-normal group-focus:text-black'>Editar Curso</p></button>
                              <button onClick={() => { eliminarCurso(course._id) }} className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#c19492] hover:bg-red-300 focus:bg-red-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5' /></svg><p className='text-black font-normal group-focus:text-black'>Eliminar Curso</p></button>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-3'>
                              <button onClick={() => { matricularUsuarios(course) }} className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#AFAFAF] hover:bg-gray-300 focus:bg-gray-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg><p className='text-black font-normal group-focus:text-black'>Matricular Usuarios</p></button>
                              <button onClick={() => { desmatricularUsuarios(course) }} className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#AFAFAF] hover:bg-gray-300 focus:bg-gray-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg><p className='text-black font-normal group-focus:text-black'>Desmatricular Usuarios</p></button>
                            </div>
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
      {showCoursePage === 'editarCurso' && (
        <div className='bg-white text-gray-200 shadow-md rounded-lg px-8 mt-10 py-4 w-[35%]'>
          <span><button className='flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-gray-500/10 active:bg-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { showCourse('busquedaCurso') }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>Volver</button></span>
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
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>Nombre del curso</label>
              <input type='text' defaultValue={currentCourse.nombre} {...register('nombre', { required: true })} id='name' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el nombre del curso' />
              {errors.name && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
            </div>
            <div className='mb-2'>
              <label htmlFor='descripcion' className='block text-sm font-medium text-gray-700 mb-2'>Descripción</label>
              <textarea rows='3' defaultValue={currentCourse.descripcion} {...register('descripcion', { required: true })} id='descripcion' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese la descripción del curso' />
              {errors.descripcion && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
            </div>
            <div className='mb-8'>
              <label htmlFor='imagenUrl' className='block text-sm font-medium text-gray-700 mb-2'>Imagen URL</label>
              <input type='url' defaultValue={currentCourse.imagenURL} {...register('imagenURL', { required: true })} id='imagen' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el url de la imagen del curso' />
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
      )}
      {showCoursePage === 'matricularUsuarios' && (
        <div className='bg-white text-gray-200 shadow-2xl flex flex-row space-x-20 mt-10 py-6 px-8 rounded-md w-[70%]'>
          <div className='w-[30%] flex gap-10 h-max self-center'>
            <div className='w-full bg-gray-100 rounded-3xl shadow-xl flex flex-col h-[80%] items-center border-2 border-black border-opacity-15'>
              <div className='flex m-4 h-[65%] items-center justify-center overflow-hidden border-2 border-gray-700 border-opacity-80 rounded-2xl'>
                <img className='h-60 shadow-2xl rounded-lg' src={currentCourse.imagenURL} alt={currentCourse.nombre} />
              </div>
              <div className='text-start pb-2 h-[35%]'>
                <p className='block pl-4 bg-gradient-to-tr from-zinc-400 to-slate-800 bg-clip-text font-sans text-xl font-semibold leading-relaxed text-transparent antialiased'>{currentCourse.nombre}</p>
                <p className='text-base text-gray-900 font-normal px-4 text-justify'>{currentCourse.descripcion.substring(0, 70)}{currentCourse.descripcion.length > 70 ? '...' : ''}</p>
              </div>
            </div>
          </div>
          <div className='w-[70%] flex flex-col self-start'>
            <span><button className='flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-gray-500/10 active:bg-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { showCourse('busquedaCurso') }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>Volver</button></span>
            {showSuccessMessage && (
              <div className='fixed z-10 inset-0 overflow-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                <div className='flex items-end justify-center min-h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                  <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
                    <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                      <div className='bg-white sm:p-4 sm:pb-4'>
                        <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                          <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                            {inscribedUser.rol} {inscribedUser.nombre} matriculado al curso {currentCourse.nombre} de forma satisfactoria.
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <h1 className='text-lg font-bold text-center text-gray-700'>Matricular usuarios</h1>
            <form className='w-full mt-5' onSubmit={onInscribe}>
              <div className='mb-8'>
                <label htmlFor='codigo' className='block text-lg font-medium text-gray-700 mb-2'>Código Universitario</label>
                <input type='text' {...register('codigo', { required: true })} id='codigo' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el código universitario correspondiente al usuario' />
                {errors.codigo && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
              </div>
              <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>Matricular usuario</button>
            </form>
            {
              coursesErrors.map((error, i) => (
                <div className='w-full bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
                  {error}
                </div>
              ))
            }
          </div>
        </div>
      )}
      {showCoursePage === 'desmatricularUsuarios' && (
        <div className='bg-white text-gray-200 shadow-2xl flex flex-row space-x-20 mt-10 py-6 px-8 rounded-md w-[70%]'>
          <div className='w-[30%] gap-10 h-max self-center'>
            <div className='w-full bg-gray-100 rounded-3xl shadow-xl flex flex-col h-[80%] items-center border-2 border-black border-opacity-15'>
              <div className='flex m-4 h-[65%] items-center justify-center overflow-hidden border-2 border-gray-700 border-opacity-80 rounded-2xl'>
                <img className='h-60 shadow-2xl rounded-lg' src={currentCourse.imagenURL} alt={currentCourse.nombre} />
              </div>
              <div className='text-start pb-2 h-[35%]'>
                <p className='block pl-4 bg-gradient-to-tr from-zinc-400 to-slate-800 bg-clip-text font-sans text-xl font-semibold leading-relaxed text-transparent antialiased'>{currentCourse.nombre}</p>
                <p className='text-base text-gray-900 font-normal px-4 text-justify'>{currentCourse.descripcion.substring(0, 70)}{currentCourse.descripcion.length > 70 ? '...' : ''}</p>
              </div>
            </div>
          </div>
          <div className='w-[70%] flex flex-col self-start'>
            <span><button className='flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-gray-500/10 active:bg-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { showCourse('busquedaCurso') }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>Volver</button></span>
            {showSuccessMessage && (
              <div className='fixed z-10 inset-0 overflow-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                <div className='flex items-end justify-center min-h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                  <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
                    <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                      <div className='bg-white sm:p-4 sm:pb-4'>
                        <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                          <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                            {undoInscribedUser.rol} {undoInscribedUser.nombre} eliminado del curso {currentCourse.nombre} de forma satisfactoria.
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <h1 className='text-lg font-bold text-center text-gray-700'>Desmatricular usuarios</h1>
            <form className='w-full mt-5' onSubmit={onUndoInscribe}>
              <div className='mb-8'>
                <label htmlFor='codigo' className='block text-lg font-medium text-gray-700 mb-2'>Código Universitario</label>
                <input type='text' {...register('codigo', { required: true })} id='codigo' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el código universitario correspondiente al usuario' />
                {errors.codigo && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
              </div>
              <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>Desmatricular usuario</button>
            </form>
            {
              coursesErrors.map((error, i) => (
                <div className='w-full bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
                  {error}
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchCourse