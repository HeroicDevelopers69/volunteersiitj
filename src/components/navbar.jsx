import React from 'react';
import ShowMenu from './buttons/menu';

const Navbar = () => {
  return (
    <div className='flex items-center tracking-tight font-roboto justify-between relative bg-transparent text-white m-0 z-20'>
      <div className="start flex cursor-pointer">
        <img src='/assets/images/logo.svg' alt="Logo" className='h-[30px]' />
        <div className="name ml-[10px] text-[24px] hover:underline">Volunteers</div>
      </div>
      <div className="buttons items-center md:flex h-[20px] hidden">
        <button className='bg-transparent mx-1 px-2 py-1 text-lg rounded  hover:scale-105 border hover:border-white transition-transform' id='form'>Forms</button>
        <button className='bg-transparent mx-1 px-2 py-1 text-lg rounded  hover:scale-105 border hover:border-white transition-transform'>Dashboard</button>
        <button className='bg-transparent mx-1 px-2 py-1 text-lg rounded  hover:scale-105 border hover:border-white transition-transform' id='news'>News</button>
        <button className='bg-transparent mx-1 px-2 py-1 text-lg rounded  hover:scale-105 border hover:border-white transition-transform' id='contact'>Contact Us</button>
      </div>
      <div className="flex items-center relative md:hidden">
        <ShowMenu />
        <div
          id="pane"
          className="flex flex-col space-y-[15px] absolute mt-2 top-full right-0 text-black bg-white p-1 opacity-0 dark:bg-black dark:text-white"
        >
          <button className='bg-transparent mx-1 px-2 py-1 text-[17px] border-gray-500 W-[120px] rounded  hover:scale-105 border-[1px] transition-transform' id='form'>Forms</button>
          <button className='bg-transparent mx-1 px-2 py-1 text-[17px] border-gray-500 W-[120px] rounded  hover:scale-105 border-[1px] transition-transform' id='dashboard'>Dashboard</button>
          <button className='bg-transparent mx-1 px-2 py-1 text-[17px] border-gray-500 W-[120px] rounded  hover:scale-105 border-[1px] transition-transform' id='news'>News</button>
          <button className='bg-transparent mx-1 px-2 py-1 text-[15px] border-gray-500 W-[120px] rounded  hover:scale-105 border-[1px] transition-transform' id='contact'>Contact Us</button>
        </div>
      </div>
    </div >
  )
}

export default Navbar