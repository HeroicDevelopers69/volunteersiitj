import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  // Animation variants for the buttons
  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const buttonContainerVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.8
      }
    }
  };

  const buttonChildVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <>
      <div className='w-full absolute top-0 right-0 h-screen bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900'></div>
      <div className='w-full h-screen -mt-9 flex flex-col justify-center items-center gap-6 bg-transparent text-white z-10'>
        <div className='text-center transition-transform duration-300 hover:-translate-y-3'>
          <div className="flex items-center justify-center">
            <h2 className='relative group text-4xl md:text-6xl font-semibold pb-4'>
              Be The Chosen One
              <span className="absolute left-1/2 bottom-[10px] h-[0.5px] bg-white transform w-0 animate-underline"></span>
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <h1 className='relative group text-4xl md:text-6xl font-bold'>
              Be a Volunteer
              <span className="absolute left-1/2 bottom-0 h-[0.5px] bg-white transform w-0 animate-underline"></span>
            </h1>
          </div>
        </div>
        
        <motion.div 
          className="flex gap-4 mt-8"
          variants={buttonContainerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={buttonChildVariants}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative"
            >
              <Link
                to="/login"
                className="inline-block px-8 py-3 text-lg font-semibold text-white border-2 border-white rounded-full 
                          backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors duration-300
                          shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Login
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={buttonChildVariants}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative"
            >
              <Link
                to="/signup"
                className="inline-block px-8 py-3 text-lg font-semibold text-black bg-white rounded-full
                          hover:bg-opacity-90 transition-colors duration-300
                          shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Sign Up
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;