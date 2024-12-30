import React from 'react'

const Hero = () => {
  return (
    <>
      <div className='w-full absolute top-0 right-0 h-screen bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900'></div>
      <div className='w-full h-screen -mt-9 flex flex-col justify-center items-center gap-6 bg-transparent text-white z-10'>
        <div className='text-center transition-transform duration-300 hover:-translate-y-3 '>
          <div class="flex items-center justify-center">
            <h2 className='relative group text-4xl md:text-6xl font-semibold pb-4'>
              Be The Chosen One
              <span className="absolute left-1/2 bottom-[10px] h-[0.5px] bg-white transform w-0 animate-underline"></span>
            </h2>
          </div>
          <div class="flex items-center justify-center">
            <h1 className='relative group text-4xl md:text-6xl font-bold'>
              Be a Volunteer
              <span className="absolute left-1/2 bottom-0 h-[0.5px] bg-white transform w-0 animate-underline"></span>
             </h1>
          </div>
        </div>
        <div>
          <button className='hover:underline underline-offset-2 p-2 transition-transform duration-100 hover:scale-105'>SignIn/SignUp</button>
        </div>
      </div>
    </>
  )
}

export default Hero