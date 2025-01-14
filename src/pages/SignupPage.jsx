import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";
import { useUserDispatchContext } from '../customHooks/UserContext.jsx';
import { validColleges } from '../data/validColleges.js';
import { validAdvertisers } from '../data/validAdvertisers.js';
import { validDevelopers } from '../data/validDevelopers.js';
import ErrorMessage from '../components/error.jsx';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const dispatch = useUserDispatchContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const isEmailRegistered = await checkIfEmailExists(user.email);

      if (isEmailRegistered) {
        await handleGoogleSignIn(user);
        return;
      }

      const college = validColleges[user.email.substring(user.email.indexOf('@'), user.email.length + 1)] || '';
      const body = {
        name: user.displayName,
        userId: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        college: college,
        isAdvertiser: validAdvertisers.includes(user.email),
        isDeveloper: validDevelopers.includes(user.email)
      };

      dispatch({
        type: 'set',
        ...body
      });

      try {
        const response = await fetch('http://localhost:5000/createUser', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        });
        
        if (!response.ok) {
          const data = await response.json();
          console.error("Signup failed:", data);
          setError({ title: 'Error', message: data.message || 'Sign-up failed. Please try again.' });
          return;
        }
        
        const data = await response.json();
        navigate('/');
      } catch (err) {
        console.error("Error during API request:", err);
        setError({ title: 'Error', message: 'Sign-up failed. Please try again.' });
      }
    } catch (error) {
      console.error("Google sign-up error:", error);
      setError({ title: 'Error', message: 'Sign-up failed. Please try again.' });
    }
  };

  const checkIfEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/checkEmail/${email}`);
      const data = await response.json();
      return data.exists;
    } catch (err) {
      console.error("Error checking email existence:", err);
      setError({ title: 'Error', message: 'Error checking email. Please try again.' });
      return false;
    }
  };

  const handleGoogleSignIn = async (user) => {
    const college = validColleges[user.email.substring(user.email.indexOf('@'), user.email.length + 1)] || '';
    const body = {
      name: user.displayName,
      userId: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      college: college,
      isAdvertiser: validAdvertisers.includes(user.email)
    };

    dispatch({
      type: 'set',
      ...body
    });

    // Redirect to homepage after successful login
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500 dark:bg-gray-900 bg-gray-100">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-700/50">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white animate-fadeIn">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 animate-fadeIn">
          Join us and start your journey.
        </p>
        <button
          onClick={handleGoogleSignUp}
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
        >
          Sign up with Google
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-500 hover:text-pink-700 dark:hover:text-pink-300"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
      {error && (
        <ErrorMessage title={error.title} message={error.message} state="true" />
      )}
    </div>
  );
}