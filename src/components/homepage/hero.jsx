import React from 'react'

const Hero = () => {
  return (
    <>
      <div className='w-full absolute top-0 right-0 h-screen bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900'></div>
      <div className='w-full h-screen -mt-9 flex flex-col justify-center items-center gap-6 bg-transparent text-white z-10'>
        <div className='text-center transition-transform duration-300 hover:-translate-y-3 '>
          <h2 className='text-6xl font-semibold pb-4'>Be The Chosen One</h2>
          <h1 className='text-6xl font-bold'>Be a Volunteer</h1>
        </div>
        <div>
          <button className='hover:underline underline-offset-2 p-2 transition-transform duration-100 hover:scale-105'>SignIn/SignUp</button>
        </div>
      </div>
    </>
  )
}

export default Hero