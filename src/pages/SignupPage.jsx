import React, { useState } from 'react';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500 dark:bg-gray-900 bg-gray-100">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-700/50">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white animate-fadeIn">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 animate-fadeIn">
          Join us and start your journey.
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 dark:text-gray-400 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Choose a username"
            />
          </div>
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
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
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
    </div>
  );
}