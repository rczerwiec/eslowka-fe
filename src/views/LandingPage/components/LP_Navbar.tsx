import React, { useState } from 'react'
import logo from '../../../shared/img/eslowka.png'
import { navItems } from '../../../constants'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

function LP_Navbar () {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  }


  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 font-inter font-bold">
        <div className="container px-4 mx-auto relative text-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center flex-shrink-0">
                    <img className="h-10 w-10 mr-2" src={logo} alt="logo"/>
                    <span className="text-xl tracing-tight">Esłówka.pl</span>
                </div>
                <ul className='hidden lg:flex ml-14 space-x-12'>
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="hidden lg:flex justify-center space-x-6 items-center">
                  <a href="/login" className='py-2 px-3 border rounded-md'>
                    Zaloguj się
                  </a>
                  <a href="/signup" className='bg-gradient-to-r from-secondarylight to-secondary py-2 px-3 rounded-md'>
                    Rejestracja
                  </a>
                </div>
                <div className="lg:hidden md:flex flex-col justify-end">
                  <button onClick={toggleNavbar}>
                  {mobileDrawerOpen ?  <IoCloseSharp className='w-8 h-8'/> : <GiHamburgerMenu className='w-6 h-6'/>}
                  </button>
                </div>
            </div>
            {mobileDrawerOpen && (
              <div className="fixed right-0 z-20 bg-secondary w-full p-12 flex flex-col justify-center items-center lg:hidden">
                <ul>
                  {navItems.map((items,index) => (
                    <li key={index} className='mt-4'>
                      <a href={items.href} className='py-4'>
                        {items.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="flex space-x-6 mt-10">
                  <a href="/login" className='py-2 px-3 border rounded-md'>Zaloguj się</a>
                  <a href="/signup" className='py-2 px-3 bg-gradient-to-r from-orange-500 to-orange-800 rounded-md'>
                    Rejestracja
                  </a>
                </div>
 
              </div>
            )}
            
        </div>

    </nav>
  )
}

export default LP_Navbar
