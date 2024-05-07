import { useEffect } from "react"
import { useProfessor } from '../../context/ProfessorContext'
import SGAUIS5 from '../../resources/SGA UIS 5.png'

function Professor() {
    const { viewProfessorCourses } = useProfessor()

    useEffect(() => {
        viewProfessorCourses()
      }, [])

  return (
    <img className='place-self-center opacity-85 w-2/5' src={SGAUIS5} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
  )
}

export default Professor