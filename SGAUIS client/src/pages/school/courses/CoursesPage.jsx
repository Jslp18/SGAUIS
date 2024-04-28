import { useState } from 'react'
import ViewCourses from './ViewCourses'
import CreateCourse from './CreateCourse'
import SearchCourse from './SearchCourse'
import SGAUIS3 from '../../../resources/SGA UIS 3.png'

function CoursesPage() {
  const [showCoursePage, setShowCoursePage] = useState('paginaCurso')

  const showCourse = (pagina) => {
    setShowCoursePage(pagina)
  }

  return (
    <div className='flex flex-col items-center my-6 w-full'>
      <h1 className='font-semibold text-4xl tracking-widest text-[#231F20]'>Bienvenido al módulo de cursos</h1>
      <div className='flex flex-row items-center mt-4 space-x-8'>
        <button onClick={() => showCourse('verCursos')} className='flex flex-row space-x-2 group cursor-pointer my-2 py-1 px-3 text-md bg-[#A1AFBA] focus:bg-white focus:text-white rounded-2xl border-2 border-[#2D2D2D]'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5' /></svg><p className='text-white font-medium group-focus:font-bold group-focus:text-[#2D2D2D]'>Ver Cursos</p></button>
        <button onClick={() => showCourse('crearCurso')} className='flex flex-row space-x-2 group cursor-pointer my-2 py-1 px-3 text-md bg-[#A1AFBA] focus:bg-white focus:text-white rounded-2xl border-2 border-[#2D2D2D]'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z' /></svg><p className='text-white font-medium group-focus:font-bold group-focus:text-[#2D2D2D]'>Crear Curso</p></button>
        <button onClick={() => showCourse('buscarCurso')} className='flex flex-row space-x-2 group cursor-pointer my-2 py-1 px-3 text-md bg-[#A1AFBA] focus:bg-white focus:text-white rounded-2xl border-2 border-[#2D2D2D]'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-[#CCD3D9]'><path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' /></svg><p className='text-white font-medium group-focus:font-bold group-focus:text-[#2D2D2D]'>Buscar un curso</p></button>
      </div>
      <div className='bg-slate-100 w-full h-[calc(100vh-22vh)] flex flex-col'>
        {showCoursePage === 'paginaCurso' && <Cursos />}
        {showCoursePage === 'verCursos' && <ViewCourses />}
        {showCoursePage === 'crearCurso' && <CreateCourse />}
        {showCoursePage === 'buscarCurso' && <SearchCourse />}
      </div>
      <div className='bg-stone-900' />
    </div>
  )
}

function Cursos() {
  return (
    <img className='w-2/5 self-center opacity-65 mt-10' src={SGAUIS3} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
  )
}

export default CoursesPage
