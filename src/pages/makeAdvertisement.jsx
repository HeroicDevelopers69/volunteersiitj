import React from 'react'
import MakeAd from '../components/makeAdvertisement/makeAd'
import MakeForm from '../components/makeAdvertisement/makeForm'

const MakeAdvertisement = () => {
  return (
    <div>
      <MakeAd/>
      <MakeForm/>
      <div className='flex justify-between items-center w-full mt-10 p-6 bg-gray-100  dark:bg-gray-900'>
          <div className='flex w-full gap-x-2'>
            <h1 className='font-bold'>Status:</h1>
            <p>Start date missing</p>
          </div>
          <button className='px-3 py-[6px] bg-purple-600 border-2 rounded-sm border-purple-700 text-white text-xl transition-transform duration-300 hover:scale-105 active:bg-purple-700'>Publish</button>
      </div>
    </div>
  )
}

export default MakeAdvertisement