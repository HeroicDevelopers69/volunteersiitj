import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ news = { title: '', description: '', publisher: '', imgsrc: '' } }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
    to='/showNews'
    state={{news:news}} 
    onClick={() => localStorage.setItem('homeY', window.scrollY)}
    className="max-w-md w-full flex flex-col justify-between bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
      <div className="rounded-xl overflow-hidden">
        <div className="relative w-full max-h-60 bg-gray-100 dark:bg-gray-900">
          <img
            src={news.imageURL}
            alt={news.title}
            className={`inset-0 w-full object-cover transition-opacity duration-300 ${
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
            {news.para1.length > 430 ? `${news.para1.substr(0, 430)}...` : news.para1}
          </p>
        </div>
      </div>
      <div className="mt-2 px-4 py-3 bg-gray-700 dark:bg-gray-900 rounded-b-xl flex justify-between items-center text-sm text-white">
        <span>Published By</span>
        <span className="font-medium">{news.creator}</span>
      </div>
    </Link>
  );
};

export default NewsCard;