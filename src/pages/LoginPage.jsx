import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useUserDispatchContext } from '../customHooks/UserContext';
import { validColleges } from '../data/validColleges';
import { validAdvertisers } from '../data/validAdvertisers';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useUserDispatchContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const college = validColleges[user.email.substring(user.email.indexOf('@'), user.email.length + 1)] || '';
      const body = {
        name: user.displayName,
        userId: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        college: college,
        isAdvertiser: validAdvertisers.includes(user.email),
      };
      dispatch({
        type: 'login',
        ...body,
      });
      navigate('/', {
        state: { title: 'Welcome Back', message: 'Successfully logged in' }
      });
} catch (error) {
  // Handle error if login fails
  console.error(error);
} finally {
  setLoading(false); // Set loading to false when the process is done
}
  };

// Rendering logic based on loading state
return (
  <div className="min-h-screen mt-[50px] flex items-center justify-center transition-colors duration-500 dark:bg-gray-900 bg-gray-100">
    <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-700/50">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white animate-fadeIn">
        Welcome Back
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6 animate-fadeIn">
        Log in to your account to continue.
      </p>
      <div className="w-full text-center text-black dark:text-white">
        {loading ? (
          <p>Loading...</p> // Display loading message while signing in
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Sign in with Google
          </button>
        )}
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Don’t have an account?{' '}
          <a
            href="/signup"
            className="text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  </div>
);
}
