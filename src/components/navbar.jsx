import React from 'react';
import ToggleTheme from './buttons/themebutton';
import ShowMenu from './buttons/menu';

const Navbar = () => {
  return (
    <div className='flex items-center tracking-tight font-roboto justify-between relative dark:bg-black dark:text-white m-0 z-20'>
      <div className="start flex">
        <img src='/assets/images/logo.svg' alt="Logo" className='h-[30px]' />
        <div className="name ml-[10px] text-[24px] hover:underline cursor-pointer decoration-blue-900 hover:text-blue-900">Volunteers</div>
      </div>
      <div className="buttons items-center md:flex h-[20px] hidden">
        <button className='bg-transparent mx-1 px-2 py-1 text-lg rounded hover:bg-gray-100 hover:scale-105 border hover:border-black transition-transform dark:hover:bg-gray-950 dark:hover:border dark:hover:border-white' id='form'>Forms</button>
        <button className='bg-transparent mx-1 px-2 py-1 text-lg rounded hover:bg-gray-100 hover:scale-105 border hover:border-black transition-transform dark:hover:bg-gray-950 dark:hover:border dark:hover:border-white'>Dashboard</button>
        <button className='bg-transparent mx-1 px-2 py-1 text-lg rounded hover:bg-gray-100 hover:scale-105 border hover:border-black transition-transform dark:hover:bg-gray-950 dark:hover:border dark:hover:border-white' id='news'>News</button>
        <button className='bg-transparent mx-1 px-2 py-1 text-lg rounded hover:bg-gray-100 hover:scale-105 border hover:border-black transition-transform dark:hover:bg-gray-950 dark:hover:border dark:hover:border-white' id='contact'>Contact Us</button>
        < ToggleTheme />
      </div>
      <div className="flex items-center relative md:hidden">
        <ToggleTheme />
        <ShowMenu />
        <div
          id="pane"
          className="flex flex-col space-y-[15px] absolute mt-2 top-full right-0 bg-white p-1 opacity-0 dark:bg-black"
        >
          <button className='bg-transparent mx-1 px-2 py-1 text-[17px] border-gray-500 W-[120px] rounded hover:bg-gray-100 hover:scale-105 border-[1px] hover:border-black transition-transform dark:hover:bg-gray-950 dark:hover:border dark:hover:border-white' id='form'>Forms</button>
          <button className='bg-transparent mx-1 px-2 py-1 text-[17px] border-gray-500 W-[120px] rounded hover:bg-gray-100 hover:scale-105 border-[1px] hover:border-black transition-transform dark:hover:bg-gray-950 dark:hover:border dark:hover:border-white' id='dashboard'>Dashboard</button>
          <button className='bg-transparent mx-1 px-2 py-1 text-[17px] border-gray-500 W-[120px] rounded hover:bg-gray-100 hover:scale-105 border-[1px] hover:border-black transition-transform dark:hover:bg-gray-950 dark:hover:border dark:hover:border-white' id='news'>News</button>
          <button className='bg-transparent mx-1 px-2 py-1 text-[15px] border-gray-500 W-[120px] rounded hover:bg-gray-100 hover:scale-105 border-[1px] hover:border-black transition-transform dark:hover:bg-gray-950 dark:hover:border dark:hover:border-white' id='contact'>Contact Us</button>
        </div>
      </div>
    </div >
  )
}

export default Navbar