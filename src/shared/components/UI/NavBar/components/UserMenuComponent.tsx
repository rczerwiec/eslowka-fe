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
        <div className="font-bold font-inter text-xl text-white mr-2">{shortUserName.slice(0,12)}</div>
        <div onMouseEnter={hoverOn} className="flex pl-2 hover:cursor-pointer justify-center items-center">
        <div>
          <FaUser className="text-3xl" />
        </div>
        <div>
          <FaChevronDown className="text-xl mr-2 " />
          {display ? <DropDownComponent signOut={signOut} hoverOff={hoverOff} hoverOn={hoverOn}/> : <></>}
        </div>
        </div>
  
      </div>
    );
  };

  export default UserMenuComponent;