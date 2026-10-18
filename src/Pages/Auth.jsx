import React from 'react'
import authImage from '../assets/authImage.png'
import AuthCard from '../components/AuthCard'


const Auth = () => {
  return (
    <div className='flex h-screen items-center justify-center  bg-gray-50 p-6'>
          
          <div className='flex shadow-xl rounded-2xl'>
         <div className='hidden   md:block '>
                 <img src={authImage} alt="Auth" className='h-auto w-full object-contain'/>
         </div>
          <div className='bg-white max-w-md '>
              <AuthCard/>
          </div>
          </div>
        
    </div>
  )
}

export default Auth