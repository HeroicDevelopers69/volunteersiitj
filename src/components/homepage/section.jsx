import React from 'react';
import SearchBox from '../searchBox';
import Card from '../card';

const Section = ({title}) => {
  return (
    <div>
        <div className='w-full flex justify-between items-center bg-gray-700 text-white px-2 py-1 my-8'>
            <h1 className='text-2xl transition-transform duration-300 hover:-translate-y-1'>{title}</h1>
            <SearchBox/>
        </div>
        <Card/>
    </div>
  )
}

export default Section