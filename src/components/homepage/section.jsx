import React from 'react';
import SearchBox from '../searchBox';
import Card from '../card';

import { advertisements } from '../../data/ads';

const Section = ({title}) => {
  const news = [];
  const array = (title.toLowerCase()==='apply')? advertisements : news;
  return (
    <div>
        <div className='w-full flex justify-between items-center bg-gray-700 text-white px-2 py-1 my-8'>
            <h1 className='text-2xl transition-transform duration-300 hover:-translate-y-1'>{title}</h1>
            <SearchBox/>
        </div>
        <div className='w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
          {array.map((element)=>{
            return <Card advertisement={element}/>
          })}
        </div>
    </div>
  )
}

export default Section