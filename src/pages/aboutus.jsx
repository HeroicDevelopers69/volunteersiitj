import React from 'react';
import AboutUserCard from '../components/aboutus/aboutcard';
import { teamofHeroic } from '../data/team';

const AboutUs = () => {
    return (
        <div className="mt-7 shadow-md rounded-sm shadow-black/75 dark:shadow-white/25 relative h-auto bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-10">
            {/* Header Section */}
            <div className="relative flex justify-center items-center mb-12">
                <h1 className="relative group text-xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-white">
                    Meet the Team of Heroic
                    <span
                        className="absolute left-0 bottom-[-5px] w-0 h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700 group-hover:w-full"
                    ></span>
                </h1>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamofHeroic.map((member, index) => (
                    <AboutUserCard key={index} user={member} />
                ))}
            </div>

            {/* Subtle Floating Animation */}
            <div className="absolute top-20 left-0 w-36 h-36 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full filter blur-3xl opacity-40"></div>
            <div className="absolute bottom-10 right-0 w-40 h-40 bg-gradient-to-br from-pink-400 to-red-500 rounded-full filter blur-3xl opacity-40"></div>
        </div>
    );
};

export default AboutUs;
