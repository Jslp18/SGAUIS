import { useState } from 'react'
import { useAuth } from '../../context/Auth.context'
import ViewCourses from './ViewCourses'
import CreateCourse from './CreateCourse'
import EditCourse from './EditCourse'
import DeleteCourse from './DeleteCourse'

function CoursesPage () {
  const [showCoursePage, setShowCoursePage] = useState(null)
  const { viewCourses } = useAuth()

  const showCourse = (pagina) => {
    setShowCoursePage(pagina)
  }

  const handleVerCursosClick = async () => {
    setShowCoursePage('verCursos')
    await viewCourses()
  }

  return (
    <div className='flex flex-col items-center my-6'>
      <h1 className='font-semibold text-4xl tracking-widest text-[#231F20]'>Bienvenido al módulo de cursos</h1>
      <div className='flex flex-row items-center mt-8 space-x-8'>
        <button onClick={handleVerCursosClick} className='flex flex-row space-x-2 group cursor-pointer my-2 py-1 px-3 text-md bg-[#A1AFBA] focus:bg-white focus:text-white rounded-2xl border-2 border-[#2D2D2D]'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' /></svg><p className='text-white font-medium group-focus:font-bold group-focus:text-[#2D2D2D]'>Ver Cursos</p></button>
        <button onClick={() => showCourse('crearCurso')} className='flex flex-row space-x-2 group cursor-pointer my-2 py-1 px-3 text-md bg-[#A1AFBA] focus:bg-white focus:text-white rounded-2xl border-2 border-[#2D2D2D]'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z' /></svg><p className='text-white font-medium group-focus:font-bold group-focus:text-[#2D2D2D]'>Crear Curso</p></button>
        <button onClick={() => showCourse('editarCurso')} className='flex flex-row space-x-2 group cursor-pointer my-2 py-1 px-3 text-md bg-[#A1AFBA] focus:bg-white focus:text-white rounded-2xl border-2 border-[#2D2D2D]'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125' /></svg><p className='text-white font-medium group-focus:font-bold group-focus:text-[#2D2D2D]'>Editar Curso</p></button>
        <button onClick={() => showCourse('eliminarCurso')} className='flex flex-row space-x-2 group cursor-pointer my-2 py-1 px-3 text-md bg-[#A1AFBA] focus:bg-white focus:text-white rounded-2xl border-2 border-[#2D2D2D]'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5' /></svg><p className='text-white font-medium group-focus:font-bold group-focus:text-[#2D2D2D]'>Eliminar Curso</p></button>
      </div>
      <div className='bg-slate-50 w-5/6 h-[calc(100vh-22vh)] flex justify-center'>
        {showCoursePage === 'verCursos' && <ViewCourses />}
        {showCoursePage === 'crearCurso' && <CreateCourse />}
        {showCoursePage === 'editarCurso' && <EditCourse />}
        {showCoursePage === 'eliminarCurso' && <DeleteCourse />}
      </div>
      <div className='bg-stone-900' />
    </div>
  )
}

export default CoursesPage
