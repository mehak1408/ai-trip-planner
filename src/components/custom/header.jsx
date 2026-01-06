import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3 flex justify-between items-center sticky top-0 z-50 w-full bg-gradient-to-br from-blue-200 to-blue-100'>
        <img
            src="/logo.svg"
            alt="Logo"
            className="h-10 w-auto"
        />
    </div>
  )
}

export default Header