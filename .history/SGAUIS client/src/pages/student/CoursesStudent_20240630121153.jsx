import { useState, useEffect } from 'react'
import { useStudent } from '../../context/StudentContext'
import { useForm } from 'react-hook-form'
import SGAUIS9 from '../../resources/SGA UIS 9.png'
// import SGAUIS10 from '../../resources/SGA UIS 10.png'
import SGAUIS11 from '../../resources/SGA UIS 11.png'
import moment from 'moment'

function CoursesStudent() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()

  const { studentCourses, search, errors: commentErrors, showSuccessMessage, getContentCourse, contentCourse, setContentCourse, searchContent, setSearchContent,
    getHomeworksCourse, homeworkCourse, setHomeworkCourse, searchHomework, setSearchHomework, getForumsCourse, forumCourse, setForumCourse, searchForum,
    setSearchForum, commentForumUpload, getCommentsForum, commentForumData, setCommentForumData, searchCommentForum, setSearchCommentForum,
    homeworkGrade, setHomeworkGrade, searchHomeworkSubmission, setSearchHomeworkSubmission, selectedFile, setSelectedFile } = useStudent()

  const [currentCourse, setCurrentCourse] = useState(null)
  const [currentForum, setCurrentForum] = useState(null)
  const [currentHomework, setCurrentHomework] = useState(null)

  const [currentId, setCurrentId] = useState('')
  const [currentForumId, setCurrentForumId] = useState('')
  const [currentHomeworkId, setCurrentHomeworkId] = useState('')

  const itemsPerPage = 10  // Content
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const itemsPerPage2 = 10 // Homeworks
  const [currentPage2, setCurrentPage2] = useState(1)
  const [totalPages2, setTotalPages2] = useState(1)

  const itemsPerPage4 = 10 // Forums
  const [currentPage4, setCurrentPage4] = useState(1)
  const [totalPages4, setTotalPages4] = useState(1)

  const [showStudentPage, setStudentPage] = useState('estudianteCurso')
  const [showForumPage, setForumPage] = useState('foros')
  const [showHomeworkPage, setHomeworkPage] = useState('tareas')

  // Mostrar el contenido que ha sido subido al curso
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentContent = contentCourse.slice(indexOfFirstItem, indexOfLastItem)

  // Mostrar las tareas que han sido subidas al curso
  const indexOfLastItem2 = currentPage2 * itemsPerPage2
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2
  const currentHomeworks = homeworkCourse.slice(indexOfFirstItem2, indexOfLastItem2)

  // Mostrar los foros que han sido subidos al curso
  const indexOfLastItem4 = currentPage4 * itemsPerPage4
  const indexOfFirstItem4 = indexOfLastItem4 - itemsPerPage4
  const currentForums = forumCourse.slice(indexOfFirstItem4, indexOfLastItem4)

  const maxCharacters = 500

  // Obtener el valor actual de 'descripcion'
  let comentario = watch('comentario') || ''
  // Truncar 'descripcion' si excede el límite de caracteres
  if (comentario.length > maxCharacters) {
    comentario = comentario.substring(0, maxCharacters)
  }
  // Obtener la longitud actual de 'descripcion'
  const comentarioLength = comentario.length

  const showCourse = (pagina) => {
    setStudentPage(pagina)
  }

  const showForum = (pagina) => {
    setForumPage(pagina)
  }

  const showHomework = (pagina) => {
    setHomeworkPage(pagina)
  }

  const contenidoCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('contenidoCurso')
    const idCurso = course._id
    setCurrentId(idCurso)
    const res = await getContentCourse(idCurso)
    setContentCourse(res)
    setTotalPages(Math.ceil(res.length / itemsPerPage))
    setCurrentPage(1)
    setSearchContent(true)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const paginate2 = (pageNumber) => setCurrentPage2(pageNumber)
  const paginate4 = (pageNumber) => setCurrentPage4(pageNumber)

  const volver = () => {
    showCourse('estudianteCurso')
    showForum('foros')
    showHomework('tareas')
    setContentCourse([])
    setSearchContent(false)
    setHomeworkCourse([])
    setSearchHomework(false)
    setForumCourse([])
    setSearchForum(false)
    reset()
  }

  // Entregar tarea (Subir tarea)
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  function descargarPDF(pdfURL, nombreArchivo) {
    fetch(pdfURL) // Hacer una solicitud GET al servidor que contiene el PDF
      .then(response => {
        // Verificar si la respuesta es exitosa (código de estado 200)
        if (!response.ok) {
          throw new Error('No se pudo descargar el archivo')
        }
        return response.blob() // Convertir la respuesta a un objeto Blob
      })
      .then(blob => {
        // Crear una URL para el objeto Blob
        const url = window.URL.createObjectURL(new Blob([blob]))
        // Crear un enlace <a> para iniciar la descarga
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', nombreArchivo) // Establecer el atributo 'download' con el nombre del archivo
        document.body.appendChild(link)
        link.click() // Simular un clic en el enlace para iniciar la descarga
        document.body.removeChild(link) // Eliminar el enlace después de la descarga
      })
      .catch(error => {
        console.error('Error al descargar el archivo:', error)
        // Aquí puedes mostrar un mensaje de error al usuario si la descarga falla
      })
  }

  // Módulo de tareas
  const tareasCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('tareasCurso')
    const idCurso = course._id
    setCurrentId(idCurso)

    const res = await getHomeworksCourse(idCurso)
    setHomeworkCourse(res)
    setTotalPages2(Math.ceil(res.length / itemsPerPage2))
    setCurrentPage2(1)
    setSearchHomework(true)
  }

  // Setear para subir la tarea
  const agregarEntrega = (homework) => {
    setSearchHomeworkSubmission(false)
    setHomeworkGrade(null)
    setCurrentHomework(homework)
    showHomework('agregarEntrega')
    const idHomework = homework._id
    console.log(idHomework)
    setCurrentHomeworkId(idHomework)
    reset()
  }

  const onSubmission = handleSubmit(async (values) => {
    const formData = new FormData() // Crea un objeto FormData para enviar el formulario
    formData.append('data', JSON.stringify({
      entregaTarea: values.pdf
    }))
    await homeworkSubmission(setCurrentHomeworkId, formData) // Envía el formData al backend
  })

  // Ver la calificación de la tarea
  const verCalificacion = async (homework) => {
    setSearchHomeworkSubmission(false)
    setHomeworkGrade(null)
    setCurrentHomework(homework)
    showHomework('verCalificacion')
    const idHomework = homework._id
    console.log(idHomework)
    setCurrentHomeworkId(idHomework)
    // await getHomeworkGrade(idHomework)
  }

  // Calcular si la tarea ya expiró
  const isPastDueDate = (dueDate) => {
    const formattedDueDate = moment(dueDate, 'DD/MM/YYYY, h:mm a');
    const now = moment();
    return formattedDueDate.isBefore(now);
  }

  // Subir cuestionario
  const cuestionariosCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('cuestionariosCurso')
    const idCurso = course._id
    setCurrentId(idCurso)
  }

  // Módulo de foros
  const forosCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('forosCurso')
    const idCurso = course._id
    setCurrentId(idCurso)

    const res = await getForumsCourse(idCurso)
    setForumCourse(res)
    setTotalPages4(Math.ceil(res.length / itemsPerPage4))
    setCurrentPage4(1)
    setSearchForum(true)
  }

  // Setear para subir el comentario
  const participar = (forum) => {
    setSearchCommentForum(false)
    setCommentForumData([])
    setCurrentForum(forum)
    showForum('participar')
    const idForum = forum._id
    setCurrentForumId(idForum)
    reset()
  }

  const onComment = handleSubmit(async (values) => {
    const formData = new FormData() // Crea un objeto FormData para enviar el formulario
    formData.append('data', JSON.stringify({
      comentario: values.comentario,
    }))
    await commentForumUpload(currentForumId, formData) // Envía el formData al backend
  })

  // Ver los comentarios del foro
  const verComentarios = async (forum) => {
    setSearchCommentForum(false)
    setCommentForumData([])
    setCurrentForum(forum)
    showForum('verComentarios')
    const idForum = forum._id
    setCurrentForumId(idForum)

    await getCommentsForum(idForum)
  }

  return (
    <div className='flex flex-col w-full h-max'>
      {showStudentPage === 'estudianteCurso' && (
        <div className='flex flex-col w-full'>
          {search === true && studentCourses.length === 0 && (
            <div className='flex place-self-center mt-20 w-[80%]'>
              <h1 className='font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que no estás matriculado como estudiante a ningún curso. Ponte en contácto con tu respectiva escuela.</h1>
            </div>
          )}
          {studentCourses.length !== 0 && (
            <div className='flex flex-col w-full rounded-lg bg-slate-100'>
              <div className='rounded-lg overflow-hidden shadow-gray-500 shadow-2xl'>
                <table className='w-full text-sm text-left text-neutral-800'>
                  <thead className='text-xs text-gray-800 uppercase'>
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        Nombre del curso
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Descripción
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Profesor
                      </th>
                      <th scope='col' className='px-6 py-3 text-center'>
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentCourses.map(course => (
                      <tr key={course._id} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                        <th scope='row' className='px-6 py-1 font-medium text-gray-900 whitespace-nowrap'>
                          <button onClick={() => { contenidoCurso(course) }} className='hover:underline underline-offset-4 hover:text-blue-500 active:transform active:scale-110'>{course.nombre}</button>
                        </th>
                        <td className='px-6 py-1'>
                          {course.descripcion.substring(0, 70)}{course.descripcion.length > 70 ? '...' : ''}
                        </td>
                        <td className='px-6 py-1 space-y-4'>
                          <p className='block bg-gradient-to-tr from-slate-800 to-gray-500 bg-clip-text font-sans text-normal font-semibold leading-relaxed text-transparent antialiased'>
                            {course.profesor.nombre}
                          </p>
                          <p className='block bg-gradient-to-tr from-blue-900/80 to-sky-500/80 bg-clip-text font-sans text-normal font-semibold leading-relaxed text-transparent antialiased'>
                            {course.profesor.correo}
                          </p>
                        </td>
                        <td className='flex flex-row items-center justify-center p-4 gap-4'>
                          <div className='flex flex-col items-center justify-center gap-3'>
                            <button onClick={() => { tareasCurso(course) }} className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#94c192] hover:bg-[#79b372] focus:hover:bg-[#5cc24f] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" /></svg><p className='text-black font-normal group-focus:text-black'>Tareas</p></button>
                            <button onClick={() => { cuestionariosCurso(course) }} className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#c1ab92] hover:bg-[#b48c71] focus:hover:bg-[#c27d4f] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg><p className='text-black font-normal group-focus:text-black'>Cuestionarios</p></button>
                          </div>
                          <div className='flex flex-col items-center justify-center gap-3'>
                            <button /* onClick={() => { calificacionesCurso(course) }} */ className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#92acc1] hover:bg-[#71a7b4] focus:hover:bg-[#4796aa] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg><p className='text-black font-normal group-focus:text-black'>Calificaciones</p></button>
                            <button onClick={() => { forosCurso(course) }} className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#a692c1] hover:bg-[#9077bb] focus:hover:bg-[#7b4fc2] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg><p className='text-black font-normal group-focus:text-black'>Foros</p></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      {showStudentPage === 'tareasCurso' && (
        <div className='flex items-center justify-center w-full'>
          {searchHomework === false && showStudentPage === 'tareasCurso' && (
            <div className='flex w-full justify-center bg-slate-100'>
              <img className='w-[53%] opacity-80' src={SGAUIS9} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
            </div>
          )}
          {searchHomework && homeworkCourse.length === 0 && showStudentPage === 'tareasCurso' && (
            <div className='relative w-full'>
              <span><button className='mt-2 ml-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
              <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que aún no hay tareas asignadas en el curso {currentCourse.nombre}.</h1>
            </div>
          )}
          {homeworkCourse.length !== 0 && showStudentPage === 'tareasCurso' && (
            <div className='flex flex-col w-full items-center justify-center'>
              <h1 className='my-6 font-bold text-4xl coinstracking-widest text-neutral-600 text-center'>Tareas del curso {currentCourse.nombre}</h1>
              <div className='flex flex-col overflow-x-auto shadow-gray-500 shadow-2xl rounded-xl bg-slate-100'>
                <div className='flex-shrink-0 bg-slate-100'>
                  <span className='place-self-start'><button className='m-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
                </div>
                <div className='overflow-x-auto'>
                  <table className='w-full text-sm text-left text-neutral-800'>
                    <thead className='text-xs text-gray-800 uppercase bg-teal-950/25'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          Nombre
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Descripción
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Fecha de entrega
                        </th>
                        <th scope='col' className='px-2 py-3'>
                          Calificación Máxima
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Archivo
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentHomeworks.map((homework, index2) => (
                        <tr key={index2} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                          <th scope='row' className='px-6 py-1 font-medium '>
                            {homework.nombre}
                          </th>
                          <td className='px-6 py-3'>
                            {homework.descripcion}
                          </td>
                          <td className='px-6 py-3'>
                            {isPastDueDate(homework.fechaEntrega) ? (
                              <p className='text-red-800'>{homework.fechaEntrega}</p>
                            ) : (
                              <p className='text-neutral-800'>{homework.fechaEntrega}</p>
                            )}
                          </td>
                          <td className='px-2 py-3'>
                            {homework.calificacionMaxima}
                          </td>
                          <td className='px-6 py-3'>
                            <button className='flex flex-row gap-3 underline-offset-4 items-center justify-center hover:text-blue-700' onClick={() => descargarPDF(homework.pdfFile.pdfURL, homework.pdfFile.nombre)}>{homework.pdfFile.nombre}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg></button>
                          </td>
                          <td className='px-6 py-3'>
                            {isPastDueDate(homework.fechaEntrega) ? (
                              <div className='flex flex-row gap-3'>
                                <p className='w-[50%]'>No es posible realizar esta entrega. La fecha ha expirado.</p>
                                <button onClick={() => { verCalificacion(homework) }} className='flex flex-row w-[50%] items-center justify-center p-2 group cursor-pointer text-md bg-zinc-400 hover:bg-zinc-500 focus:bg-zinc-600 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-3'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" /></svg><p className='text-black font-normal group-focus:text-black'>Ver calificación</p></button>
                              </div>
                            ) : (
                              <div className='flex flex-row gap-3'>
                                <button onClick={() => { agregarEntrega(homework) }} className='flex flex-row w-[50%] items-center justify-center p-2 group cursor-pointer text-md bg-slate-400 hover:bg-slate-500 focus:bg-slate-600 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-3'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg><p className='text-black font-normal group-focus:text-black'>Agregar entrega</p></button>
                                <button onClick={() => { verCalificacion(homework) }} className='flex flex-row w-[50%] items-center justify-center p-2 group cursor-pointer text-md bg-zinc-400 hover:bg-zinc-500 focus:bg-zinc-600 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-3'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" /></svg><p className='text-black font-normal group-focus:text-black'>Ver calificación</p></button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='flex items-center justify-center my-2 w-full'>
                  <nav className='block'>
                    <ul className='flex list-none flex-row space-x-5 items-center'>
                      <li>
                        <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage2 === 1 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate2(currentPage2 - 1)} disabled={currentPage2 === 1}>
                          Anterior
                        </button>
                      </li>
                      {Array.from({ length: totalPages2 }, (_, i) => i + 1).map((number2) => (
                        <li key={number2}>
                          <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage2 === number2 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate2(number2)}>
                            {number2}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage2 === totalPages2 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate2(currentPage2 + 1)} disabled={currentPage2 === totalPages2}>
                          Siguiente
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              {showHomeworkPage === 'agregarEntrega' && (
                <div className='bg-white text-gray-200 shadow-gray-400 shadow-2xl flex flex-col py-8 px-8 rounded-lg w-[50%] mt-10'>
                  {showSuccessMessage && (
                    <div className='fixed z-10 inset-0 overflow-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                      <div className='flex items-end justify-center min-h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
                          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203</span>
                          <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                            <div className='bg-white sm:p-4 sm:pb-4'>
                              <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                                  La tarea {currentHomework.nombre} ha sido entregada de manera satisfactoria.
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='flex flex-row items-center justify-center gap-2'>
                    <h1 className='font-bold text-xl coinstracking-widest text-neutral-700 text-center'>Agregar entrega tarea asignada</h1>
                    <h1 className='font-bold text-xl coinstracking-widest text-amber-700/60 text-center'>{currentHomework.nombre}</h1>
                  </div>
                  <form onSubmit={onSubmission} encType='multipart/form-data'>
                    <div className='flex flex-col my-6 bg-gray-950/15 py-4 rounded-xl items-center justify-center'>
                      <div className="my-2 relative">
                        <input {...register('pdf', { required: true })} id="upload-pdf" type="file" accept=".pdf" onChange={handleFileChange} className="sr-only" />
                        <label htmlFor="upload-pdf" className="cursor-pointer rounded-md font-medium text-blue-800/80 hover:text-purple-800/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> {selectedFile ? 'Cambiar archivo PDF' : 'Subir archivo PDF'} </label>
                      </div>
                      <label htmlFor='pdf' className='block text-sm font-medium text-gray-700 mb-2'> {selectedFile ? (<span>Archivo seleccionado: {selectedFile.name}</span>) : (<span>Anexar indicaciones adicionales</span>)}</label>
                      {errors.pdf && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
                    </div>
                    <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'> Agregar entrega </button>
                  </form>
                  {commentErrors.map((error, i) => (
                    <div className='bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
                      {error}
                    </div>
                  ))}
                </div>
              )}
              {showHomeworkPage === 'verCalificacion' && (
                <div>
                  Viendo calificación
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {showStudentPage === 'calificacionesCurso' && (
        <div className=''>
          Acá se gestionan las calificaciones
        </div>
      )}
      {showStudentPage === 'cuestionariosCurso' && (
        <div className=''>
          Acá se gestionan los cuestionarios
        </div>
      )}
      {showStudentPage === 'forosCurso' && (
        <div className='flex items-center justify-center w-full'>
          {searchForum === false && showStudentPage === 'forosCurso' && (
            <div className='flex items-center justify-center w-full bg-slate-100'>
              <img className='w-[53%] opacity-80' src={SGAUIS11} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
            </div>
          )}
          {searchForum && forumCourse.length === 0 && showStudentPage === 'forosCurso' && (
            <div className='relative w-full'>
              <span className='place-self-start'><button className='m-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
              <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que aún no hay foros asignados en el curso {currentCourse.nombre}.</h1>
            </div>
          )}
          {forumCourse.length !== 0 && showStudentPage === 'forosCurso' && (
            <div className='flex flex-col items-center justify-center w-full'>
              <h1 className='my-6 font-bold text-4xl coinstracking-widest text-neutral-600 text-center'>Foros del curso {currentCourse.nombre}</h1>
              <div className='flex flex-col overflow-x-auto shadow-gray-400 shadow-2xl rounded-xl bg-slate-100 w-full'>
                <div className='flex-shrink-0 bg-slate-100'>
                  <span className='place-self-start'><button className='m-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>                </div>
                <div className='overflow-x-auto'>
                  <table className='w-full text-sm text-left text-neutral-800'>
                    <thead className='text-xs text-gray-800 uppercase bg-teal-950/25'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          Título
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Descripción
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentForums.map((forum, index4) => (
                        <tr key={index4} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                          <th scope='row' className='px-6 py-3 font-medium '>
                            {forum.titulo}
                          </th>
                          <td className='px-6 py-3'>
                            {forum.descripcion.substring(0, 80)}{forum.descripcion.length > 80 ? '...' : ''}
                          </td>
                          <td className='flex flex-row px-6 py-3 gap-3'>
                            <button onClick={() => { participar(forum) }} className='flex flex-row w-[40%] items-center justify-center py-2 group cursor-pointer text-md bg-slate-400 hover:bg-slate-500 focus:bg-slate-600 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-2'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125' /></svg><p className='text-black font-normal group-focus:text-black'>Participar</p></button>
                            <button onClick={() => { verComentarios(forum) }} className='flex flex-row w-[40%] items-center justify-center py-2 group cursor-pointer text-md bg-zinc-400 hover:bg-zinc-500 focus:bg-zinc-600 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg><p className='text-black font-normal group-focus:text-black'>Comentarios</p></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='flex items-center justify-center my-2 w-full'>
                  <nav className='block'>
                    <ul className='flex list-none flex-row space-x-5 items-center'>
                      <li>
                        <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage4 === 1 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate4(currentPage4 - 1)} disabled={currentPage4 === 1}>
                          Anterior
                        </button>
                      </li>
                      {Array.from({ length: totalPages4 }, (_, i) => i + 1).map((number4) => (
                        <li key={number4}>
                          <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage4 === number4 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate4(number4)}>
                            {number4}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage4 === totalPages4 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate4(currentPage4 + 1)} disabled={currentPage4 === totalPages4}>
                          Siguiente
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              {showForumPage === 'participar' && (
                <div className='bg-white text-gray-200 shadow-gray-400 shadow-2xl flex flex-col py-8 px-8 rounded-lg w-[50%] mt-10'>
                  {showSuccessMessage && (
                    <div className='fixed z-10 inset-0 overflow-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                      <div className='flex items-end justify-center min-h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
                          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203</span>
                          <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                            <div className='bg-white sm:p-4 sm:pb-4'>
                              <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                                  El comentario ha sido añadido al foro {currentForum.titulo} de manera satisfactoria.
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='flex flex-row items-center justify-center gap-2'>
                    <h1 className='font-bold text-xl coinstracking-widest text-neutral-700 text-center'>Réplica de foro</h1>
                    <h1 className='font-bold text-xl coinstracking-widest text-amber-700/60 text-center'>{currentForum.titulo}</h1>
                  </div>
                  <form onSubmit={onComment} encType='multipart/form-data'>
                    <div className='mb-6 relative'>
                      <label htmlFor='comentario' className='flex text-sm font-medium text-gray-700 mb-2'>Comentar</label>
                      <textarea value={comentario} rows='6' {...register('comentario', { required: true })} id='comentario' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2 resize-none text-justify' placeholder='Ingrese la respuesta a la discusión propuesta' />
                      <span className={`absolute bottom-3 right-3 text-sm font-medium ${comentarioLength === maxCharacters ? 'text-red-800/80' : 'text-emerald-800/80'}`}>{comentarioLength}<span className='text-sky-700'>/{maxCharacters}</span></span>
                      {errors.comentario && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
                    </div>
                    <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>Subir comentario</button>
                  </form>
                  {commentErrors.map((error, i) => (
                    <div className='bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
                      {error}
                    </div>
                  ))}
                </div>
              )}
              {showForumPage === 'verComentarios' && (
                <div className='flex flex-col w-full items-center justify-center'>
                  {searchCommentForum === false && showForumPage === 'verComentarios' && (
                    <div className='flex flex-col items-center justify-center my-14 w-full'>
                      <h1 className='font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Cargando comentarios del foro...</h1>
                    </div>
                  )}
                  {searchCommentForum === true && commentForumData.length === 0 && showForumPage === 'verComentarios' && (
                    <div className='flex place-self-center my-14 w-[80%]'>
                      <h1 className='font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que no hay ninguna respuesta a la discusión asignada en el foro {currentForum.titulo}.</h1>
                    </div>
                  )}
                  {commentForumData.length !== 0 && showForumPage === 'verComentarios' && (
                    <div className='flex flex-col w-[70%] rounded-lg my-14'>
                      <div className='flex flex-row items-center justify-center gap-2'>
                        <h1 className='font-bold text-2xl coinstracking-widest text-neutral-700 text-center'>Respuestas del foro</h1>
                        <h1 className='font-bold text-2xl coinstracking-widest text-amber-700/60 text-center'>{currentForum.titulo}</h1>
                      </div>
                      <div className='space-y-8 mt-4'>
                        {commentForumData.map((comment, index5) => (
                          <div key={index5} className='p-6 rounded-lg shadow-gray-500 shadow-lg bg-white/80'>
                            <p className='text-justify'>{comment.comentario}</p>
                            <span className='text-end text-sm font-medium block bg-gradient-to-tr from-neutral-900 to-gray-700 bg-clip-text font-sans leading-relaxed text-transparent antialiased'>{comment.usuario.nombre} - {comment.usuario.codigo}</span>
                            <span className='text-end text-sm font-normal block bg-gradient-to-tr from-sky-900 to-sky-700 bg-clip-text font-sans leading-relaxed text-transparent antialiased'>{comment.usuario.correo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {showStudentPage === 'contenidoCurso' && (
        <div className='flex items-center justify-center w-full'>
          {searchContent === false && showStudentPage === 'contenidoCurso' && (
            <div className='flex flex-col items-center justify-center w-full bg-slate-100'>
              <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Cargando contenido del curso...</h1>
            </div>
          )}
          {searchContent && contentCourse.length === 0 && showStudentPage === 'contenidoCurso' && (
            <div className='relative justify-center w-full'>
              <span className='place-self-start'><button className='mt-2 ml-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
              <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que aún no hay contenido en el curso {currentCourse.nombre}.</h1>
            </div>
          )}
          {contentCourse.length !== 0 && showStudentPage === 'contenidoCurso' && (
            <div className='flex flex-col w-full'>
              <h1 className='my-6 font-bold text-4xl coinstracking-widest text-neutral-600 text-center'>Contenido del curso {currentCourse.nombre}</h1>
              <div className='flex flex-col shadow-gray-500 shadow-2xl rounded-xl bg-slate-100 w-full'>
                <div className='flex-shrink-0 bg-slate-100 rounded-t-xl'>
                  <span className='place-self-start'><button className='m-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
                </div>
                <div className='overflow-x-auto'>
                  <table className='w-full text-sm text-left text-neutral-800'>
                    <thead className='text-xs text-gray-800 uppercase bg-teal-950/25'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          Nombre
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Descripción
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Archivo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentContent.map((content, index) => (
                        <tr key={index} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                          <th scope='row' className='px-6 py-3 font-medium '>
                            {content.nombre}
                          </th>
                          <td className='px-6 py-3'>
                            {content.descripcion}
                          </td>
                          <td className='px-6 py-3'>
                            <button className='flex flex-row gap-3 underline-offset-4 items-center justify-center hover:text-blue-500' onClick={() => descargarPDF(content.pdfFile.pdfURL, content.pdfFile.nombre)}>{content.pdfFile.nombre} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='flex items-center justify-center w-full my-2'>
                  <nav className='block'>
                    <ul className='flex list-none flex-row space-x-5 items-center'>
                      <li>
                        <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage === 1 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                          Anterior
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <li key={number}>
                          <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage === number ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate(number)}>
                            {number}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage === totalPages ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                          Siguiente
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CoursesStudent