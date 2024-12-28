import React from 'react';
import logo from "../assets/images/logo.svg";
import ToggleTheme from './buttons/themebutton';
import ShowMenu from './buttons/menu';

const Navbar = () => {
  return (
    <div className='flex items-center tracking-tight font-roboto justify-between relative dark:bg-black dark:text-white m-0'>
      <div className="start flex">
        <img src={logo} alt="Logo" className='h-[30px]' />
        <div className="name ml-[10px] text-[24px] hover:underline cursor-pointer dark:text-white text-black decoration-blue-900 hover:text-blue-900">Volunteers</div>
      </div>
      <div className="buttons items-center md:flex h-[20px] hidden">
        <button className='bg-gray-300 mx-1 px-2 py-1 text-lg rounded hover:bg-gray-400 hover:scale-105 border hover:border-black transition-transform dark:bg-[rgb(91,89,89)] dark:hover:bg-[rgb(47,47,47)] dark:hover:border dark:hover:border-white' id='form'>Forms</button>
        <button className='bg-gray-300 mx-1 px-2 py-1 text-lg rounded hover:bg-gray-400 hover:scale-105 border hover:border-black transition-transform dark:bg-[rgb(91,89,89)] dark:hover:bg-[rgb(47,47,47)] dark:hover:border dark:hover:border-white' id='dashboard'>Dashboard</button>
        <button className='bg-gray-300 mx-1 px-2 py-1 text-lg rounded hover:bg-gray-400 hover:scale-105 border hover:border-black transition-transform dark:bg-[rgb(91,89,89)] dark:hover:bg-[rgb(47,47,47)] dark:hover:border dark:hover:border-white' id='news'>News</button>
        <button className='bg-gray-300 mx-1 px-2 py-1 text-lg rounded hover:bg-gray-400 hover:scale-105 border hover:border-black transition-transform dark:bg-[rgb(91,89,89)] dark:hover:bg-[rgb(47,47,47)] dark:hover:border dark:hover:border-white' id='contact'>Contact Us</button>
        < ToggleTheme />
      </div>
      <div className="flex items-center relative md:hidden">
        <ToggleTheme />
        <ShowMenu />
        <div
          id="pane"
          className="flex flex-col space-y-[15px] absolute mt-2 top-12 right-0 bg-white p-1 opacity-0 dark:bg-black"
        >
          <button className='bg-gray-300 mx-1 px-2 py-1 text-[17px] W-[120px] rounded hover:bg-gray-400 hover:scale-105 border hover:border-black transition-transform dark:bg-[rgb(91,89,89)] dark:hover:bg-[rgb(47,47,47)] dark:hover:border dark:hover:border-white' id='form'>Forms</button>
          <button className='bg-gray-300 mx-1 px-2 py-1 text-[17px] W-[120px] rounded hover:bg-gray-400 hover:scale-105 border hover:border-black transition-transform dark:bg-[rgb(91,89,89)] dark:hover:bg-[rgb(47,47,47)] dark:hover:border dark:hover:border-white' id='dashboard'>Dashboard</button>
          <button className='bg-gray-300 mx-1 px-2 py-1 text-[17px] W-[120px] rounded hover:bg-gray-400 hover:scale-105 border hover:border-black transition-transform dark:bg-[rgb(91,89,89)] dark:hover:bg-[rgb(47,47,47)] dark:hover:border dark:hover:border-white' id='news'>News</button>
          <button className='bg-gray-300 mx-1 px-2 py-1 text-[15px] W-[120px] rounded hover:bg-gray-400 hover:scale-105 border hover:border-black transition-transform dark:bg-[rgb(91,89,89)] dark:hover:bg-[rgb(47,47,47)] dark:hover:border dark:hover:border-white' id='contact'>Contact Us</button>
        </div>
      </div>
    </div >
  )
}

export default Navbar