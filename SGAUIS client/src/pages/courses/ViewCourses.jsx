import { useState } from 'react'
import { useAuth } from '../../context/Auth.context'

function ViewCourses () {
  const { courses } = useAuth()
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
    <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 mt-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[80%]'>
        {currentCourses.map((course, index) => (
          <div key={index} className='w-full bg-gray-50 rounded-lg shadow-xl overflow-hidden flex flex-col justify-center border-2 border-black border-opacity-15'>
            <div className='flex items-center px-7 pt-7 pb-2'>
              <img className='object-center object-cover h-auto w-full rounded-full' src={course.imagenURL} alt='photo' />
            </div>
            <div className='text-center pb-4'>
              <p className='text-xl text-slate-900 font-bold mb-2'>{course.nombre}</p>
              <p className='text-base text-stone-700 font-normal text-justify px-4'>{course.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-8 flex justify-center'>
        <nav className='block'>
          <ul className='flex list-none flex-row space-x-5 items-center'>
            <li>
              <button
                className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage === 1 ? 'bg-[#A1AFBA] text-white' : ''}`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6 text-[#2D2D2D] hover:text-white'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
                </svg>

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
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6 text-[#2D2D2D] hover:text-white'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
                </svg>

              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default ViewCourses
