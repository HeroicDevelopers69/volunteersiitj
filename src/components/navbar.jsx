import React, { useState, useEffect } from 'react';
import logo from "../assets/images/logo.svg";
import ToggleTheme from './buttons/themebutton';
import ShowMenu from './buttons/menu';

const Navbar = () => {
  return (
    <div className='flex items-center tracking-tight font-roboto justify-between relative dark:bg-black dark:text-white m-0'>
      <div className="start flex">
        <img src={logo} alt="Logo" className='h-[30px]' />
        <div className="name ml-[10px] text-[24px] hover:underline cursor-pointer decoration-blue-900 hover:text-blue-900">Volunteers</div>
      </div>
      <div className="buttons items-center md:flex h-[20px] hidden">
        <button className='home-btn' id='form'>Forms</button>
        <button className='home-btn' id='dashboard'>Dashboard</button>
        <button className='home-btn' id='news'>News</button>
        <button className='home-btn' id='contact'>Contact Us</button>
        < ToggleTheme />
      </div>
      <div className="flex items-center relative md:hidden">
        <ToggleTheme />
        <ShowMenu />
        <div
          id="pane"
          className="flex-col space-y-[15px] absolute mt-2 top-0 right-full bg-white p-1 opacity-0"
        >
          <button className='mob-home-btn' id='form'>Forms</button>
          <button className='mob-home-btn' id='dashboard'>Dashboard</button>
          <button className='mob-home-btn' id='news'>News</button>
          <button className='mob-home-btn' id='contact'>Contact Us</button>
        </div>
      </div>
    </div >
  )
}

export default Navbar