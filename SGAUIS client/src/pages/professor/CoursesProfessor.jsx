import { useState } from 'react'
import { useProfessor } from '../../context/ProfessorContext'
import SGAUIS6 from '../../resources/SGA UIS 6.png'


function CoursesProfessor() {

  const { professorCourses, getStudentsCourse, studentsCourse, setStudentsCourse, search } = useProfessor()
  const [currentCourse, setCurrentCourse] = useState(null)
  const [currentId, setCurrentId] = useState('')
  const itemsPerPage = 7
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [showProfessorPage, setProfessorPage] = useState('profesorCurso')

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentStudents = studentsCourse.slice(indexOfFirstItem, indexOfLastItem)

  const [searchStudents, setSearchStudents] = useState(false)

  const showCourse = (pagina) => {
    setProfessorPage(pagina)
  }

  const contenidoCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('contenidoCurso')
    const idCurso = course._id
    await getStudentsCourse(idCurso)
    setSearchStudents(true)
  }

  const volver = () => {
    showCourse('profesorCurso')
    setStudentsCourse([])
    setSearchStudents(false)
  }

  return (
    <div className='flex flex-col items-center w-full ml-3 my-6 mr-6'>
      {showProfessorPage === 'profesorCurso' && (
        <div className='flex items-center justify-center w-full'>
          {
            search === true && professorCourses.length === 0 && (
              <div className='flex items-center mt-20 w-[80%] '>
                <h1 className='font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que no estás matriculado como profesor a ningún curso. Ponte en contácto con tu respectiva escuela.</h1>
              </div>
            )
          }
          {
            professorCourses.length !== 0 && (
              <div className='relative overflow-x-auto shadow-gray-500 shadow-2xl rounded-md w-full'>
                <table className='w-full text-sm text-left rtl:text-right text-neutral-800'>
                  <thead className='text-xs text-gray-800 uppercase bg-gray-100'>
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        Nombre del curso
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Descripción
                      </th>
                      <th scope='col' className='px-6 py-3 text-center'>
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {professorCourses.map(course => (
                      <tr key={course._id} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                        <th scope='row' className='px-6 py-1 font-medium text-gray-900 whitespace-nowrap'>
                          <button onClick={() => { contenidoCurso(course) }} className='hover:underline underline-offset-4 hover:text-blue-500 active:transform active:scale-110'>{course.nombre}</button>
                        </th>
                        <td className='px-6 py-1'>
                          {course.descripcion.substring(0, 50)}{course.descripcion.length > 50 ? '...' : ''}
                        </td>
                        <td className='flex flex-row items-center justify-center p-4 gap-4'>
                          <div className='flex flex-col items-center justify-center gap-3'>
                            <button /* onClick={() => { editarCurso(course) }} */ className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#94c192] hover:bg-[#79b372] focus:hover:bg-[#5cc24f] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" /></svg><p className='text-black font-normal group-focus:text-black'>Tareas</p></button>
                            <button /* onClick={() => { eliminarCurso(course._id) }} */ className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#c1ab92] hover:bg-[#b48c71] focus:hover:bg-[#c27d4f] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg><p className='text-black font-normal group-focus:text-black'>Cuestionarios</p></button>
                          </div>
                          <div className='flex flex-col items-center justify-center gap-3'>
                            <button /* onClick={() => { matricularUsuarios(course) }} */ className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#92acc1] hover:bg-[#71a7b4] focus:hover:bg-[#4796aa] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg><p className='text-black font-normal group-focus:text-black'>Calificaciones</p></button>
                            <button /* onClick={() => { desmatricularUsuarios(course) }}*/ className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#a692c1] hover:bg-[#9077bb] focus:hover:bg-[#7b4fc2] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg><p className='text-black font-normal group-focus:text-black'>Foros</p></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      )}
      {showProfessorPage === 'contenidoCurso' && (
        <div className='w-full'>
          {!searchStudents && (
            <div className='justify-center flex w-full bg-slate-100'>
              <img className='w-[50%] opacity-80' src={SGAUIS6} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
            </div>
          )}
            {
              searchStudents && studentsCourse.length === 0 && (
                <div className='relative mt-20 w-full'>
                  <span><button className='mt-2 ml-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-gray-500/10 active:bg-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
                  <h1 className='mt-4 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que no hay ningún estudiante matriculado en el curso {currentCourse.nombre}. Ponte en contácto con tu respectiva escuela.</h1>
                </div>
              )}
            <div className='w-full'>
            {
              studentsCourse.length !== 0 && (
                <div className='flex flex-row w-full'>
                <div className='w-[40%]'>
                <div className='relative overflow-x-auto shadow-gray-500 shadow-2xl rounded-xl w-full'>
                  <div>
                    <span><button className='mt-2 ml-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-gray-500/10 active:bg-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
                    <h1 className='block pl-4 bg-gradient-to-bl from-gray-400 to-slate-950 bg-clip-text font-sans text-2xl font-semibold leading-relaxed text-transparent antialiased text-center'>Estudiantes matriculados</h1>
                  </div>
                  <table className='w-full text-sm text-left rtl:text-right text-neutral-800'>
                    <thead className='text-xs text-gray-800 uppercase bg-gray-100'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          Código Universitario
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Nombre
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Correo electrónico
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((student, index) => (
                        <tr key={index} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                          <th scope='row' className='px-6 py-1 font-medium text-gray-900 whitespace-nowrap'>
                            {student.codigo}
                          </th>
                          <td className='px-6 py-3'>
                            {student.nombre}
                          </td>
                          <td className='px-6 py-3'>
                            {student.correo}
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
                </div>
                <div className='w-[60%]'>
                  Aquí se gestiona el contenido del curso
                </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  )
}
export default CoursesProfessor