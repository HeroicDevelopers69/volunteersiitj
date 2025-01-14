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

function App() {
  const user = useUserContext();
  const admin = user.isAdvertiser;
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
          {user.name !== '' ? (
            <>
              <Route path="/showAd" element={<ShowAd />} />
              <Route path="/showNews" element={<ShowNews />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/profile" element={<Profile />} />

              {admin ? (
                <>
                  <Route path="/makeNews" element={<MakeNews />} />
                  <Route path="/advertiserDashboard" element={<MakeNews />} />
                  <Route path="/makeAdvertisement" element={<MakeAdvertisement />} />
                </>
              ) : (
                <>
                  <Route path="/makeNews" element={<Navigate to="/error" />} />
                  <Route path="/advertiserDashboard" element={<Navigate to="/error" />} />
                  <Route path="/makeAdvertisement" element={<Navigate to="/error" />} />
                </>
              )}
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/showAd" element={<Navigate to="/error" />} />
              <Route path="/showNews" element={<Navigate to="/error" />} />
              <Route path="/contactus" element={<Navigate to="/error" />} />
              <Route path="/profile" element={<Navigate to="/error" />} />
              <Route path="/aboutus" element={<Navigate to="/error" />} />
            </>
          )}
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
