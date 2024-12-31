import React, { useState } from 'react';

export default function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500 dark:bg-gray-900 bg-gray-100">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-700/50">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white animate-fadeIn">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 animate-fadeIn">
          Log in to your account to continue.
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 dark:text-gray-400 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 dark:text-gray-400 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Log In
          </button>
        </form>
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
