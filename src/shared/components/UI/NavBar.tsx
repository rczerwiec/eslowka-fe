//ICONS & SVG
import { FaFire } from "react-icons/fa6";
import { FaUser, FaChevronDown, FaDatabase, FaInfoCircle, FaDollarSign } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdOutlineImportContacts } from "react-icons/md";

import {useState } from "react";

interface IhandleClick{
  dropDownClick: () => void;
}

interface IDropDownClass{
  dropDownClass: string;
}

const NavBar = () => {
  const [dropDown, setDropDown] = useState(false);

  const handleClick = () => {
    setDropDown(!dropDown);
  }

  let dropDownClass = "flex hidden flex-col absolute z-20 text-white w-56 bg-secondary top-12 h- right-0 rounded-b-lg"
  if(dropDown) {
    dropDownClass = "flex flex-col absolute z-20 text-white w-56 bg-secondary top-12 h- right-0 rounded-b-lg"
  }



  return (
    <div>
      <div className="flex top-0 right-0 bg-gradient-to-r from-main to-secondary from-70% w-full h-14 justify-between items-center">
        <Logo />
        <div className="flex h-full justify-center items-center">
          <PremiumButton/>
          <div
            className="h-full flex items-center justify-between
                              bg-secondary 
                              w-56 rounded-tl-xl rounded-bl-xl"
          >
            <Streak />
          <UserMenu dropDownClick={handleClick} />   
          <DropDown dropDownClass={dropDownClass}/>
          </div>
        </div>
      </div>

    </div>
  );
};

const Streak = () => {
  return (
    <div className="flex items-center ml-6 ">
      <div className="font-bold font-inter text-2xl">3</div>
      <div>
        <FaFire className="text-xl" />
      </div>
    </div>
  );
};

const DropDown = ({dropDownClass}: IDropDownClass) => {
  return(
    <div className={dropDownClass}>
    <div className="flex pl-4 gap-2 h-12 items-center text-main hover:bg-secondarylight hover:cursor-pointer font-inter">
      <IoMdSettings className="text-xl"/>
      <div className="text-lg">Ustawienia</div>
    </div>

    <div className="flex pl-4 gap-2 h-12 items-center text-main hover:bg-secondarylight hover:cursor-pointer font-inter">
      <FaDollarSign className="text-xl"/>
      <div className="text-lg">Płatności</div>
    </div>

    <div className="flex pl-4 gap-2 h-12 items-center text-main hover:bg-secondarylight hover:cursor-pointer font-inter">
      <FaDatabase className="text-xl"/>
      <div className="text-lg">Import/Export</div>
    </div>

    <div className="flex pl-4 gap-2 h-12 items-center text-main hover:bg-secondarylight hover:cursor-pointer font-inter">
      <MdOutlineImportContacts className="text-xl"/>
      <div className="text-lg">Kontakt</div>
    </div>

    <div className="flex pl-4 gap-2 h-12 items-center text-main hover:bg-secondarylight hover:cursor-pointer font-inter">
      <FaInfoCircle className="text-xl"/>
      <div className="text-lg">Regulamin</div>
    </div>

    <div className="flex pl-4 gap-2 h-12 items-center text-main hover:bg-secondarylight hover:cursor-pointer font-inter">
      <RiLogoutBoxFill className="text-xl"/>
      <div className="text-lg">Wyloguj</div>
    </div>

  </div>
  )
}

const UserMenu = ({dropDownClick}:IhandleClick) => {
  return (
    <div className="flex items-center mr-4">
      <div className="font-bold font-inter text-xl text-white mr-2">Radek</div>
      <div>
        <FaUser className="text-2xl" />
      </div>
      <div>
        <FaChevronDown onClick={dropDownClick} className="text-lg mr-2 hover:text-xl hover:cursor-pointer" />
      </div>
    </div>
  );
};
const Logo = () => {
  return (
    <div
      className="text-secondary font-bold font-inter text-3xl
        pl-4"
    >
      ESłówka.pl
    </div>
  );
};

const PremiumButton = () => {
    return (
        <div
        className="flex w-28  mr-5 h-2/3 justify-center items-center
                            bg-gold rounded-xl font-bold font-inter hover:cursor-pointer"
      >
        Premium
      </div>
    )
}

export default NavBar;
