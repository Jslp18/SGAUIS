import { useAuth } from '../context/Auth.context'
import RegisterPage from './RegisterPage'
import CoursesPage from './CoursesPage'
import UsersInscription from './UsersInscription'
import Info from './Info'
import { useState } from 'react'
import SGAUIS2 from '../resources/SGA UIS 2.png'

function SchoolPage () {
  const { user } = useAuth()

  const [showRegisterPage, setShowRegisterPage] = useState('home')

  const showRegister = (pagina) => {
    console.log(pagina)
    setShowRegisterPage(pagina)
  }

  return (
    <div className='text-gray-900 bg-gray-100 body-font shadow w-full'>
      <div className='flex justify-start h-[calc(100vh-12.1vh)] w-full'>
        <nav className='bg-white flex flex-col bg- m-4 p-4 w-1/6 text-base rounded-lg border-2 border-black border-opacity-20 shadow-lg'>
          <div className='bg-[#32527d] text-center rounded-lg mb-5 truncate md:overflow-clip'>
            <h1 className='text-lg text-white font-bold focus:bg-red-950'> {user.codigo} </h1>
            <p className='text-md text-white'> {user.correo} </p>
          </div>
          <div className='flex flex-col text-start'>
            <button onClick={() => showRegister('home')} className='flex flex-row space-x-5 group cursor-pointer my-2 py-1 px-2 text-md focus:bg-[#506077] focus:text-white rounded-lg border border-transparent'><svg xmlns='http://www.w3.org/2000/svg' fill='#969696' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-black group-focus:text-black w-6 h-6 group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' /></svg><p className='text-[#969696] font-medium group-focus:font-bold group-focus:text-white'>Home</p></button>
            <button onClick={() => showRegister('cursos')} className='flex flex-row space-x-5 group cursor-pointer my-2 py-1 px-2 text-md focus:bg-[#506077] focus:text-white rounded-lg border border-transparent'><svg xmlns='http://www.w3.org/2000/svg' fill='#969696' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-black group-focus:text-black w-6 h-6 group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z' /></svg><p className='text-[#969696] font-medium group-focus:font-bold group-focus:text-white'>Cursos</p></button>
            <button onClick={() => showRegister('inscribirUsuarios')} className='flex flex-row space-x-5 group cursor-pointer my-2 py-1 px-2 text-md focus:bg-[#506077] focus:text-white rounded-lg border border-transparent'><svg xmlns='http://www.w3.org/2000/svg' fill='#969696' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-black w-6 h-6 group-focus:text-black group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10' /></svg><p className='text-[#969696] font-medium group-focus:font-bold group-focus:text-white'>Inscribir Usuarios</p></button>
            <button onClick={() => showRegister('crearUsuarios')} className='flex flex-row space-x-5 group cursor-pointer my-2 py-1 px-2 text-md focus:bg-[#506077] focus:text-white rounded-lg border border-transparent'><svg xmlns='http://www.w3.org/2000/svg' fill='#969696' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-black w-6 h-6 group-focus:text-black group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z' /></svg><p className='text-[#969696] font-medium group-focus:font-bold group-focus:text-white'>Crear Usuarios</p></button>
            <button onClick={() => showRegister('info')} className='flex flex-row space-x-5 group cursor-pointer my-2 py-1 px-2 text-md focus:bg-[#506077] focus:text-white rounded-lg border border-transparent'><svg xmlns='http://www.w3.org/2000/svg' fill='#969696' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='text-black w-6 h-6 group-focus:text-black group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z' /></svg><p className='text-[#969696] font-medium group-focus:font-bold group-focus:text-white'>Información</p></button>
          </div>
        </nav>
        <div className='bg-gray-100 w-5/6 max-h-[calc(100vh-12.1vh)] overflow-auto flex items-center justify-center'>
          {showRegisterPage === 'home' && <Escuela />}
          {showRegisterPage === 'cursos' && <CoursesPage />}
          {showRegisterPage === 'inscribirUsuarios' && <UsersInscription />}
          {showRegisterPage === 'crearUsuarios' && <RegisterPage />}
          {showRegisterPage === 'info' && <Info />}
        </div>
      </div>
    </div>
  )
}

function Escuela () {
  return (
    <img className='opacity-50 w-1/3' src={SGAUIS2} alt='Descripción de la imagen' />
  )
}

export default SchoolPage
