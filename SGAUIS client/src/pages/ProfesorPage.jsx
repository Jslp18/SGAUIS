import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useProfessor } from '../context/ProfessorContext'
import { useForm } from 'react-hook-form'
import CursosProfesor from './professor/CoursesProfessor'
import InfoProfesor from './professor/InfoProfessor'
import Professor from './professor/Professor'

function ProfessorPage() {

  const { user } = useAuth()
  const { reset } = useForm()
  const [showRegisterPage, setShowRegisterPage] = useState('home')

  const { setSearchStudents, setStudentsCourse, setSelectedFile, setSearchContent, setContentCourse, setHomeworkCourse, setSearchHomework } = useProfessor()

  const showRegister = (pagina) => {
    setShowRegisterPage(pagina)
    setStudentsCourse([])
    setSearchStudents(false)
    setContentCourse([])
    setSearchContent(false)
    setSelectedFile(null)
    setHomeworkCourse([])
    setSearchHomework(false)
    reset()
  }

  return (
    <div className='text-gray-900 bg-slate-100 body-font shadow w-full overflow-y-auto'>
      <div className='flex justify-start w-full h-[calc(100vh-9vh)]'>
        <div className='bg-white flex flex-col ml-6 my-6 mr-3 p-4 w-1/6 text-base rounded-lg border-2 border-black border-opacity-20 shadow-lg'>
          <div className='bg-[#545454] text-center rounded-lg mb-5 truncate md:overflow-clip'>
            <h1 className='text-lg text-white font-bold'> {user.codigo} </h1>
            <p className='text-md text-white'> {user.correo} </p>
          </div>
          <div className='flex flex-col text-start'>
            <button onClick={() => showRegister('home')} className='flex flex-row space-x-2 group cursor-pointer my-3 py-2 px-1 text-md focus:bg-[#918F8F] focus:text-white rounded-md border border-transparent'><svg xmlns='http://www.w3.org/2000/svg' fill='#D4D4D4' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] group-focus:text-[#2D2D2D] w-6 h-6 group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' /></svg><p className='text-[#2D2D2D] font-medium group-focus:font-bold group-focus:text-white'>Inicio</p></button>
            <button onClick={() => showRegister('cursos')} className='flex flex-row space-x-2 group cursor-pointer my-3 py-2 px-1 text-md focus:bg-[#918F8F] focus:text-white rounded-md border border-transparent'><svg xmlns='http://www.w3.org/2000/svg' fill='#D4D4D4' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] group-focus:text-[#2D2D2D] w-6 h-6 group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z' /></svg><p className='text-[#2D2D2D] font-medium group-focus:font-bold group-focus:text-white'>Mis Cursos</p></button>
            <button onClick={() => showRegister('info')} className='flex flex-row space-x-2 group cursor-pointer my-3 py-2 px-1 text-md focus:bg-[#918F8F] focus:text-white rounded-md border border-transparent'><svg xmlns='http://www.w3.org/2000/svg' fill='#D4D4D4' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z' /></svg><p className='text-[#2D2D2D] font-medium group-focus:font-bold group-focus:text-white'>Información</p></button>
          </div>
        </div>
        <div className='bg-slate-100 w-5/6 h-[calc(100vh-9vh)] flex justify-center'>
          {showRegisterPage === 'home' && <Professor />}
          {showRegisterPage === 'cursos' && <CursosProfesor />}
          {showRegisterPage === 'info' && <InfoProfesor />}
        </div>
      </div>
    </div>
  )
}

export default ProfessorPage
