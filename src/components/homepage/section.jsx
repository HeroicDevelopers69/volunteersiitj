import React from 'react';
import SearchBox from '../searchBox';
import Card from '../card';
import NewsCard from '../newsCard';

import { advertisements } from '../../data/ads';
import { news } from '../../data/news';


const Section = ({title}) => {
  return (
    <div>
        <div className='w-full flex justify-between items-center bg-gray-700 text-white px-2 py-2 my-8'>
            <h1 className='text-2xl transition-transform duration-300 hover:-translate-y-1'>{title}</h1>
            <SearchBox/>
        </div>
        <div className='w-full grid grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-2 lg:grid-cols-3'>
            {title.toLowerCase()==='apply' && advertisements.map((element)=>{
            return <Card key={element.id} advertisement={element}/>
          })}
            {title.toLowerCase()==='news' && news.map((element)=>{
            return <NewsCard key={element.id} news={element}/>
          })}
        </div>
    </div>
  )
}

export default Section