import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleClick = () => {
        onSearch(query)
        console.log(query)
    };

    return (
        <div className="w-full max-w-lg mx-auto flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            />
            <button
                onClick={handleClick}
                className="flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-transform transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.71 20.29l-3.388-3.388A8.945 8.945 0 0019 11c0-4.962-4.038-9-9-9S1 6.038 1 11s4.038 9 9 9c2.063 0 3.953-.688 5.489-1.848l3.388 3.388a1 1 0 001.415-1.415zM4 11a7 7 0 1114 0 7 7 0 01-14 0z" />
                </svg>
            </button>
        </div>
    );
};

export default SearchBox;
