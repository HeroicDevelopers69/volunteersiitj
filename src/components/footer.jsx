import React, { useState, useEffect } from 'react';

const Footer = () => {
  // Check local storage for saved theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode); // Apply the dark class to the root element
  }, [isDarkMode]);

  const AnimatedUnderline = ({ text }) => {
    return (
      <div class="flex justify-start items-center">
        <a href="#" class="relative group ml-1">
          {text}
          <span class={`absolute left-0 bottom-0 w-0 h-[1px] ${isDarkMode ? 'bg-white' : 'bg-black'} transition-all duration-500 group-hover:w-full`}></span>
        </a>
      </div>
    );
  };
  return (
    <>
      <div className="h-10"></div>
      <footer
        className={`py-10 w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div
              className="mb-4"
              style={{
                backgroundColor: 'white',
                padding: '10px',
                width: '100px',
                borderRadius: '50%',
                justifySelf: 'center',
              }}
            >
              <img
                alt="Logo"
                className="h-[30px]"
                src="/assets/images/logo.png"
                style={{ height: '80px', width: '80px', borderRadius: '50%' }}
              />
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`} >
              Stay Connected with Volunteer Opportunities at IIT Jodhpur!
              <br />
              <br />
              Explore the latest student volunteer vacancies across all societies and initiatives. Say goodbye to searching emails—find everything in one place!
            </p>
          </div>

          {/* Navigation Links */}
          <div style={{ padding: '20px 70px' }}>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><AnimatedUnderline text="Home" /> </li>
              <li><AnimatedUnderline text="Current Opportunities" /> </li>
              <li><AnimatedUnderline text="Submit Your Application" /> </li>
              <li><AnimatedUnderline text="Contact Us" /> </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div style={{ padding: '20px 10px' }}>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className={`fa fa-phone mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ padding: '10px' }}></span>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <span className={`fas fa-envelope mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ padding: '10px' }}></span>
                <span>contact@yourdomain.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-700'}`}>
            &copy; 2024 VolunteersIITJ. Empowering students through meaningful engagement.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="https://github.com/HeroicDevelopers69/volunteersiitj" target='_blank' className={`text-gray-400 hover:${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              <i className="fab fa-github"></i>
            </a>

            <a href="#" className={`text-gray-400 hover:${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-4 right-4 p-3 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} z-50`}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>
    </>
  );
};

export default Footer;
