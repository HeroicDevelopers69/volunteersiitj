import React from 'react'
import { useLocation } from 'react-router-dom'

const ShowNews = () => {
    const location = useLocation();
    const news = location.state?.news;

    return (
        <div className='w-full flex justify-center py-10 mt-10'>
            <div className='w-full flex flex-col gap-y-2 max-w-2xl bg-white'>
                <div className='max-h-96'>
                    <img className='w-full' src={news.imgsrc} alt="IMG" />
                </div>
                <div className='w-full text-center'>
                    <h1 className='text-2xl font-bold py-2'>{news.title}</h1>
                </div>
                <div className='w-full text-[1.1rem] tracking-wide text-justify py-1 px-4'>
                    <p>{news.description}</p>
                </div>
                <div className='w-full mt-4 px-2 py-2 flex justify-between bg-gray-600'>
                    <span className='text-white'>Published By</span>
                    <span className='text-white'>{news.publisher}</span>
                </div>
            </div>
        </div>
    )
}

export default ShowNews