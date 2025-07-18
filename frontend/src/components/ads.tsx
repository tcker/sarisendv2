import React from 'react'
import hand from '@/assets/peaceSign.png'

export default function Ads() {
  return (
    <main className='flex items-center justify-between mx-4 mb-5 py-4 bg-green-400 rounded-lg'>
      <span className='flex-col ml-6 text-black'>
        <p className='font-bold'>For you</p>
        <h1 className='text-md'>Enjoy a free transaction for your first pay!</h1>
      </span>
      <div className='relative ml-6 mr-4'>
        <div className='w-16 h-14 bg-green-800 rounded-full flex items-center justify-center'>
        </div>
        <img src={hand.src} className='absolute top-[-40px] w-38 h-28 object-contain z-10'/>
      </div>
    </main>
  )
}
