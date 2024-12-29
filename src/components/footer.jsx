import React from 'react';

const Footer = () => {
  return (
    <>
    <div className="h-10"></div>
    <footer className="bg-gray-900 text-white py-10 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">YourLogo</h2>
          <p className="text-gray-400 text-sm">
            Creating meaningful digital experiences through intuitive design and seamless interactions.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Projects</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <span className="material-icons mr-2">phone</span>
              <span>+1 (123) 456-7890</span>
            </li>
            <li className="flex items-center">
              <span className="material-icons mr-2">email</span>
              <span>contact@yourdomain.com</span>
            </li>
            <li className="flex items-center">
              <span className="material-icons mr-2">location_on</span>
              <span>123 Your Street, City, Country</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-gray-500 text-sm">&copy; 2024 VolunteersIITJ. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
    </>
    
  );
};

export default Footer;
