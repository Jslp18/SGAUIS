import { useCourses } from '../../context/CoursesContext'
import { useState } from 'react'

function SearchCourse () {
  const [nombre, setNombre] = useState('')
  const [coincidencias, setCoincidencias] = useState([])
  const [busqueda, setBusqueda] = useState(false)
  const { getCoursesByName } = useCourses()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Puedes ajustar esto según tu preferencia
  const [totalPages, setTotalPages] = useState(1)

  console.log(busqueda, coincidencias)

  const handleSearch = async () => {
    setBusqueda(true)
    const res = await getCoursesByName(nombre)
    setCoincidencias(res)
    setTotalPages(Math.ceil(res.length / itemsPerPage))
    setCurrentPage(1)
    if(res.length === 0) setNombre('')
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCourses = coincidencias.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='flex-col w-[90%] '>
      <div className='border-2 border-[#A1AFBA] flex flex-row items-center gap-3 shadow-2xl rounded-md py-2 px-3 mt-4'>
        <input type='text' placeholder='Ingrese el nombre de curso' value={nombre} onChange={(e) => setNombre(e.target.value)} className='border-2 border-neutral-400 py-1 rounded-lg w-full pl-2' />
        <button onClick={handleSearch} className='bg-[#A1AFBA] hover:bg-white border-2 border-black text-white block mx-auto rounded-md font-sm font-medium transition hover:text-black transform scale-x-[-1] focus:outline-none active:transform active:scale-95'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-7 h-7 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' /></svg>
        </button>
      </div>
      <div>
        {
          busqueda && coincidencias.length === 0 && (
            <div className='flex items-center mt-20'>
              <h1 className='font-bold text-2xl tracking-widest text-[#231F20] text-opacity-35 text-center'>Lo sentimos, no pudimos encontrar ningún resultado para tu búsqueda. Por favor, inténtalo de nuevo.</h1>
            </div>
          )
        }
        {
          coincidencias.length !== 0 && (
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-6 w-full'>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
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
                    <th scope='col' className='px-6 py-3'>
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((course, index) => (
                    <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        {course.nombre}
                      </th>
                      <td className='px-6 py-4'>
                        {course.descripcion}
                      </td>
                      <td className='px-6 py-4'>
                        <p className='text-wrap'>{course.imagenURL}</p>
                      </td>
                      <td className='flex items-center px-6 py-4'>
                        <a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Editar</a>
                        <a href='#' className='font-medium text-red-600 dark:text-red-500 hover:underline ms-3'>Eliminar</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='my-4 flex justify-center'>
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
  )
}

export default SearchCourse
