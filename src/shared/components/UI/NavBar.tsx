//ICONS & SVG
import { FaFire } from "react-icons/fa6";
import { FaUser, FaChevronDown, FaDatabase, FaInfoCircle, FaDollarSign } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdOutlineImportContacts } from "react-icons/md";

import {FC, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebas";
import { useSelector } from "react-redux";
import { RootState, useFetchUserQuery } from "../../store";
import { toast } from "react-toastify";

interface IhandleClick{
  dropDownClick: () => void;
  userName: string;
}

const NavBar:FC<{}> = (props):JSX.Element => {
  const user = useSelector((state: RootState) => state.userProfile);
  const response = useFetchUserQuery(user.value);
  
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

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
        <div className="flex h-full justify-center items-center">
          <PremiumButton/>
          <div
            className="h-full flex items-center justify-between
                              bg-secondary 
                      w-min:54 gap-2 rounded-tl-xl rounded-bl-xl"
          >
            <Streak />
          <UserMenu dropDownClick={handleClick} userName={userName} />   
          <DropDown dropDownClass={dropDownClass} signOut={handleLogout}/>
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

const DropDown:FC<{dropDownClass: string, signOut: () => void}> = (props) => {
  return(
    <div className={props.dropDownClass}>
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

    <div onClick={()=>props.signOut()} className="flex pl-4 gap-2 h-12 items-center text-main hover:bg-secondarylight hover:cursor-pointer font-inter">
      <RiLogoutBoxFill className="text-xl"/>
      <div className="text-lg">Wyloguj</div>
    </div>

  </div>
  )
}

const UserMenu = ({dropDownClick, userName}:IhandleClick) => {
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
