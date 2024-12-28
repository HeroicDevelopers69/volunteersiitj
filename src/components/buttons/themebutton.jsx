import React, { useState, useEffect } from 'react';
import lightImage from "../../assets/images/light.svg";
import darkImage from "../../assets/images/dark.svg";

const ToggleTheme = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
            onClick={toggleTheme}
            className="bg-gray-300 mx-1 px-2 py-1 text-lg rounded hover:bg-gray-400 hover:scale-105 hover:border hover:border-black transition-transform dark:bg-[rgb(91,89,89)] dark:hover:bg-[rgb(47,47,47)] dark:hover:border dark:hover:border-white"
        >
            {darkMode ? <img src={darkImage} alt="Dark" className='p-[1px] h-[15px] w-[15px] md:h-[26px] md:w-[26px] invert bg-transparent' /> : <img src={lightImage} alt="Light" className='p-[1px] h-[16px] w-[16px] md:h-[26px] md:w-[26px] bg-transparent' />}
        </button>
    );
};

export default ToggleTheme;
