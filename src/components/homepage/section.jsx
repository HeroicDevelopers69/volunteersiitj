import React, { useEffect, useState } from 'react';
import SearchBox from '../searchBox';
import Card from '../card';
import NewsCard from '../newsCard';


const Section = ({ title, data }) => {
  const [filtData, setFiltData] = useState(data);

  useEffect(()=>{
    setFiltData(data);
  },[data]);
  
  // Handle search functionality
  const HandleSearch = (query) => {
    if (!query) return setFiltData(data)
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltData(filtered);
  };

  return (
    <div>
      {/* Header with Search Box */}
      <div className="w-full flex justify-between items-center bg-gray-700 text-white px-2 py-2 my-8">
        <h1 className="text-2xl transition-transform duration-300 hover:-translate-y-1">
          {title}
        </h1>
        <SearchBox onSearch={HandleSearch} />
      </div>

      {/* Display Cards */}
      <div className="w-full grid grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {title.toLowerCase() === 'apply' &&
          filtData.map((element) =>
            <Card key={element.advertisementId} advertisement={element} />
          )}
        {title.toLowerCase() === 'news' &&
          filtData.map((element) => <NewsCard key={element.newsId} news={element} />)}
      </div>
    </div>
  );
};

export default Section;

