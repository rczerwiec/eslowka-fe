import React, { useState, useEffect, useRef } from "react";
import logo from "../../../shared/img/eslowka.png";
import { navItems } from "../../../constants";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function LP_Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null); // Typ referencji określony jako HTMLDivElement
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) && // Zapewnienie zgodności typu
        mobileDrawerOpen
      ) {
        setMobileDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [mobileDrawerOpen]);

  return (
    <nav className="sticky top-0 z-50 py-3 bg-white shadow-md backdrop-blur-lg border-b border-gray-200 font-inter font-bold">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
            <span onClick={()=>{
              navigate('/')
            }} className="text-xl font-extrabold text-gray-800 tracking-tight cursor-pointer">
              Esłówka.pl
            </span>
          </div>
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex ml-14 space-x-8 text-gray-700">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="hover:text-secondary transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Desktop Buttons */}
          <div className="hidden lg:flex justify-center space-x-4 items-center">
            <a
              href="/login"
              className="py-2 px-4 border border-secondary text-gray-800 rounded-md hover:bg-gray-100 transition"
            >
              Zaloguj się
            </a>
            <a
              href="/signup"
              className="bg-gradient-to-r from-secondarylight to-secondary text-white py-2 px-4 rounded-md hover:shadow-lg transition"
            >
              Rejestracja
            </a>
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <IoCloseSharp className="w-8 h-8 text-gray-800" />
              ) : (
                <GiHamburgerMenu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileDrawerOpen && (
          <div
            ref={drawerRef} // Attach ref to the drawer
            className="fixed inset-0 z-60 bg-white min-h-[450px] shadow-lg p-6 flex flex-col items-center lg:hidden"
          >
            <ul className="space-y-4 text-gray-700 w-full">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="block py-2 text-lg hover:text-secondary transition text-center"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col space-y-4 mt-8 w-full">
              <a
                href="/login"
                className="py-2 px-4 border border-secondary text-gray-800 rounded-md hover:bg-gray-100 transition text-center"
              >
                Zaloguj się
              </a>
              <a
                href="/signup"
                className="py-2 px-4 bg-gradient-to-r from-secondarylight to-secondary text-white rounded-md hover:shadow-lg transition text-center"
              >
                Rejestracja
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default LP_Navbar;
