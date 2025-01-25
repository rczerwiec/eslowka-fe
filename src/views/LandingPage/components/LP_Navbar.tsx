import React, { useState } from "react";
import logo from "../../../shared/img/eslowka.png";
import { navItems } from "../../../constants";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

function LP_Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 bg-white shadow-md backdrop-blur-lg border-b border-gray-200 font-inter font-bold">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
            <span className="text-xl font-extrabold text-gray-800 tracking-tight">
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
          <div className="fixed inset-0 z-40 bg-white shadow-lg p-6 flex flex-col items-center lg:hidden">
            <ul className="space-y-4 text-gray-700">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="block py-2 text-lg hover:text-secondary transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col space-y-4 mt-8">
              <a
                href="/login"
                className="py-2 px-4 border border-secondary text-gray-800 rounded-md hover:bg-gray-100 transition"
              >
                Zaloguj się
              </a>
              <a
                href="/signup"
                className="py-2 px-4 bg-gradient-to-r from-secondarylight to-secondary text-white rounded-md hover:shadow-lg transition"
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
