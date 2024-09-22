//ICONS & SVG
import { FaFire } from "react-icons/fa6";
import { FaUser, FaChevronDown, FaDatabase, FaInfoCircle, FaDollarSign } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdOutlineImportContacts, MdOutlinePublishedWithChanges } from "react-icons/md";

import {FC, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebas";
import { useSelector } from "react-redux";
import { RootState, useFetchUserQuery } from "../../store";
import { toast } from "react-toastify";

interface IhandleClick{
  signOut: () => void;
  userName: string;
  hoverOn: () => void;
  hoverOff: () => void;
  display: boolean;
}

const NavBar:FC<{}> = (props):JSX.Element => {
  const user = useSelector((state: RootState) => state.userProfile);
  const response = useFetchUserQuery(user.value);
  
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const [display, setDisplay] = useState(false);

  const hoverOn = () => {
      setDisplay(true)
  }

  const hoverOff = () => {
      setDisplay(false)
  }

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        toast.success("Pomyślnie wylogowano! Zostaniesz przekierowany!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
    }).catch((error) => {
    // An error happened
    toast.success("Błąd podczas wylogowywania!");
    });
  }

  let userData;
  let userName;
  if(response.isLoading){
    userName = "Ładowanie...";
  }
  else if(response.isError){
    userName = "Error";
  } 
  if (response.isSuccess) {
    userData = response.data;
    userName = response.data.userName;
  }

  console.log(userData);

  const handleClick = () => {
    setDropDown(!dropDown);
  }

  let dropDownClass: string = "flex hidden flex-col absolute z-20 text-white w-56 bg-secondary top-12 h- right-0 rounded-b-lg"
  if(dropDown) {
    dropDownClass = "flex flex-col absolute z-20 text-white w-56 bg-secondary top-12 h- right-0 rounded-b-lg"
  }



  return (
    <div>
      <div className="flex top-0 right-0 bg-gradient-to-r from-main to-secondary from-70% w-full h-14 justify-between items-center">
        <Logo />
        <div className="flex gap-2 h-full justify-center items-center">
          <PremiumButton/>
          <div
            className="h-full flex items-center justify-between
                              bg-secondary 
                      w-min:54 max-lg:w-screen gap-2 lg:rounded-tl-xl lg:rounded-bl-xl"
          >
            <Streak />
          <UserMenu signOut={handleLogout} userName={userName} hoverOn={hoverOn} hoverOff={hoverOff} display={display}/>   
          </div>
        </div>
      </div>
    </div>
  );
};

const Streak = () => {
  return (
    <div className="flex items-center ml-6 ">
      <div className="font-bold font-inter text-2xl">0</div>
      <div>
        <FaFire className="text-xl" />
      </div>
    </div>
  );
};

const UserMenu = ({signOut, userName, hoverOn, hoverOff, display}:IhandleClick) => {
  let shortUserName
  if(userName!=undefined){
    //shortUserName = userName.split('@')[0];
    shortUserName = userName;
  }
  else{
    shortUserName = "Ładowanie...";
  }



  return (
    <div className="flex items-center mr-4">
      <div className="font-bold font-inter text-xl text-white mr-2">{shortUserName}</div>
      <div>
        <FaUser className="text-2xl" />
      </div>
      <div>
        <FaChevronDown onMouseEnter={hoverOn} className="text-lg mr-2 hover:text-xl hover:cursor-pointer" />
        {display ? <DropDown signOut={signOut} hoverOff={hoverOff} hoverOn={hoverOn}/> : <></>}
      </div>

    </div>
  );
};
const Logo = () => {
  return (
    <div
      className="text-secondary font-bold font-inter text-3xl
        pl-4 max-lg:hidden"
    >
      ESłówka.pl
    </div>
  );
};

const PremiumButton = () => {
  const navigate = useNavigate();

    return (
        <div onClick={()=>{navigate('/app/premium')}}
        className="flex w-28  mr-5 h-2/3 justify-center items-center
                            bg-gold rounded-xl font-bold font-inter hover:cursor-pointer hover:bg-slate-200 max-lg:hidden"
      >
        Premium
      </div>
    )
}

const DropDown:FC<{signOut:()=>void, hoverOn:() => void, hoverOff:() => void}> = (props) => {
  const navigate = useNavigate();

  return(
    <div onMouseEnter={props.hoverOn} onMouseLeave={props.hoverOff} className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
    <div className="py-1" role="none">
    <a onClick={()=>{navigate('/app/settings')}} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><IoMdSettings className="text-xl"/>Ustawienia</a>
    <a onClick={()=>{navigate('/app/importexport')}}  className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><FaDatabase className="text-xl"/>Import/Export</a>
    </div>
    <div className="py-1" role="none">
    <a onClick={()=>{navigate('/app/contact')}} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><MdOutlineImportContacts className="text-xl"/>Kontakt/Pomoc</a>
    <a onClick={()=>{navigate('/app/rules')}} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><FaInfoCircle className="text-xl"/>Regulamin</a>
    <a onClick={()=>{navigate('/app/payments')}} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><FaDollarSign className="text-xl"/>Płatności</a>
    <a onClick={()=>{navigate('/app/updates')}} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><MdOutlinePublishedWithChanges  className="text-xl"/>Aktualizacje</a>
    </div>
    <div className="py-1" role="none">
    <a onClick={() => {props.signOut()}} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><RiLogoutBoxFill className="text-xl"/>Wyloguj</a>
    </div>
  </div>
  )
}


export default NavBar;
