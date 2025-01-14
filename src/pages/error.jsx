import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2, ease: 'easeOut' } },
    tap: { scale: 0.95 },
  };

  const buttonContainerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1, delayChildren: 0.8 } },
  };

  const buttonChildVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r bg-gray-300 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col justify-center items-center">
      <motion.div
        className="text-center dark:text-white text-black p-6 rounded-lg shadow-lg max-w-lg mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-semibold mb-4">Oops!</h1>
        <p className="text-xl mb-6">You are not authorized to use this page.</p>
        <motion.div
          variants={buttonContainerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={buttonChildVariants}>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/')}
              className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition duration-300"
            >
              Go to Home
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
