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
import { useUserContext } from './customHooks/UserContext';
import MakeNews from './pages/makeNews';
import ErrorPage from './pages/error';
import PrivateRoute from './pages/privacy';

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
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="w-full bg-gray-200 dark:bg-black min-h-screen">
      <div className="max-w-7xl w-11/12 mx-auto px-4 pt-4 flex flex-col">
        <Navbar />
        <Routes>
          {/* Home and public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/showAd"
            element={<PrivateRoute element={<ShowAd />} />}
          />
          <Route
            path="/showNews"
            element={<PrivateRoute element={<ShowNews />} />}
          />
          <Route
            path="/contactus"
            element={<PrivateRoute element={<ContactUs />} />}
          />
          <Route
            path="/aboutus"
            element={<PrivateRoute element={<AboutUs />} />}
          />
          <Route
            path="/makeNews"
            element={<PrivateRoute element={<MakeNews />} isadmin='true' />}
          />
          <Route
            path="/advertiserDashboard"
            element={<PrivateRoute element={<MakeNews />} isadmin='true' />}
          />
          <Route
            path="/makeAdvertisement"
            element={<PrivateRoute element={<MakeAdvertisement />} isadmin='true' />}
          />

          {/* Error route */}
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
