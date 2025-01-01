import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CardField = ({ label, value }) => (
  <div className="w-full flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
    <p className="font-semibold  dark:text-gray-300">{label}</p>
    <p className=" dark:text-gray-400">{value}</p>
  </div>
);

const CardFieldList = ({ label, items }) => (
  <div className="w-full flex justify-between items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
    <p className="w-1/3 font-semibold  dark:text-gray-300">{label}</p>
    <ul className="w-2/3 space-y-1">
      {items.map((element, index) => (
        <li key={index} className="text-right  dark:text-gray-400">{element}</li>
      ))}
    </ul>
  </div>
);

const CardMessage = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedMessage = message.length > 215 ? message.substr(0, 215) + '...' : message;

  return (
    <div className="w-full p-3">
      <p className=" dark:text-gray-400 bg-gray-50 text-justify dark:bg-gray-900 rounded-lg p-4 transition-all">
        {isExpanded ? message : truncatedMessage}
        {message.length > 215 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 ml-2 font-medium"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
    </div>
  );
};

// Sample data structure for demonstration
const defaultAdvertisement = {
  title: "Default Advertisement",
  sequence: [],
  deadline: new Date(Date.now() + 86400000 * 5), // 5 days from now
  creator: "Anonymous"
};

const Card = ({ advertisement = defaultAdvertisement }) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = [];
  if (advertisement.sequence) {
    for (let component of advertisement.sequence) {
      if (content.length >= 5) break;
      
      switch (component.type) {
        case 'field':
          content.push(<CardField key={content.length} label={component.label} value={component.value} />);
          break;
        case 'fieldList':
          content.push(<CardFieldList key={content.length} label={component.label} items={component.items} />);
          break;
        case 'fieldMessage':
          content.push(<CardMessage key={content.length} message={component.message} />);
          break;
      }
    }
  }

  const date = new Date();
  const deadline = new Date(advertisement.deadline);
  const timeDifference = deadline - date;
  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const timeColorClass = daysLeft > 3 ? 'text-green-500' : daysLeft > 1 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div
      className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <h1 
          className={`bg-black text-white py-4 px-6 text-xl font-bold text-center transition-all duration-300 ${
            isHovered ? 'tracking-[10px]' : ''
          }`}
        >
          {advertisement.title}
        </h1>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {content}
        </div>

        <div className="p-4 flex justify-between gap-4">
          <Link
          to='/showAd'
          state={{ad:advertisement}}
          className="w-1/2 py-2 bg-purple-600 text-center hover:bg-purple-700 text-white rounded-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Know More
          </Link>
          <button className="w-1/2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Apply
          </button>
        </div>
      </div>

      <div className="mt-2 px-4 py-3 bg-gray-100 dark:bg-gray-900 rounded-b-xl flex justify-between items-center">
        <span className={`${timeColorClass}`}>
          Time left: {daysLeft}d {hoursLeft}h
        </span>
        <span className=" dark:text-gray-400">
          By {advertisement.creator}
        </span>
      </div>
    </div>
  );
};

export default Card;

