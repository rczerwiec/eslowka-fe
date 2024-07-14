import { TbSquareRoundedLetterW } from "react-icons/tb";
import { TbFolderFilled } from "react-icons/tb";

const SideBar = () => {
    return(
        <div className="relative top-0 left-0 bg-main w-60 h-full">
            <div className="flex h-12 items-center pl-4 gap-2 hover:bg-third">
                <div>
                    <TbSquareRoundedLetterW className="text-2xl text-white"/>
                </div>
                <div className="text-white font-inter font-bold text-base">
                    Zbiory Słówek
                </div>
            </div>

            <div className="flex h-12 items-center pl-4 gap-2 hover:bg-third">
                <div>
                    <TbFolderFilled className="text-2xl text-white"/>
                </div>
                <div onClick={()=>{
                    
                }} className="text-white font-inter font-bold text-base">
                    Foldery
                </div>
            </div>
            
        </div>
    )
}

export default SideBar;