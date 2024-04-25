import { useAuth } from '../context/Auth.context'
import ESCUELA from '../resources/school-college-svgrepo-com.svg'

function Info () {
  const { user } = useAuth()
  return (
    <div className='flex flex-row items-center justify-center place-self-center h-[40%] w-[60%] rounded-xl bg-slate-200 text-gray-700 shadow-xl shadow-stone-600'>
      <svg className='place-self-center w-[45%] h-full bg-stone-100 rounded-xl shadow-2xl shadow-stone-600 p-2'>
        <use xlinkHref={ESCUELA + '#Layer_1'} />
      </svg>
      <div className='pt-6 text-center w-[55%]'>
        <h4 className='mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased'>
          Código: {user.codigo}
        </h4>
        <p className='block bg-gradient-to-tr from-stone-600 to-stone-400 bg-clip-text font-sans text-5xl font-medium leading-relaxed text-transparent antialiased'>
          {user.nombre}
        </p>
        <div className='w-full mt-10 px-4 mx-auto text-center'>
          <p className='block bg-gradient-to-tr from-neutral-800 to-blue-400 bg-clip-text font-sans text-lg font-semibold leading-relaxed text-transparent antialiased'>
            Correo electrónico: {user.correo}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Info
