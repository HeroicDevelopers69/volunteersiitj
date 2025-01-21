import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { useUserContext } from './customHooks/UserContext';
import MakeNews from './pages/makeNews';
import ErrorPage from './pages/error';
import Profile from './pages/profile';
import Loading from './components/loading';
import ShowForm from './pages/showForm';

function App() {
  const user = useUserContext();

  const { pathname } = useLocation();

  useEffect(() => {
    const homey = localStorage.getItem('homeY');
    if (homey && pathname === '/') {
      window.scrollTo(0, homey);
    }
    else{
      window.scrollTo(0, 0);
    }
  }, [pathname]);


  return (
    <div className="w-full bg-gray-200 dark:bg-black min-h-screen">
      <div className="max-w-7xl w-11/12 mx-auto px-4 pt-4 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showAd" element={<ShowAd />} />
          <Route path="/showNews" element={<ShowNews />} />
          <Route path="/showForm" element={<ShowForm />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/error" element={<ErrorPage />} />

          {user.isAdvertiser &&
            <>
              <Route path="/makeNews" element={<MakeNews />} />
              <Route path="/advertiserDashboard" element={<MakeNews />} />
              <Route path="/makeAdvertisement" element={<MakeAdvertisement />} />
            </>
          }
          {!user.isAdvertiser &&
            <>
              <Route path="/makeNews" element={<Loading />} />
              <Route path="/advertiserDashboard" element={<Loading />} />
              <Route path="/makeAdvertisement" element={<Loading />} />
            </>
          }
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
