import React from 'react'

const NewsCard = ({ news }) => {
    return (
        <div className='max-w-96 w-full transition-transform duration-100 hover:scale-[1.01] cursor-pointer'>
            <div className='max-w-96 pb-3 w-full flex flex-col items-center justify-between border-2 border-gray-600 px-2 pt-2'>
                <div className='w-full'>
                    <img className='max-h-60' src={news.imgsrc} alt="IMG" />
                </div>
                <h1 className='w-full text-xl font-bold text-justify py-4 dark:text-white'>{news.title}</h1>
                <p className='w-full text-justify dark:text-white'>
                    {(news.description.length < 430) ? news.description : news.description.substr(0, 430)+'...'}
                </p>
            </div>
            <div className='w-full px-2 py-1 flex justify-between bg-gray-600'>
                <span className='text-white'>Published By</span>
                <span className='text-white'>{news.publisher}</span>
            </div>
        </div>
    )
}

export default NewsCard