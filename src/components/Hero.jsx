import React from 'react'

function Hero() {
  return (
    <div className='relative h-[600px] w-full'>
  <img className='absolute inset-0 w-full h-full object-cover' src='/hero.jpg'/>
    
    <div className='absolute inset-0 bg-black/50'></div>
  
    </div>
  )
}

export default Hero