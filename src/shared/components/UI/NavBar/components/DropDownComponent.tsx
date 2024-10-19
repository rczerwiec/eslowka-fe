import { FaInfoCircle } from "react-icons/fa";
import { FaDatabase, FaDollarSign, FaRobot } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { TbFolderFilled, TbSquareRoundedLetterW } from "react-icons/tb";
import { MdOutlineImportContacts, MdOutlinePublishedWithChanges } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxFill } from "react-icons/ri";
import { PiRankingFill } from "react-icons/pi";

interface DropDownComponentInterface{
    signOut:()=>void;
     hoverOn:() => void;
    hoverOff:() => void;
}


function DropDownComponent({signOut,hoverOn,hoverOff}:DropDownComponentInterface){
    const navigate = useNavigate();
   
   
   
    return(
      <div onMouseEnter={hoverOn} onMouseLeave={hoverOff} className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
        <div className="py-1 lg:hidden" role="none">
       <a onClick={()=>{navigate('/app/folders')
        hoverOff();
       }} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><TbFolderFilled className="text-xl"/>Twoje Słówka</a>
       <a onClick={()=>{navigate('/app/ai')
        hoverOff();
       }} className="flex gap-2 block px-4 py-2 text-sm   text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><FaRobot className="text-xl"/>Chat AI</a>
       <a onClick={()=>{navigate('/app/ranking')
        hoverOff();
       }} className="flex gap-2 block px-4 py-2 text-sm   text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><PiRankingFill className="text-xl"/>Ranking</a>
       
       
       </div>
      <div className="py-1" role="none">
      <a onClick={()=>{navigate('/app/settings')
        hoverOff();
      }} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><IoMdSettings className="text-xl"/>Ustawienia</a>
      <a onClick={()=>{navigate('/app/importexport')
        hoverOff();
      }}  className="hidden flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><FaDatabase className="text-xl"/>Import/Export</a>
      </div>
      <div className="py-1" role="none">
      <a onClick={()=>{navigate('/app/contact')
        hoverOff();
      }} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><MdOutlineImportContacts className="text-xl"/>Kontakt/Pomoc</a>
      <a onClick={()=>{navigate('/app/rules')
        hoverOff();
      }} className="hidden flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><FaInfoCircle className="text-xl"/>Regulamin</a>
      <a onClick={()=>{navigate('/app/payments')
        hoverOff();
      }} className="hidden flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><FaDollarSign className="text-xl"/>Płatności</a>
      <a onClick={()=>{navigate('/app/updates')
        hoverOff();
      }} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><MdOutlinePublishedWithChanges  className="text-xl"/>Aktualizacje</a>
      </div>
      <div className="py-1" role="none">
      <a onClick={() => {signOut()}} className="flex gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-secondarylight hover:cursor-pointer" role="menuitem" tabIndex={-1} id="menu-item-0"><RiLogoutBoxFill className="text-xl"/>Wyloguj</a>
      </div>
    </div>
    )
}

export default DropDownComponent;


  