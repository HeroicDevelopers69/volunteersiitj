import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import AdvertiserDashboard from './pages/advertiserDashboard';
import ContactUs from './pages/contactUs';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const location = useLocation();
  
  // Animation for different transitions
  const pageTransitions = {
    // Default fade transition for pages
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    },
    // Special transition for pages (login/signup)
    auth: {
      initial: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9
      }),
      animate: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20
        }
      },
      exit: (direction) => ({
        x: direction > 0 ? -1000 : 1000,
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.4
        }
      })
    }
  };

  // Custom hook to determine animation direction
  const useAnimationDirection = () => {
    const [direction, setDirection] = React.useState(0);
    
    React.useEffect(() => {
      if (location.pathname === '/login') {
        setDirection(1);
      } else if (location.pathname === '/signup') {
        setDirection(-1);
      }
    }, [location]);

    return direction;
  };

  const direction = useAnimationDirection();

  // Helper to determine which animation to use
  const getAnimationVariants = (path) => {
    if (path === '/login' || path === '/signup') {
      return pageTransitions.auth;
    }
    return pageTransitions.fade;
  };

  return (
    <div className='w-full bg-gray-200 dark:bg-black min-h-screen'>
      <div className="max-w-7xl w-11/12 mx-auto px-4 pt-4 flex flex-col">
        <Navbar />
        <AnimatePresence mode="wait" custom={direction}>
          <Routes location={location} key={location.pathname}>
            {/* Regular routes with fade transition */}
            <Route path='/' element={
              <motion.div {...pageTransitions.fade}>
                <Home />
              </motion.div>
            } />
            <Route path='/advertiserDashboard' element={
              <motion.div {...pageTransitions.fade}>
                <AdvertiserDashboard />
              </motion.div>
            } />
            <Route path='/contactus' element={
              <motion.div {...pageTransitions.fade}>
                <ContactUs />
              </motion.div>
            } />
            
            {/* Auth routes with special transitions */}
            <Route path='/login' element={
              <motion.div
                custom={direction}
                variants={pageTransitions.auth}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <LoginPage />
              </motion.div>
            } />
            <Route path='/signup' element={
              <motion.div
                custom={direction}
                variants={pageTransitions.auth}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <SignupPage />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}

export default App;