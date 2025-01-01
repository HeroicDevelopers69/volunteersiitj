import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ news = { title: '', description: '', publisher: '', imgsrc: '' } }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
    to='/showNews'
    state={{news:news}} 
    className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="relative w-full h-60 bg-gray-100 dark:bg-gray-900">
          <img
            src={news.imgsrc}
            alt={news.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
            {news.title}
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 text-justify">
            {isExpanded ? news.description : 
              news.description.length > 430 ? 
                `${news.description.substr(0, 430)}...` : 
                news.description
            }
            {news.description.length > 430 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium focus:outline-none"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
        </div>
      </div>

      <div className="mt-2 px-4 py-3 bg-gray-700 dark:bg-gray-900 rounded-b-xl flex justify-between items-center text-sm text-white">
        <span>Published By</span>
        <span className="font-medium">{news.publisher}</span>
      </div>
    </Link>
  );
};

export default NewsCard;