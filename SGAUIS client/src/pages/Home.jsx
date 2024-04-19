import video from '../resources/SGA UIS.mp4'

function Home () {
  return (
    <div>
      <div className='h-[calc(100vh-11vh)] flex items-center justify-center w-full bg-white'>
        <video className='object-contain w-2/3 h-2/3' autoPlay loop muted>
          <source src={video} type='video/mp4' />
          Tu navegador no soporta este video.
        </video>
      </div>
    </div>
  )
}

export default Home
