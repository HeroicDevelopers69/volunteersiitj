import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import AdvertiserDashboard from './pages/advertiserDashboard';
import ContactUs from './pages/contactUs';
import AboutUs from './pages/aboutus';

function App() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5,
  };

  return (
    <div className='w-full bg-gray-200 dark:bg-black'>
      <div className="max-w-7xl w-11/12 mx-auto px-4 pt-4 flex flex-col">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path='/'
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path='/advertiserDashboard'
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <AdvertiserDashboard />
                </motion.div>
              }
            />
            <Route
              path='/contactus'
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <ContactUs />
                </motion.div>
              }
            />
            <Route
              path='/aboutus'
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <AboutUs />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}

export default App;
