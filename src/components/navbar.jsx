import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ShowMenu from './buttons/menu';
import { useUserContext, useUserDispatchContext } from '../customHooks/UserContext'; // Import useUserContext
import { getAuth, signOut } from 'firebase/auth';

const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="relative px-4 py-2 group text-lg font-medium text-white transition-colors duration-200 hover:text-purple-200"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-200 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
};

const MobileMenuItem = ({ to, children }) => (
  <div className="w-auto text-center">
    <Link
      to={to}
      className="px-4 py-3 text-center text-white hover:text-gray-300 transition-colors duration-200 rounded-lg"
    >
      {children}
    </Link>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userProfilePhoto, setUserProfilePhoto] = useState('');
  const [logged, setLogged] = useState(false);
  const [name, setName] = useState();
  const [admin, setAdmin] = useState(false);
  const user = useUserContext();
  const dispatch = useUserDispatchContext();

  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profilePhotoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !profilePhotoRef.current.contains(event.target) &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
        setIsMobileMenuOpen(false); // Close the mobile menu when clicking outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:5000/getUser', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
        }),
      });

      const data = await response.json();
      setUserProfilePhoto(data?.user.photoURL || '');
      setName(data?.user.name.length > 10 ? `${data?.user.name.substring(0, 10)}...` : data?.user.name);
      setLogged(true);
      setAdmin(data?.user.isAdvertiser);
    };

    if (user && user.userId) {
      fetchUserData();
    }
  }, [user]);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setLogged(false);
      setAdmin(false);
      setUserProfilePhoto('');
      dispatch({ type: 'reset' });
      window.location.reload();
    } catch (error) {
    }
  };

  return (
    <nav
      className={`fixed h-[60px] top-0 left-0 right-0 z-50 transition-all duration-300 mb-7 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-gray-900/90'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/assets/images/logo.svg"
              alt="Logo"
              className="h-8 w-auto transform transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-2xl font-bold text-white">VolunteersIITJ</span>
          </Link>
          <div className="flex">
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/">Home</NavLink>
              {logged && (
                <>
                  {admin && (
                    <>
                      <NavLink to="/advertiserDashboard">Dashboard</NavLink>
                      <NavLink to="/makeAdvertisement">Make Ad</NavLink>
                      <NavLink to="/makeNews">Make News</NavLink>
                    </>
                  )}
                  <NavLink to="/contactus">Contact Us</NavLink>
                  <NavLink to="/aboutus">About Us</NavLink>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
            >
              <ShowMenu />
            </button>

            <div
              className="relative flex items-center ml-4"
              ref={profilePhotoRef}
            >
              <div
                className="h-10 w-10 rounded-full bg-gray-700 mt-1 flex items-center justify-center border-2 border-white cursor-pointer"
                onClick={handleProfileClick}
              >
                {userProfilePhoto ? (
                  <img
                    src={userProfilePhoto}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <i className="fas fa-user text-white text-xl"></i>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Menu */}
        {isProfileMenuOpen && (
          <div
            className="w-[130px] absolute right-5 md:right-[100px] top-16 dark:bg-gray-900/95 rounded-lg flex flex-col space-y-1 p-1 shadow-sm dark:shadow-white/25 shadow-black/25 mt-2 bg-gray-700"
            ref={profileMenuRef}
          >
            <div className='px-1 py-1 text-center text-white duration-200 rounded-lg font-medium'>{name}</div>
            <button to="/profile" className='px-1 py-1 text-center text-white hover:text-gray-300 duration-200 rounded-lg hover:scale-110 transition-all active:scale-95'>Profile</button>
            <button onClick={handleLogout} className='px-1 py-1 text-center text-white hover:text-gray-300 duration-200 rounded-lg hover:scale-110 transition-all active:scale-95'>Logout</button>
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={`w-[150px] fixed right-10 shadow-sm shadow-white/40 md:hidden transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          ref={mobileMenuRef}
        >
          <div className="px-2 pt-1 pb-3 space-y-1 bg-gray-900/95 rounded-lg shadow-xl mt-2">
            <MobileMenuItem to="/">Forms</MobileMenuItem>
            {logged && (
              <>
                {admin && (
                  <>
                    <MobileMenuItem to="/advertiserDashboard">Dashboard</MobileMenuItem>
                    <NavLink to="/makeAdvertisement">Make Ad</NavLink>
                    <NavLink to="/makeNews">Make News</NavLink>
                  </>
                )}
                <MobileMenuItem to="/contactus">Contact Us</MobileMenuItem>
                <MobileMenuItem to="/aboutus">About Us</MobileMenuItem>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
