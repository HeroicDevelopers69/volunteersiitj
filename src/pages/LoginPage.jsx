import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js"; // Import your Firebase config
import { useUserDispatchContext } from '../customHooks/UserContext.jsx';
import { validColleges } from '../data/validColleges.js';
import { validAdvertisers } from '../data/validAdvertisers.js';

export default function LoginPage() {
  const dispatch = useUserDispatchContext();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const college = validColleges[user.email.substring(user.email.indexOf('@'),user.email.length+1)] || '';
      const body = {
        name: user.displayName,
        userId: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        college: college,
        isAdvertiser: validAdvertisers.includes(user.email)
      }
      dispatch({
        type: 'set',
        ...body
      })
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500 dark:bg-gray-900 bg-gray-100">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-700/50">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white animate-fadeIn">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 animate-fadeIn">
          Log in to your account to continue.
        </p>
        <div className='w-full text-center'>
          <button onClick={handleGoogleSignIn} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">Sign in with Google</button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
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