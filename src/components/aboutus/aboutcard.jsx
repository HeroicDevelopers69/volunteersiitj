import React from 'react';

const AboutUserCard = ({ user }) => {
    const { name, bio, profileImage, socialLinks } = user;

    const handleRedirect = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="relative group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-500 ease-in-out">
            {/* Profile Image Section */}
            <div className="relative">
                <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black dark:to-gray-600 opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 text-center">
                {/* Name with Animation */}
                <h2
                    className="relative group text-2xl font-bold text-gray-800 dark:text-white cursor-pointer inline-block"
                    onClick={() => handleRedirect(socialLinks.github)}
                >
                    {name}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
                </h2>

                {/* Bio */}
                <p className="text-gray-600 dark:text-gray-300 mt-2">{bio}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-6 mt-4">
                    <button
                        onClick={() => handleRedirect(socialLinks.linkedin)}
                        className="text-blue-700 hover:text-blue-500 hover:scale-110 transition-all duration-300 ease-in-out"
                    >
                        <i className="fab fa-linkedin fa-2x"></i>
                    </button>
                    <button
                        onClick={() => handleRedirect(socialLinks.instagram)}
                        className="text-pink-500 hover:text-pink-400 hover:rotate-[90deg] hover:scale-110 transition-all duration-300 ease-in-out"
                    >
                        <i className="fab fa-instagram fa-2x"></i>
                    </button>
                    <button
                        onClick={() => handleRedirect(socialLinks.github)}
                        className="text-gray-900 dark:text-white hover:text-gray-500 hover:-rotate-[16deg] hover:scale-110 transition-all duration-300 ease-in-out"
                    >
                        <i className="fab fa-github fa-2x"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUserCard;
