import React from "react";

const SignUpPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="w-full px-4 py-2 bg-green-500 text-white rounded">Sign Up</button>
      </form>
    </div>
  </div>
);

export default SignupPage;
