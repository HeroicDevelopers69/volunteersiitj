import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import MakeAdvertisement from './pages/makeAdvertisement';
import ContactUs from './pages/contactUs';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutUs from './pages/aboutus';
import ShowAd from './pages/showAd';
import ShowNews from './pages/showNews';
import MakeNews from './pages/makeNews';

function App() {
  const location = useLocation();

  // Sliding transition variants
  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    }),
  };

  // Determine animation direction
  const useAnimationDirection = () => {
    const [direction, setDirection] = React.useState(0);

    React.useEffect(() => {
      const pathOrder = [
        '/', // Home
        '/makeAdvertisement',
        '/showAd',
        '/showNews',
        '/contactus',
        '/login',
        '/signup',
        '/aboutus',
        '/makeNews',
      ];

      // Track path changes and update direction
      setDirection((prevDirection) => {
        const currentIndex = pathOrder.indexOf(location.pathname);
        const previousIndex = pathOrder.indexOf(location.state?.previousPath || '/');
        return currentIndex > previousIndex ? 1 : -1;
      });
    }, [location]);

    return direction;
  };

  const direction = useAnimationDirection();

  return (
    <div className="w-full bg-gray-200 dark:bg-black min-h-screen">
      <div className="max-w-7xl w-11/12 mx-auto px-4 pt-4 flex flex-col">
        <Navbar />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={location.pathname}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideVariants}
            className="w-full"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/makeAdvertisement" element={<MakeAdvertisement />} />
              <Route path="/showAd" element={<ShowAd />} />
              <Route path="/showNews" element={<ShowNews />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/makeNews" element={<MakeNews />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}

export default App;
