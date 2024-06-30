import { useState, useEffect } from 'react'
import { useProfessor } from '../../context/ProfessorContext'
import { useForm } from 'react-hook-form'
import SGAUIS6 from '../../resources/SGA UIS 6.png'
import SGAUIS9 from '../../resources/SGA UIS 9.png'
import SGAUIS10 from '../../resources/SGA UIS 10.png'
import SGAUIS11 from '../../resources/SGA UIS 11.png'


function CoursesProfessor() {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm()

  const { professorCourses, getStudentsCourse, studentsCourse, setStudentsCourse, search, searchStudents, setSearchStudents, selectedFile,
    setSelectedFile, contentUpload, errors: contentErrors, errors: professorErrors, showSuccessMessage, viewProfessorCourses, contentData,
    getContentCourse, contentCourse, setContentCourse, searchContent, setSearchContent, homeworkUpload, homeworkData, getHomeworksCourse,
    homeworkCourse, setHomeworkCourse, searchHomework, setSearchHomework, getHomeworkForEdit, deleteHomework, homeworkUpdate, questionnaireUpload,
    questionnaireData, getQuestionnairesCourse, questionnaireCourse, setQuestionnaireCourse, searchQuestionnaire, setSearchQuestionnaire,
    getQuestionnaireForEdit, questionnaireUpdate, deleteQuestionnaire, forumUpload, forumData, getForumsCourse, forumCourse, setForumCourse,
    searchForum, setSearchForum, getForumForEdit, forumUpdate, deleteForum } = useProfessor()

  const [currentCourse, setCurrentCourse] = useState(null)
  const [currentHomework, setCurrentHomework] = useState(null)
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null)
  const [currentForum, setCurrentForum] = useState(null)
  const [currentId, setCurrentId] = useState('')

  const itemsPerPage = 7 // Students
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const itemsPerPage2 = 1 // Content
  const [currentPage2, setCurrentPage2] = useState(1)
  const [totalPages2, setTotalPages2] = useState(1)

  const itemsPerPage3 = 5 // Homework
  const [currentPage3, setCurrentPage3] = useState(1)
  const [totalPages3, setTotalPages3] = useState(1)

  const itemsPerPage4 = 3 // Questionnaire
  const [currentPage4, setCurrentPage4] = useState(1)
  const [totalPages4, setTotalPages4] = useState(1)

  const itemsPerPage5 = 9 // Forum
  const [currentPage5, setCurrentPage5] = useState(1)
  const [totalPages5, setTotalPages5] = useState(1)

  const [showProfessorPage, setProfessorPage] = useState('profesorCurso')
  const [showContentUpload, setShowContentUpload] = useState('')
  const [showContentView, setShowContentView] = useState('')

  const [showDisplayContent, setshowDisplayContent] = useState(false)
  const [showUploadContent, setShowUploadContent] = useState(false)

  // Mostrar los estudiantes matriculados en el curso
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentStudents = studentsCourse.slice(indexOfFirstItem, indexOfLastItem)

  // Mostrar el contenido que ha sido subido al curso
  const indexOfLastItem2 = currentPage2 * itemsPerPage2
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2
  const currentContent = contentCourse.slice(indexOfFirstItem2, indexOfLastItem2)

  // Mostrar las tareas que han sido subidas al curso
  const indexOfLastItem3 = currentPage3 * itemsPerPage3
  const indexOfFirstItem3 = indexOfLastItem3 - itemsPerPage3
  const currentHomeworks = homeworkCourse.slice(indexOfFirstItem3, indexOfLastItem3)

  // Mostrar los cuestionarios que han sido subidos al curso
  const indexOfLastItem4 = currentPage4 * itemsPerPage4
  const indexOfFirstItem4 = indexOfLastItem4 - itemsPerPage4
  const currentQuestionnaires = questionnaireCourse.slice(indexOfFirstItem4, indexOfLastItem4)

  // Mostrar los foros que han sido subidos al curso
  const indexOfLastItem5 = currentPage5 * itemsPerPage5
  const indexOfFirstItem5 = indexOfLastItem5 - itemsPerPage5
  const currentForums = forumCourse.slice(indexOfFirstItem5, indexOfLastItem5)

  const maxCharacters = 200

  // Obtener el valor actual de 'descripcion'
  let descripcion = watch('descripcion') || ''
  // Truncar 'descripcion' si excede el límite de caracteres
  if (descripcion.length > maxCharacters) {
    descripcion = descripcion.substring(0, maxCharacters)
  }
  // Obtener la longitud actual de 'descripcion'
  const descripcionLength = descripcion.length

  // Variable para definir el estado del formulario tarea, crear tarea ó actualizar tarea
  const [homeworkState, setHomeworkState] = useState(false)

  // Actual id de la tarea
  const [currentHomeworkId, setCurrentHomeworkId] = useState('')

  // Variable para definir el estado del formulario cuestionario, crear cuestionario ó actualizar cuestionario
  const [questionnaireState, setQuestionnaireState] = useState(false)

  // Actual id del cuestionario
  const [currentQuestionnaireId, setCurrentQuestionnaireId] = useState('')

  // Variable para definir el estado del formulario foro, crear foro ó actualizar foro
  const [forumState, setForumState] = useState(false)

  // Actual id del foro
  const [currentForumId, setCurrentForumId] = useState('')

  // Lógica para mapear las preguntas
  const preguntas = watch('preguntas', [])

  const handleInputChange = (index, field, value) => {
    setValue(`preguntas[${index}].${field}`, value) // Actualiza el valor en react-hook-form
  }

  const handleRespuestaChange = (indexPregunta, indexRespuesta, field, value) => {
    setValue(`preguntas[${indexPregunta}].respuestas[${indexRespuesta}].${field}`, value)
  }

  const convertToLocalDateTimeString = (isoDateString) => {
    if (!isoDateString) return '' // Manejar el caso en que la fecha sea undefined o null

    const date = new Date(isoDateString) // Crear un objeto Date desde la cadena ISO 8601
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    // Formatear la fecha y la hora en el formato que espera datetime-local
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const convertToLocalDateString = (isoDateString) => {
    if (!isoDateString) return '' // Manejar el caso en que la fecha sea undefined o null

    const date = new Date(isoDateString) // Crear un objeto Date desde la cadena ISO 8601
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = (date.getDate() + 1).toString().padStart(2, '0')
    // Formatear la fecha y la hora en el formato que espera datetime-local
    return `${year}-${month}-${day}`
  }

  // Setear en los inputs los valores de la tarea
  useEffect(() => {
    if (homeworkState && currentHomework) {
      setValue('nombre', currentHomework.nombre)
      setValue('calificacionMaxima', currentHomework.calificacionMaxima)
      setValue('descripcion', currentHomework.descripcion)
      setValue('fecha', convertToLocalDateTimeString(currentHomework.fechaEntrega))
    }
  }, [homeworkState, currentHomework, setValue])

  // Setear en los inputs los valores del cuestionario
  useEffect(() => {
    if (questionnaireState && currentQuestionnaire) {
      setValue('nombre', currentQuestionnaire.nombre)
      setValue('calificacionMaxima', currentQuestionnaire.calificacionMaxima)
      setValue('descripcion', currentQuestionnaire.descripcion)
      setValue('fecha', convertToLocalDateString(currentQuestionnaire.fecha))
      setValue('tiempoi', currentQuestionnaire.tiempoInicial)
      setValue('tiempof', currentQuestionnaire.tiempoFinal)
      setValue('preguntas', currentQuestionnaire.preguntas)
    }
  }, [questionnaireState, currentQuestionnaire, setValue])

  // Setear en los inputs los valores del foro
  useEffect(() => {
    if (forumState && currentForum) {
      setValue('titulo', currentForum.titulo)
      setValue('descripcion', currentForum.descripcion)
    }
  }, [forumState, currentForum, setValue])

  const showHomeworkState = () => {
    setHomeworkState(!homeworkState)
  }

  const showQuestionnaireSate = () => {
    setQuestionnaireState(!questionnaireState)
  }

  const showForumState = () => {
    setForumState(!forumState)
  }

  const showCourse = (pagina) => {
    setProfessorPage(pagina)
  }

  const showUpload = (pagina) => {
    setShowUploadContent(!showUploadContent)
    setShowContentUpload(pagina)
    reset()
  }

  const showContent = async (pagina) => {
    setshowDisplayContent(!showDisplayContent) // Alternar entre true y false
    setShowContentView(pagina)
    reset()
    const res = await getContentCourse(currentId)
    setContentCourse(res)
    setTotalPages2(Math.ceil(res.length / itemsPerPage2))
    setCurrentPage2(1)
    setSearchContent(true)
  }

  const contenidoCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('contenidoCurso')
    const idCurso = course._id
    setCurrentId(idCurso)
    const res = await getStudentsCourse(idCurso)
    setStudentsCourse(res)
    setTotalPages(Math.ceil(res.length / itemsPerPage))
    setCurrentPage(1)
    setSearchStudents(true)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const paginate2 = (pageNumber) => setCurrentPage2(pageNumber)
  const paginate3 = (pageNumber) => setCurrentPage3(pageNumber)
  const paginate4 = (pageNumber) => setCurrentPage4(pageNumber)
  const paginate5 = (pageNumber) => setCurrentPage5(pageNumber)

  const volver = () => {
    showCourse('profesorCurso')
    setStudentsCourse([])
    setSearchStudents(false)
    setContentCourse([])
    setSearchContent(false)
    setShowUploadContent(false)
    setshowDisplayContent(false)
    setSelectedFile(null)
    setHomeworkCourse([])
    setSearchHomework(false)
    setHomeworkState(false)
    setProfessorPage('profesorCurso')
    setQuestionnaireCourse([])
    setSearchQuestionnaire(false)
    setQuestionnaireState(false)
    setForumCourse([])
    setSearchForum(false)
    setForumState(false)
    reset()
  }

  // Subir contenido
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const onContent = handleSubmit(async (values) => {
    const formData = new FormData() // Crea un objeto FormData para enviar el formulario
    formData.append('nombre', values.nombre) // Agrega los valores del formulario al objeto FormData
    formData.append('descripcion', values.descripcion)
    formData.append('pdf', selectedFile) // Agrega el archivo seleccionado al objeto FormData
    await contentUpload(currentId, formData) // Envía el formData al backend
  })

  useEffect(() => {
    viewProfessorCourses()
  }, [])

  // Descargar PDF
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

  // Subir tareas
  const tareasCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('tareasCurso')
    const idCurso = course._id
    setCurrentId(idCurso)

    const estudiantes = await getStudentsCourse(idCurso)
    setStudentsCourse(estudiantes)
    setSearchStudents(true)

    const res = await getHomeworksCourse(idCurso)
    setHomeworkCourse(res)
    setTotalPages3(Math.ceil(res.length / itemsPerPage3))
    setCurrentPage3(1)
    setSearchHomework(true)
  }

  // Formulario que llama a otros formularios
  const onForm = handleSubmit(async (values) => {
    if (homeworkState) {
      onUpdateHomework(values)
    }
    else {
      onUploadHomework(values)
    }
  })

  // Formulario para subir tareas
  const onUploadHomework = async (values) => {
    const formData = new FormData()
    formData.append('pdf', selectedFile)

    // Añadir datos JSON al formData
    formData.append('data', JSON.stringify({
      nombre: values.nombre,
      descripcion: values.descripcion,
      calificacionMaxima: values.calificacionMaxima,
      fecha: convertToLocalDateTimeString(values.fecha)
    }))
    await homeworkUpload(currentId, formData)

    // Se actualice al ejecutar una subida de tareas
    const res = await getHomeworksCourse(currentId)
    setHomeworkCourse(res)
    setTotalPages3(Math.ceil(res.length / itemsPerPage3))
    setCurrentPage3(1)
    setSearchHomework(true)
  }

  // Mostrar el contenido para editar tarea 
  const mostrarEditarTarea = async (idTarea) => {
    setCurrentHomeworkId(idTarea)
    if (!homeworkState) {
      const res = await getHomeworkForEdit(idTarea)
      setCurrentHomework(res)
    }
    // Cambia el estado después de la verificación
    showHomeworkState()
    setSelectedFile(null)
    reset()
  }

  // Formulario para actualizar tareas
  const onUpdateHomework = async (values) => {
    const formData = new FormData()
    formData.append('pdf', selectedFile)

    // Añadir datos JSON al formData
    formData.append('data', JSON.stringify({
      nombre: values.nombre,
      descripcion: values.descripcion,
      calificacionMaxima: values.calificacionMaxima,
      fecha: convertToLocalDateTimeString(values.fecha)
    }))
    await homeworkUpdate(currentHomeworkId, formData)

    // Se actualice al ejecutar una subida de tareas
    const res = await getHomeworksCourse(currentId)
    setHomeworkCourse(res)
    setTotalPages3(Math.ceil(res.length / itemsPerPage3))
    setCurrentPage3(1)
    setSearchHomework(true)
  }

  // Eliminar tarea
  const eliminarTarea = async (idTarea) => {
    const res = await deleteHomework(idTarea)
    if (res.status === 204) {
      const updatedHomeworks = homeworkCourse.filter(homework => homework._id !== idTarea)
      setHomeworkCourse(updatedHomeworks)
      // Ajustar la paginación
      const totalPages = Math.ceil(updatedHomeworks.length / itemsPerPage3);
      if (currentPage3 > totalPages) {
        setCurrentPage3(currentPage3 - 1); // Regresas a la página anterior si la página actual ya no existe
        setTotalPages3(totalPages); // Actualizas el total de páginas
      } else {
        setTotalPages3(totalPages); // Actualizas el total de páginas
      }
    }
  }

  // Mostrar añadir pregunta
  const añadirPregunta = () => {
    setValue('preguntas', [...preguntas, { pregunta: '', respuestas: [] }])
  }

  // Mostrar añadir respuesta
  const añadirRespuesta = (index) => {
    // Agregar una nueva respuesta solo si el número de respuestas es menor que 5
    const pregunta = preguntas[index]
    if (pregunta.respuestas.length < 5) {
      const newPreguntas = preguntas.map((pregunta, i) => {
        if (i === index) {
          return { ...pregunta, respuestas: [...pregunta.respuestas, { respuesta: '', esCorrecta: false }] }
        }
        return pregunta
      })
      // Actualizar el estado de preguntas solo si se agrega una nueva respuesta
      setValue('preguntas', newPreguntas)
    }
  }

  // No se elimina por completo
  const eliminarPregunta = (index) => {
    const newPreguntas = preguntas.filter((_, i) => i !== index)
    setValue('preguntas', newPreguntas)
  }

  // Se está eliminando por defecto el último elemento
  const eliminarRespuesta = (indexPregunta, indexRespuesta) => {
    // Mapear las preguntas para encontrar la pregunta específica
    const newPreguntas = preguntas.map((pregunta, i) => {
      if (i === indexPregunta) {
        // Filtrar las respuestas para excluir la que se desea eliminar
        const nuevasRespuestas = pregunta.respuestas.filter((_, j) => j !== indexRespuesta)
        // Devolver la pregunta actualizada con las respuestas filtradas
        return { ...pregunta, respuestas: nuevasRespuestas }
      }
      return pregunta
    })
    // Actualizar el estado de preguntas
    setValue('preguntas', newPreguntas)
  }

  // Subir cuestionario
  const cuestionariosCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('cuestionariosCurso')
    const idCurso = course._id
    setCurrentId(idCurso)

    const estudiantes = await getStudentsCourse(idCurso)
    setStudentsCourse(estudiantes)
    setSearchStudents(true)

    const res = await getQuestionnairesCourse(idCurso)
    setQuestionnaireCourse(res)
    setTotalPages4(Math.ceil(res.length / itemsPerPage4))
    setCurrentPage4(1)
    setSearchQuestionnaire(true)
  }

  // Llamado de cuestionarios según questionnaireState
  const onForm2 = handleSubmit(async (values) => {
    if (questionnaireState) {
      onUpdateQuestionnaire(values)
    }
    else {
      onUploadQuestionnaire(values)
    }
  })

  // Formulario para subir cuestionarios
  const onUploadQuestionnaire = async (values) => {
    const formData = new FormData()
    // Añadir datos JSON al formData
    formData.append('data', JSON.stringify({
      nombre: values.nombre,
      descripcion: values.descripcion,
      calificacionMaxima: values.calificacionMaxima,
      fecha: convertToLocalDateTimeString(values.fecha),
      tiempoInicial: values.tiempoi,
      tiempoFinal: values.tiempof,
      preguntas: preguntas
    }))

    await questionnaireUpload(currentId, formData)

    // Se actualice al ejecutar una subida de cuestionarios
    const res = await getQuestionnairesCourse(currentId)
    setQuestionnaireCourse(res)
    setTotalPages4(Math.ceil(res.length / itemsPerPage4))
    setCurrentPage4(1)
    setSearchQuestionnaire(true)
  }

  // Mostrar el contenido para editar tarea 
  const mostrarEditarCuestionario = async (idCuestionario) => {
    setCurrentQuestionnaireId(idCuestionario)
    if (!questionnaireState) {
      const res = await getQuestionnaireForEdit(idCuestionario)
      setCurrentQuestionnaire(res)
    }
    // Cambia el estado después de la verificación
    showQuestionnaireSate()
    reset()
  }

  // Formulario para actualizar cuestionarios
  const onUpdateQuestionnaire = async (values) => {
    const formData = new FormData()
    // Añadir datos JSON al formData
    formData.append('data', JSON.stringify({
      nombre: values.nombre,
      descripcion: values.descripcion,
      calificacionMaxima: values.calificacionMaxima,
      fecha: convertToLocalDateTimeString(values.fecha),
      tiempoInicial: values.tiempoi,
      tiempoFinal: values.tiempof,
      preguntas: preguntas
    }))
    await questionnaireUpdate(currentQuestionnaireId, formData)

    // Se actualice al ejecutar una subida de cuestionarios
    const res = await getQuestionnairesCourse(currentId)
    setQuestionnaireCourse(res)
    setTotalPages4(Math.ceil(res.length / itemsPerPage4))
    setCurrentPage4(1)
    setSearchQuestionnaire(true)
  }

  // Eliminar cuestionario
  const eliminarCuestionario = async (idCuestionario) => {
    const res = await deleteQuestionnaire(idCuestionario)
    if (res.status === 204) {
      const updatedQuestionnaires = questionnaireCourse.filter(questionnaire => questionnaire._id !== idCuestionario)
      setQuestionnaireCourse(updatedQuestionnaires)
      // Ajustar la paginación
      const totalPages = Math.ceil(updatedQuestionnaires.length / itemsPerPage4)
      if (currentPage4 > totalPages) {
        setCurrentPage4(currentPage4 - 1) // Regresas a la primera página si la página actual ya no existe
        setTotalPages4(totalPages) // Actualizas el total de páginas
      } else {
        setTotalPages4(totalPages) // Actualizas el total de páginas
      }
    }
  }

  // Subir foros
  const forosCurso = async (course) => {
    setCurrentCourse(course)
    showCourse('forosCurso')
    const idCurso = course._id
    setCurrentId(idCurso)

    const estudiantes = await getStudentsCourse(idCurso)
    setStudentsCourse(estudiantes)
    setSearchStudents(true)

    const res = await getForumsCourse(idCurso)
    setForumCourse(res)
    setTotalPages5(Math.ceil(res.length / itemsPerPage5))
    setCurrentPage5(1)
    setSearchForum(true)
  }

  // Formulario que llama a otros formularios
  const onForm3 = handleSubmit(async (values) => {
    if (forumState) {
      onUpdateForum(values)
    }
    else {
      onUploadForum(values)
    }
  })

  // Formulario para subir foros
  const onUploadForum = async (values) => {
    const formData = new FormData()

    // Añadir datos JSON al formData
    formData.append('data', JSON.stringify({
      titulo: values.titulo,
      descripcion: values.descripcion
    }))
    await forumUpload(currentId, formData)

    // Se actualice al ejecutar una subida de foro
    const res = await getForumsCourse(currentId)
    setForumCourse(res)
    setTotalPages5(Math.ceil(res.length / itemsPerPage5))
    setCurrentPage5(1)
    setSearchForum(true)
  }

  // Mostrar el contenido para editar foro 
  const mostrarEditarForo = async (idForo) => {
    setCurrentForumId(idForo)
    if (!forumState) {
      const res = await getForumForEdit(idForo)
      setCurrentForum(res)
    }
    // Cambia el estado después de la verificación
    showForumState()
    reset()
  }

  // Formulario para actualizar foros
  const onUpdateForum = async (values) => {
    const formData = new FormData()
    // Añadir datos JSON al formData
    formData.append('data', JSON.stringify({
      titulo: values.titulo,
      descripcion: values.descripcion,
    }))
    await forumUpdate(currentForumId, formData)

    // Se actualice al ejecutar una subida de foro
    const res = await getForumsCourse(currentId)
    setForumCourse(res)
    setTotalPages5(Math.ceil(res.length / itemsPerPage5))
    setCurrentPage5(1)
    setSearchForum(true)
  }

  // Eliminar foro
  const eliminarForo = async (idForo) => {
    const res = await deleteForum(idForo)
    if (res.status === 204) {
      const updatedForums = forumCourse.filter(forum => forum._id !== idForo)
      setForumCourse(updatedForums)
      // Ajustar la paginación
      const totalPages = Math.ceil(updatedForums.length / itemsPerPage5)
      if (currentPage5 > totalPages) {
        setCurrentPage5(currentPage5 - 1) // Regresas a la primera página si la página actual ya no existe
        setTotalPages5(totalPages) // Actualizas el total de páginas
      } else {
        setTotalPages5(totalPages) // Actualizas el total de páginas
      }
    }
  }

  return (
    <div className='flex flex-col w-full h-max'>
      {showProfessorPage === 'profesorCurso' && (
        <div className='flex flex-col w-full'>
          {
            search === true && professorCourses.length === 0 && (
              <div className='flex place-self-center mt-20 w-[80%]'>
                <h1 className='font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que no estás matriculado como profesor a ningún curso. Ponte en contácto con tu respectiva escuela.</h1>
              </div>
            )}
          {
            professorCourses.length !== 0 && (
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
                            {course.descripcion.substring(0, 70)}{course.descripcion.length > 70 ? '...' : ''}
                          </td>
                          <td className='flex flex-row items-center justify-center p-4 gap-4'>
                            <div className='flex flex-col items-center justify-center gap-3'>
                              <button onClick={() => { tareasCurso(course) }} className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#94c192] hover:bg-[#79b372] focus:hover:bg-[#5cc24f] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" /></svg><p className='text-black font-normal group-focus:text-black'>Tareas</p></button>
                              <button onClick={() => { cuestionariosCurso(course) }} className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#c1ab92] hover:bg-[#b48c71] focus:hover:bg-[#c27d4f] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg><p className='text-black font-normal group-focus:text-black'>Cuestionarios</p></button>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-3'>
                              <button /* onClick={() => { matricularUsuarios(course) }} */ className='flex flex-row w-full items-center px-4 py-1 group cursor-pointer text-md bg-[#92acc1] hover:bg-[#71a7b4] focus:hover:bg-[#4796aa] focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg><p className='text-black font-normal group-focus:text-black'>Calificaciones</p></button>
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
      {showProfessorPage === 'tareasCurso' && (
        <div>
          {searchStudents === false && showProfessorPage === 'tareasCurso' && (
            <div className='flex w-full justify-center bg-slate-100'>
              <img className='w-[53%] opacity-80' src={SGAUIS9} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
            </div>
          )}
          {searchStudents && studentsCourse.length === 0 && showProfessorPage === 'tareasCurso' && (
            <div className='relative w-full'>
              <span><button className='mt-2 ml-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
              <h1 className='mt-4 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que no hay ningún estudiante matriculado en el curso {currentCourse.nombre}. Ponte en contácto con tu respectiva escuela.</h1>
            </div>
          )}
          {studentsCourse.length !== 0 && (
            <div className='flex flex-col items-center h-max'>
              <h1 className='pb-10 justify-self-start font-bold text-4xl coinstracking-widest text-neutral-600 text-center'>Curso {currentCourse.nombre}</h1>
              <div className='flex flex-row w-full space-x-10'>
                <div className='flex flex-col w-[30%] bg-white text-gray-200 shadow-2xl py-8 px-8 rounded-lg'>
                  <span><button className='flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-gray-500/10 active:bg-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
                  {showSuccessMessage && (
                    <div className='fixed z-10 inset-0 overflow-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                      <div className='flex items-end justify-center min-h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
                          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203</span>
                          <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                            <div className='bg-white sm:p-4 sm:pb-4'>
                              <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                                  {homeworkState ? `Tarea ${homeworkData.nombre} ha sido actualizada en curso ${currentCourse.nombre} de manera satisfactoria.` : `Tarea ${homeworkData.nombre} ha sido añadida al curso ${currentCourse.nombre} de manera satisfactoria.`}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <h1 className='font-bold text-xl coinstracking-widest text-neutral-700 text-center'> {homeworkState ? 'Actualizar tarea' : 'Agregar tarea'} </h1>
                  <form onSubmit={onForm} encType='multipart/form-data'>
                    <div className='mb-2 relative'>
                      <label htmlFor='nombre' className='block text-sm font-medium text-gray-700 mb-2'>Nombre de la tarea</label>
                      <input type='text' {...register('nombre', { required: true })} id='nombre' className='shadow-sm rounded-md w-full px-3 py-3 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el nombre de la tarea' />
                      {errors.nombre && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                    </div>
                    <div className='mb-2 relative'>
                      <label htmlFor='calificacionMaxima' className='block text-sm font-medium text-gray-700 mb-2'>Calificación máxima</label>
                      <input type="string" {...register('calificacionMaxima', { required: true, valueAsNumber: true })} id='calificacionMaxima' className='shadow-sm rounded-md w-full px-3 py-3 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese la calificación máxima de la tarea' />
                      {errors.calificacionMaxima && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                    </div>
                    <div className='mb-2 relative'>
                      <label htmlFor='descripcion' className='flex text-sm font-medium text-gray-700 mb-2'>Descripción</label>
                      <textarea value={descripcion} rows='3' {...register('descripcion', { required: true })} id='descripcion' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2 resize-none text-justify' placeholder='Ingrese la descripción de la tarea' />
                      <span className={`absolute bottom-2 right-2 text-sm font-medium ${descripcionLength === maxCharacters ? 'text-red-800/80' : 'text-emerald-800/80'}`}>{descripcionLength}<span className='text-sky-700'>/{maxCharacters}</span></span>
                      {errors.descripcion && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
                    </div>
                    <div className='mb-2'>
                      <label htmlFor='fecha' className='block text-sm font-medium text-gray-700 mb-2'>Fecha límite de entrega</label>
                      <input type='datetime-local' {...register('fecha', { required: true, valueAsDate: true })} id='fecha' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' />
                      {errors.fecha && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                    </div>
                    <div className='mb-4'>
                      <label htmlFor='pdf' className='block text-sm font-medium text-gray-700 mb-2'> {selectedFile ? (<span>Archivo seleccionado: {selectedFile.name}</span>) : (<span>Anexar indicaciones adicionales</span>)} </label>
                      <div className="mt-1 relative">
                        <input {...register('pdf', { required: true })} id="upload-pdf" type="file" accept=".pdf" onChange={handleFileChange} className="sr-only" />
                        <label htmlFor="upload-pdf" className="cursor-pointer bg-white rounded-md font-medium text-blue-800/80 hover:text-purple-800/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> {selectedFile ? 'Cambiar archivo PDF' : 'Subir archivo PDF'} </label>
                      </div>
                      {errors.pdf && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
                    </div>
                    <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'> {homeworkState ? 'Actualizar tarea' : 'Subir tarea'} </button>
                  </form>
                  {professorErrors.map((error, i) => (
                      <div className='bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
                        {error}
                      </div>
                    ))}
                </div>
                <div className='flex items-center justify-center w-[70%]'>
                  {searchHomework === false && (
                    <div className='flex items-center justify-center w-[80%] bg-slate-100'>
                      <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Cargando tareas asignadas...</h1>
                    </div>
                  )}
                  {searchHomework && homeworkCourse.length === 0 && (
                      <div className='relative w-[75%] '>
                        <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que aún no hay tareas asignadas en el curso {currentCourse.nombre}.</h1>
                      </div>
                    )}
                  {homeworkCourse.length !== 0 && (
                      <div className='w-full'>
                        <div className='flex flex-col overflow-x-auto shadow-gray-500 shadow-2xl rounded-xl bg-slate-100'>
                          <div className='flex-shrink-0 bg-slate-100'>
                            <h1 className='block pl-4 bg-gradient-to-bl from-gray-400 to-slate-950 bg-clip-text font-sans text-2xl font-semibold leading-relaxed text-transparent antialiased text-center'>Tareas asignadas</h1>
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
                                {currentHomeworks.map((homework, index3) => (
                                  <tr key={index3} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                                    <th scope='row' className='px-6 py-1 font-medium '>
                                      {homework.nombre}
                                    </th>
                                    <td className='px-6 py-3'>
                                      {homework.descripcion}
                                    </td>
                                    <td className='px-6 py-3'>
                                      {homework.fechaEntrega}
                                    </td>
                                    <td className='px-2 py-3'>
                                      {homework.calificacionMaxima}
                                    </td>
                                    <td className='px-6 py-3'>
                                      <button className='flex flex-row gap-3 underline-offset-4 items-center justify-center hover:text-blue-700' onClick={() => descargarPDF(homework.pdfFile.pdfURL, homework.pdfFile.nombre)}>{homework.pdfFile.nombre}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg></button>
                                    </td>
                                    <td className='px-6 py-3'>
                                      <div className='flex flex-row items-center justify-center gap-3'>
                                        <button onClick={() => { mostrarEditarTarea(homework._id) }} className='flex flex-row w-full items-center px-4 group cursor-pointer text-md bg-[#92A8C1] hover:bg-blue-300 focus:bg-blue-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125' /></svg><p className='text-black font-normal group-focus:text-black'>{homeworkState ? 'No editar' : 'Editar tarea'}</p></button>
                                        <button onClick={() => { eliminarTarea(homework._id) }} className='flex flex-row w-full items-center px-4 group cursor-pointer text-md bg-[#c19492] hover:bg-red-300 focus:bg-red-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5' /></svg><p className='text-black font-normal group-focus:text-black'>Eliminar tarea</p></button>
                                      </div>
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
                                  <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage3 === 1 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate3(currentPage3 - 1)} disabled={currentPage3 === 1}>
                                    Anterior
                                  </button>
                                </li>
                                {Array.from({ length: totalPages3 }, (_, i) => i + 1).map((number3) => (
                                  <li key={number3}>
                                    <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage3 === number3 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate3(number3)}>
                                      {number3}
                                    </button>
                                  </li>
                                ))}
                                <li>
                                  <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage3 === totalPages3 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate3(currentPage3 + 1)} disabled={currentPage3 === totalPages3}>
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
              </div>
            </div>
          )}
        </div>
      )}
      {showProfessorPage === 'cuestionariosCurso' && (
        <div>
          {searchStudents === false && showProfessorPage === 'cuestionariosCurso' && (
            <div className='flex w-full justify-center bg-slate-100'>
              <img className='w-[53%] opacity-80' src={SGAUIS10} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
            </div>
          )}
          {searchStudents && studentsCourse.length === 0 && showProfessorPage === 'cuestionariosCurso' && (
            <div className='relative w-full'>
              <span><button className='mt-2 ml-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
              <h1 className='mt-4 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que no hay ningún estudiante matriculado en el curso {currentCourse.nombre}. Ponte en contácto con tu respectiva escuela.</h1>
            </div>
          )}
          {studentsCourse.length !== 0 && (
            <div className='flex flex-col items-center w-full h-max'>
              <h1 className='pb-10 justify-self-start font-bold text-4xl coinstracking-widest text-neutral-600 text-center'>Curso {currentCourse.nombre}</h1>
              <div className='flex flex-col w-full -m-14'>
                <div className='flex flex-row w-full p-14 overflow-clip space-x-10'>
                  <div className='flex flex-col w-[45%] bg-white text-gray-200 shadow-2xl p-8 rounded-lg overflow-y-auto max-h-[calc(70vh)]'>
                    <span><button className='flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-gray-500/10 active:bg-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
                    {showSuccessMessage && (
                      <div className='fixed z-10 inset-0 overflow-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                        <div className='flex items-end justify-center min-h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                          <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
                            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203</span>
                            <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                              <div className='bg-white sm:p-4 sm:pb-4'>
                                <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                                  <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                                    {questionnaireState ? `Cuestionario ${questionnaireData.nombre} ha sido actualizado en curso ${currentCourse.nombre} de manera satisfactoria.` : `Cuestionario ${questionnaireData.nombre} ha sido añadido al curso ${currentCourse.nombre} de manera satisfactoria.`}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <h1 className='font-bold text-xl coinstracking-widest text-neutral-700 text-center'> {questionnaireState ? 'Actualizar cuestionario' : 'Crear cuestionario'} </h1>
                    <form onSubmit={onForm2} encType='multipart/form-data'>
                      <div className='mb-2 relative'>
                        <label htmlFor='nombre' className='block text-sm font-medium text-gray-700 mb-2'>Nombre del cuestionario</label>
                        <input type='text' {...register('nombre', { required: true })} id='nombre' className='shadow-sm rounded-md w-full px-3 py-3 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el nombre del cuestionario' />
                        {errors.nombre && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                      </div>
                      <div className='mb-2 relative'>
                        <label htmlFor='calificacionMaxima' className='block text-sm font-medium text-gray-700 mb-2'>Calificación máxima</label>
                        <input type="string" {...register('calificacionMaxima', { required: true, valueAsNumber: true })} id='calificacionMaxima' className='shadow-sm rounded-md w-full px-3 py-3 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese la calificación máxima del cuesitonario' />
                        {errors.calificacionMaxima && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                      </div>
                      <div className='mb-2 relative'>
                        <label htmlFor='descripcion' className='flex text-sm font-medium text-gray-700 mb-2'>Descripción</label>
                        <textarea value={descripcion} rows='3' {...register('descripcion', { required: true })} id='descripcion' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2 resize-none text-justify' placeholder='Ingrese la descripción del cuestionario' />
                        <span className={`absolute bottom-2 right-2 text-sm font-medium ${descripcionLength === maxCharacters ? 'text-red-800/80' : 'text-emerald-800/80'}`}>{descripcionLength}<span className='text-sky-700'>/{maxCharacters}</span></span>
                        {errors.descripcion && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
                      </div>
                      <div className='mb-2 relative'>
                        <label htmlFor='fecha' className='block text-sm font-medium text-gray-700 mb-2'>Fecha de realización de cuestionario</label>
                        <input type='date' {...register('fecha', { required: true, valueAsDate: true })} id='fecha' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' />
                        {errors.fecha && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                      </div>
                      <div className='mb-2 flex flex-row w-full space-x-5'>
                        <div className='flex flex-col w-[50%] pt-2'>
                          <label htmlFor='tiempoi' className='block text-sm font-medium text-gray-700 mb-2'>Tiempo inicial</label>
                          <input type='time' {...register('tiempoi', { required: true })} id='tiempoi' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' />
                          {errors.tiempoi && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                        </div>
                        <div className='flex flex-col w-[50%] pt-2'>
                          <label htmlFor='tiempof' className='block text-sm font-medium text-gray-700 mb-2'>Tiempo final</label>
                          <input type='time' {...register('tiempof', { required: true })} id='tiempof' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' />
                          {errors.tiempof && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                        </div>
                      </div>
                      <div className='mb-4'>
                        <span className='block text-md font-medium text-gray-700 mb-2'>Preguntas</span>
                        {preguntas.map((pregunta, indexPregunta) => (
                          <div key={indexPregunta} className='my-4 border border-gray-300 rounded-xl p-4 flex flex-col w-full'>
                            <span className='text-sm font-medium text-amber-800 mb-2'>Pregunta {indexPregunta + 1}</span>
                            <div className='flex flex-row w-full'>
                              <input
                                type='text'
                                onChange={(e) => handleInputChange(indexPregunta, 'pregunta', e.target.value)}
                                className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2'
                                placeholder={`Pregunta ${indexPregunta + 1}`}
                                {...register(`preguntas[${indexPregunta}].pregunta`, { required: true })}
                              />
                              <button type='button' onClick={() => eliminarPregunta(indexPregunta)} className='text-red-600 hover:underline ml-2'>Eliminar</button>
                            </div>
                            {errors.preguntas && errors.preguntas[indexPregunta] && errors.preguntas[indexPregunta].pregunta && (
                              <p className='text-rose-400 mt-1'>Por favor, completa este campo</p>
                            )}
                            <div className='mt-2'>
                              {pregunta.respuestas.map((_, indexRespuesta) => (
                                <div key={indexRespuesta} className='flex flex-col w-full mt-2'>
                                  <div className='flex flex-row'>
                                    <input
                                      type='text'
                                      onChange={(e) => handleRespuestaChange(indexPregunta, indexRespuesta, 'respuesta', e.target.value)}
                                      className='shadow-sm rounded-md w-[80%] px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2'
                                      placeholder={`Respuesta ${indexRespuesta + 1}`}
                                      {...register(`preguntas[${indexPregunta}].respuestas[${indexRespuesta}].respuesta`, { required: true })}
                                    />
                                    <div className='mx-4 flex items-center'>
                                      <input
                                        type='checkbox'
                                        id={`esCorrecta-${indexPregunta}-${indexRespuesta}`}
                                        onChange={(e) => handleRespuestaChange(indexPregunta, indexRespuesta, 'esCorrecta', e.target.value)}
                                        {...register(`preguntas[${indexPregunta}].respuestas[${indexRespuesta}].esCorrecta`)}
                                        className='peer hidden'
                                      /><p className='text-sm font-medium text-gray-800 mx-2'>Marcar como correcta</p>
                                      <label htmlFor={`esCorrecta-${indexPregunta}-${indexRespuesta}`} className='select-none cursor-pointer rounded-[0.45rem] text-sky-800/60 bg-sky-100 transition-colors duration-200 ease-in-out peer-checked:text-sky-100 peer-checked:bg-sky-800/60'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                      </label>
                                    </div>
                                    <button type='button' onClick={() => eliminarRespuesta(indexPregunta, indexRespuesta)} className='text-red-700 hover:underline'>Eliminar</button>
                                  </div>
                                  {errors.preguntas && errors.preguntas[indexPregunta] && errors.preguntas[indexPregunta].respuestas && errors.preguntas[indexPregunta].respuestas[indexRespuesta] && errors.preguntas[indexPregunta].respuestas[indexRespuesta].respuesta && (
                                    <p className='text-rose-400 mt-1'>Por favor, completa este campo</p>
                                  )}
                                </div>
                              ))}
                              {pregunta.respuestas.length < 5 && (
                                <button type='button' onClick={() => añadirRespuesta(indexPregunta)} className='text-gray-800 hover:underline mt-2'>Añadir respuesta</button>
                              )}
                            </div>
                          </div>
                        ))}
                        <button type='button' onClick={añadirPregunta} className='text-gray-800 hover:underline underline-offset-4 hover:text-blue-500 active:transform active:scale-110'>Añadir pregunta</button>
                      </div>
                      <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>
                        {questionnaireState ? 'Actualizar cuestionario' : 'Subir cuestionario'}
                      </button>
                    </form>
                    {professorErrors.map((error, i) => (
                      <div className='bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
                        {error}
                      </div>
                    ))}
                  </div>
                  <div className='flex items-center justify-center w-[55%]'>
                    {searchQuestionnaire === false && (
                      <div className='flex items-center justify-center w-[80%] bg-slate-100'>
                        <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Cargando cuestionarios asignados...</h1>
                      </div>
                    )}
                    {searchQuestionnaire && questionnaireCourse.length === 0 && (
                      <div className='relative w-full '>
                        <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que aún no hay cuestionarios asignados en el curso {currentCourse.nombre}.</h1>
                      </div>
                    )}
                    {questionnaireCourse.length !== 0 && (
                      <div className='w-full'>
                        <div className='flex flex-col shadow-gray-500 shadow-2xl rounded-xl bg-slate-100'>
                          <div className='flex-shrink-0 bg-slate-100 rounded-xl'>
                            <h1 className='pl-4 bg-gradient-to-bl from-gray-400 to-slate-950 bg-clip-text font-sans text-2xl font-semibold leading-relaxed text-transparent antialiased text-center'>Cuestionarios asignados</h1>
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
                                    Fecha asignada
                                  </th>
                                  <th scope='col' className='px-6 py-3'>
                                    Tiempo inicial
                                  </th>
                                  <th scope='col' className='px-6 py-3'>
                                    Tiempo final
                                  </th>
                                  <th scope='col' className='px-2 py-3'>
                                    Calificación Máxima
                                  </th>
                                  <th scope='col' className='px-6 py-3'>
                                    Acciones
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentQuestionnaires.map((questionnaire, index4) => (
                                  <tr key={index4} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                                    <th scope='row' className='px-6 py-1 font-medium '>
                                      {questionnaire.nombre}
                                    </th>
                                    <td className='px-6 py-3'>
                                      {questionnaire.descripcion}
                                    </td>
                                    <td className='px-6 py-3'>
                                      {questionnaire.fecha}
                                    </td>
                                    <td className='px-6 py-3'>
                                      {questionnaire.tiempoInicial}
                                    </td>
                                    <td className='px-6 py-3'>
                                      {questionnaire.tiempoFinal}
                                    </td>
                                    <td className='px-2 py-3'>
                                      {questionnaire.calificacionMaxima}
                                    </td>
                                    {/* Lógica para manejar el entregado: <td className='px-6 py-3 text-ellipsis overflow-hidden ...'>
                                {homework.entregado ? <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                </div> : <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                </div>}
                              </td> */}
                                    <td className='px-6 py-3'>
                                      <div className='flex flex-row items-center justify-center gap-3'>
                                        <button onClick={() => { mostrarEditarCuestionario(questionnaire._id) }} className='flex flex-row w-full items-center px-4 group cursor-pointer text-md bg-[#92A8C1] hover:bg-blue-300 focus:bg-blue-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125' /></svg><p className='text-black font-normal group-focus:text-black'>{questionnaireState ? 'No editar' : 'Editar cuestionario'}</p></button>
                                        <button onClick={() => { eliminarCuestionario(questionnaire._id) }} className='flex flex-row w-full items-center px-4 group cursor-pointer text-md bg-[#c19492] hover:bg-red-300 focus:bg-red-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-1'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5' /></svg><p className='text-black font-normal group-focus:text-black'>Eliminar cuestionario</p></button>
                                      </div>
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {showProfessorPage === 'forosCurso' && (
        <div>
          {searchStudents === false && showProfessorPage === 'forosCurso' && (
            <div className='flex w-full justify-center bg-slate-100'>
              <img className='w-[53%] opacity-80' src={SGAUIS11} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
            </div>
          )}
          {searchStudents && studentsCourse.length === 0 && showProfessorPage === 'forosCurso' && (
            <div className='relative w-full'>
              <span><button className='mt-2 ml-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
              <h1 className='mt-4 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que no hay ningún estudiante matriculado en el curso {currentCourse.nombre}. Ponte en contácto con tu respectiva escuela.</h1>
            </div>
          )}
          {studentsCourse.length !== 0 && (
            <div className='flex flex-col items-center h-max'>
              <h1 className='pb-10 justify-self-start font-bold text-4xl coinstracking-widest text-neutral-600 text-center'>Curso {currentCourse.nombre}</h1>
              <div className='flex flex-col items-center w-full'>
                <div className='flex flex-col w-[80%] bg-white text-gray-200 shadow-2xl py-8 px-8 rounded-lg'>
                  <span><button className='flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-gray-500/10 active:bg-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
                  {showSuccessMessage && (
                    <div className='fixed z-10 inset-0 overflow-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                      <div className='flex items-end justify-center min-h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
                          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203</span>
                          <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                            <div className='bg-white sm:p-4 sm:pb-4'>
                              <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                                  {forumState ? `Foro ${forumData.titulo} ha sido actualizado en curso ${currentCourse.nombre} de manera satisfactoria.` : `Foro ${forumData.nombre} ha sido añadido al curso ${currentCourse.nombre} de manera satisfactoria.`}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <h1 className='font-bold text-xl coinstracking-widest text-neutral-700 text-center'> {forumState ? 'Actualizar foro de discusión' : 'Crear foro de discusión'} </h1>
                  <form onSubmit={onForm3} encType='multipart/form-data'>
                    <div className='mb-2 relative'>
                      <label htmlFor='titulo' className='block text-sm font-medium text-gray-700 mb-2'>Título del foro</label>
                      <input type='text' {...register('titulo', { required: true })} id='titulo' className='shadow-sm rounded-md w-full px-3 py-3 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el título del foro' />
                      {errors.nombre && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                    </div>
                    <div className='mb-4 relative'>
                      <label htmlFor='descripcion' className='flex text-sm font-medium text-gray-700 mb-2'>Descripción</label>
                      <textarea value={descripcion} rows='3' {...register('descripcion', { required: true })} id='descripcion' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2 resize-none text-justify' placeholder='Ingrese la descripción del foro. (Recomendación: Plantee la discusión en este espacio).' />
                      <span className={`absolute bottom-2 right-2 text-sm font-medium ${descripcionLength === maxCharacters ? 'text-red-800/80' : 'text-emerald-800/80'}`}>{descripcionLength}<span className='text-sky-700'>/{maxCharacters}</span></span>
                      {errors.descripcion && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
                    </div>
                    <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'> {forumState ? 'Actualizar foro' : 'Crear foro'} </button>
                  </form>
                  {
                    professorErrors.map((error, i) => (
                      <div className='bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
                        {error}
                      </div>
                    ))}
                </div>
                <div className='flex items-center justify-center w-full my-16'>
                  {searchForum === false && (
                    <div className='flex items-center justify-center w-full bg-slate-100'>
                      <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Cargando foros asignados...</h1>
                    </div>
                  )}
                  {
                    searchForum && forumCourse.length === 0 && (
                      <div className='relative w-full '>
                        <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que aún no hay foros asignados en el curso {currentCourse.nombre}.</h1>
                      </div>
                    )}
                  {
                    forumCourse.length !== 0 && (
                      <div className='w-full'>
                        <div className='flex flex-col overflow-x-auto shadow-gray-500 shadow-2xl rounded-xl bg-slate-100'>
                          <div className='flex-shrink-0 bg-slate-100'>
                            <h1 className='block pl-4 bg-gradient-to-bl from-gray-400 to-slate-950 bg-clip-text font-sans text-2xl font-semibold leading-relaxed text-transparent antialiased text-center'>Foros de discusión</h1>
                          </div>
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
                                    <th scope='row' className='px-6 py-1 font-medium '>
                                      {forum.titulo}
                                    </th>
                                    <td className='px-6 py-3'>
                                      {forum.descripcion.substring(0, 50)}{forum.descripcion.length > 50 ? '...' : ''}
                                    </td>
                                    <td className='px-6 py-3'>
                                      <div className='flex flex-col gap-2'>
                                        <button onClick={() => { mostrarEditarForo(forum._id) }} className='flex flex-row w-[50%] items-center justify-center py-2 group cursor-pointer text-md bg-[#92A8C1] hover:bg-blue-300 focus:bg-blue-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-4'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125' /></svg><p className='text-black font-normal group-focus:text-black'>{forumState ? 'No editar' : 'Editar foro'}</p></button>
                                        <button onClick={() => { eliminarForo(forum._id) }} className='flex flex-row w-[50%] items-center justify-center py-2 group cursor-pointer text-md bg-[#c19492] hover:bg-red-300 focus:bg-red-400 focus:text-white rounded-2xl border-2 border-[#2D2D2D] gap-4'><svg xmlns='http://www.w3.org/2000/svg' fill='#FFF' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='text-[#2D2D2D] w-6 h-6 group-focus:text-[#2D2D2D] group-focus:fill-white'><path strokeLinecap='round' strokeLinejoin='round' d='m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5' /></svg><p className='text-black font-normal group-focus:text-black'>Eliminar foro</p></button>
                                      </div>
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
                                  <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage5 === 1 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate5(currentPage5 - 1)} disabled={currentPage5 === 1}>
                                    Anterior
                                  </button>
                                </li>
                                {Array.from({ length: totalPages5 }, (_, i) => i + 1).map((number5) => (
                                  <li key={number5}>
                                    <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage5 === number5 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate5(number5)}>
                                      {number5}
                                    </button>
                                  </li>
                                ))}
                                <li>
                                  <button className={`hover:bg-[#A1AFBA] hover:text-white py-2 px-3.5 text-sm text-black font-medium rounded-full border-2 border-[#2D2D2D] ${currentPage5 === totalPages5 ? 'bg-[#A1AFBA] text-white' : ''}`} onClick={() => paginate5(currentPage5 + 1)} disabled={currentPage5 === totalPages5}>
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
              </div>
            </div>
          )}
        </div>
      )}
      {showProfessorPage === 'contenidoCurso' && (
        <div>
          {searchStudents === false && showProfessorPage === 'contenidoCurso' && (
            <div className='flex w-full justify-center bg-slate-100'>
              <img className='w-[53%] opacity-80' src={SGAUIS6} alt='SGA UIS: Sistema de Gestión de Aprendizaje Universidad Industrial de Santander.' />
            </div>
          )}
          {searchStudents && studentsCourse.length === 0 && showProfessorPage === 'contenidoCurso' && (
            <div className='flex flex-col w-full h-screen'>
              <span className='place-self-start'><button className='mt-2 ml-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
              <h1 className='mt-4 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que no hay ningún estudiante matriculado en el curso {currentCourse.nombre}. Ponte en contácto con tu respectiva escuela.</h1>
            </div>
          )}
          {studentsCourse.length !== 0 && (
            <div className='flex flex-row w-full'>
              <div className='w-[50%]'>
                <h1 className='my-6 font-bold text-4xl coinstracking-widest text-neutral-600 text-center'>Curso {currentCourse.nombre}</h1>
                <div className='flex flex-col overflow-x-auto shadow-gray-500 shadow-2xl rounded-xl bg-slate-100'>
                  <div>
                    <span><button className='mt-2 ml-2 flex flex-row select-none items-center gap-3 rounded-lg py-2 px-4 text-center align-middle font-sans text-md font-extrabold text-gray-800 transition-all hover:bg-slate-500/20 active:bg-slate-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => { volver() }}><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' /></svg>Volver</button></span>
                    <h1 className='block pl-4 bg-gradient-to-bl from-gray-400 to-slate-950 bg-clip-text font-sans text-2xl font-semibold leading-relaxed text-transparent antialiased text-center'>Estudiantes matriculados</h1>
                  </div>
                  <table className='w-full text-sm text-left rtl:text-right text-neutral-800'>
                    <thead className='text-xs text-gray-800 uppercase bg-sky-950/25'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          Número
                        </th>
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
                          <th scope='row' className='px-6 py-1 font-normal'>
                            {indexOfFirstItem + index + 1}
                          </th>
                          <td className='px-6 py-6 font-medium'>
                            {student.codigo}
                          </td>
                          <td className='px-6 py-6'>
                            {student.nombre}
                          </td>
                          <td className='px-6 py-6'>
                            {student.correo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='flex items-center justify-center my-4'>
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
              <div className='w-[55%] flex flex-col items-center justify-center gap-5'>
                <button onClick={() => { showUpload('subirContenido') }} className='w-[50%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>{showUploadContent ? 'Cancelar' : 'Subir contenido'}</button>
                {showUploadContent && showContentUpload === 'subirContenido' && (
                  <div className='bg-white text-gray-200 shadow-2xl flex flex-col py-8 px-8 rounded-lg w-[60%]'>
                    {showSuccessMessage && (
                      <div className='fixed z-10 inset-0 overflow-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                        <div className='flex items-end justify-center min-h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                          <div className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' aria-hidden='true'>
                            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203</span>
                            <div className='inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                              <div className='bg-white sm:p-4 sm:pb-4'>
                                <div className='sm:mt-0 sm:ml-0 sm:text-center'>
                                  <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                                    Tema {contentData.nombre} ha sido añadido al curso {currentCourse.nombre} de manera satisfactoria.
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <h1 className='font-bold text-xl coinstracking-widest text-neutral-700 text-center'>Gestión de contenido</h1>
                    <form onSubmit={onContent} encType='multipart/form-data'>
                      <div className='mb-2'>
                        <label htmlFor='nombre' className='block text-sm font-medium text-gray-700 mb-2'>Nombre del tema</label>
                        <input type='text' {...register('nombre', { required: true })} id='nombre' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2' placeholder='Ingrese el nombre del tema que va a subir' />
                        {errors.nombre && (<p className='text-rose-400'>Por favor, completa este campo</p>)}
                      </div>
                      <div className='mb-2 relative'>
                        <label htmlFor='descripcion' className='flex text-sm font-medium text-gray-700 mb-2'>Descripción</label>
                        <textarea value={descripcion} rows='3' {...register('descripcion', { required: true })} id='descripcion' className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-sky-600 focus:border-2 resize-none text-justify' placeholder='Ingrese la descripción de la tarea que va a subir' />
                        <span className={`absolute bottom-2 right-2 text-sm font-medium ${descripcionLength === maxCharacters ? 'text-red-800/80' : 'text-sky-800/80'}`}>{descripcionLength}<span className='text-sky-700'>/{maxCharacters}</span></span>
                        {errors.descripcion && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
                      </div>
                      <div className='mb-6'>
                        <label htmlFor='pdf' className='block text-sm font-medium text-gray-700 mb-2'>
                          {selectedFile ? (
                            <span>Archivo seleccionado: {selectedFile.name}</span>
                          ) : (
                            <span>Cargar contenido PDF</span>
                          )}
                        </label>
                        <div className="mt-1 relative">
                          <input
                            {...register('pdf', { required: true })}
                            id="upload-pdf"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                          <label
                            htmlFor="upload-pdf"
                            className="cursor-pointer bg-white rounded-md font-medium text-blue-800/80 hover:text-purple-800/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            {selectedFile ? 'Cambiar archivo PDF' : 'Subir archivo PDF'}
                          </label>
                        </div>
                        {errors.pdf && (<p className='text-rose-400'>Por favor, completa este campo.</p>)}
                      </div>
                      <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>Subir contenido</button>
                    </form>
                    {contentErrors.map((error, i) => (
                        <div className='bg-indigo-100 p-2 text-stone-900 mt-4 rounded-lg text-justify' key={i}>
                          {error}
                        </div>
                      ))}
                  </div>
                )}
                <button onClick={() => { showContent('verContenido') }} className='w-[50%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A8595] hover:bg-[#2B4C5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273F4B]'>{showDisplayContent ? 'Ocultar contenido de la asignatura' : 'Ver contenido de la asignatura'}</button>
                {showDisplayContent && showContentView === 'verContenido' && (
                  <div className='flex items-center justify-center w-full'>
                    {searchContent === false && (
                      <div className='flex items-center justify-center w-[80%] bg-slate-100'>
                        <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Cargando contenido del curso...</h1>
                      </div>
                    )}
                    {
                      searchContent && contentCourse.length === 0 && (
                        <div className='relative w-[80%] '>
                          <h1 className='mt-2 px-10 font-bold text-4xl coinstracking-widest text-[#231F20] text-opacity-35 text-center'>Ups, parece que aún no hay contenido en el curso {currentCourse.nombre}.</h1>
                        </div>
                      )}
                    {
                      contentCourse.length !== 0 && (
                        <div className='w-[70%]'>
                          <div className='flex flex-col shadow-gray-500 shadow-2xl rounded-xl bg-slate-100'>
                            <div className='flex-shrink-0 bg-slate-100'>
                              <h1 className='block pl-4 bg-gradient-to-bl from-gray-400 to-slate-950 bg-clip-text font-sans text-2xl font-semibold leading-relaxed text-transparent antialiased text-center'>Contenido del curso</h1>
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
                                  {currentContent.map((content, index2) => (
                                    <tr key={index2} className='bg-zinc-200 border border-transparent hover:bg-zinc-300'>
                                      <th scope='row' className='px-6 py-3 font-medium '>
                                        {content.nombre}
                                      </th>
                                      <td className='px-6 py-3'>
                                        {content.descripcion}
                                      </td>
                                      <td className='px-6 py-3'>
                                        <button className='flex flex-row gap-3 underline-offset-4 items-center justify-center hover:text-blue-700' onClick={() => descargarPDF(content.pdfFile.pdfURL, content.pdfFile.nombre)}>{content.pdfFile.nombre}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg></button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className='flex items-center justify-center w-full my-2 overflow-x-hidden'>
                              <nav className='overflow-x-auto py-2'>
                                <ul className='flex list-none flex-row space-x-4 items-center'>
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
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div >
  )
}
export default CoursesProfessor