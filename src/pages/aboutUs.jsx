import React from 'react'

const RectangleCard = () => {
    return(
        <div>
            <img className='w-80' src="/assets/images/hd-tranparent-bg.png" alt="" />
            <h1 className='text-center text-2xl'>Heroic Developers</h1>
        </div>
    );
}

const AboutUs = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <h1 className='text-3xl'>We are the Heroic Developers</h1>
        <RectangleCard/>
    </div>
  )
}

export default AboutUs