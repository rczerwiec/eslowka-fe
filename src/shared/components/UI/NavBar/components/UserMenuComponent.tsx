import { FC } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import DropDownComponent from "./DropDownComponent";


interface UserMenuComponentInterface{
    signOut: () => void;
    userName: string;
    hoverOn: () => void;
    hoverOff: () => void;
    display: boolean;
  }

function UserMenuComponent({signOut, userName, hoverOn, hoverOff, display}: UserMenuComponentInterface){
    let shortUserName;
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
          {display ? <DropDownComponent signOut={signOut} hoverOff={hoverOff} hoverOn={hoverOn}/> : <></>}
        </div>
  
      </div>
    );
  };

  export default UserMenuComponent;