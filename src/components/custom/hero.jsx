import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='w-full min-h-[50vh] flex items-center '>
        <div>
            <h1
            className='font-extrabold text-[50px] text-left -mt-30 ml-10'><span className='text-orange-500 block'>Pack Dreams! We’ll Plan the Rest!!</span>
            <span className='block whitespace-nowrap text-black text-[48px]'>From someday to departure days!!</span>
            </h1>
            <p className='ml-10 mt-5 text-[20px] font-bold italic'>
                From destination ideas to day-by-day plans — instantly.
                <br/>
                Everything organized, timed, and ready to go.
            </p>
            <div className='ml-10 mt-9 '>
            <Link to='/create-trip'>
                <Button className="px-10 py-6 text-lg font-semibold rounded-xl bg-orange-500">
                    Get Started - It's Free
                </Button>
            </Link>
            </div>
        </div>
        <div className="relative ml-16 mr-7">
  
            {/* Black circle behind */}
            <div className="absolute z-0 top-10 left-10 w-[380px] h-[380px] bg-orange-500 rounded-full"></div>

            {/* Girl image */}
            <img
                src="/hero.png"
                alt="Travel illustration"
                className="w-[450px] relative z-10"
            />

        </div>

    </div>
  )
}

export default Hero