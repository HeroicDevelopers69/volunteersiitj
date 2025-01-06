import React, { useEffect } from 'react';
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
  const homey = localStorage.getItem('knowMorePosition');
  const { pathname } = useLocation();
  useEffect(() => {
    if (homey && pathname === '/') {
      window.scrollTo(0, homey);
      localStorage.removeItem('knowMorePosition');
    } else {
      window.scrollTo(0, 0); // Sets the scroll position to the top
    }
  }, [pathname]);


  return (
    <div className="w-full bg-gray-200 dark:bg-black min-h-screen">
      <div className="max-w-7xl w-11/12 mx-auto px-4 pt-4 flex flex-col">
        <Navbar />
        <Routes>
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
        <Footer />
      </div>
    </div>
  );
}

export default App;
