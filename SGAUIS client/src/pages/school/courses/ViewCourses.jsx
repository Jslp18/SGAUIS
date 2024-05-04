import { useState } from 'react'
import { useCourses } from '../../../context/CoursesContext'

function ViewCourses() {
  const { courses, search } = useCourses()
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3 // Puedes ajustar esto según tu preferencia
  const totalPages = Math.ceil(courses.length / itemsPerPage)

  // Calcular los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Función para generar los números de página en función de la página actual y el total de páginas
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPageNumbers = 5 // Máximo número de botones de página para mostrar

    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2))
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <section className='mx-auto px-2 flex items-center w-[70%] justify-center mt-10'>
      {search === true && courses.length === 0 && (
        <div className='flex items-center mt-20'>
          <h1 className='font-bold text-2xl tracking-widest text-[#231F20] text-opacity-35 text-center'>Parece que no has creado ningún curso</h1>
        </div>
      )}
      {courses.length !== 0 && (
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 h-auto '>
            {currentCourses.map((course, index) => (
              <div key={index} className='w-full bg-gray-100 rounded-3xl shadow-xl flex flex-col h-[90%] items-center border-2 border-black border-opacity-15'>
                <div className='flex m-4 items-center justify-center overflow-hidden border-2 border-gray-700 border-opacity-80 rounded-xl'>
                  <img className='h-60 shadow-2xl rounded-lg' src={course.imagenURL} alt={course.nombre} />
                </div>
                <div className='text-start pb-2'>
                  <p className='block pl-4 bg-gradient-to-tr from-zinc-400 to-slate-800 bg-clip-text font-sans text-xl font-semibold leading-relaxed text-transparent antialiased'>{course.nombre}</p>
                  <p className='text-base text-gray-900 font-normal text-justify px-4'>{course.descripcion.substring(0, 70)}{course.descripcion.length > 70 ? '...' : ''}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center'>
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
                {getPageNumbers().map((number) => (
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
                    className={`hover:hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage === totalPages ? 'bg-[#A1AFBA] text-white' : ''}`}
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
      )}
    </section>
  )
}

export default ViewCourses
