import { TbSquareRoundedLetterW } from "react-icons/tb";
import { TbFolderFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();

    return(
        <div className="relative top-0 left-0 bg-main w-60 h-full">
            <div onClick={()=>{
                    navigate('/app/collections')
                }} className="flex h-12 items-center pl-4 gap-2 hover:bg-third hover:cursor-pointer">
                <div>
                    <TbSquareRoundedLetterW className="text-2xl text-white"/>
                </div>
                <div  className="text-white font-inter font-bold text-base">
                    Zbiory Słówek
                </div>
            </div>

            <div onClick={()=>{
                    navigate('/app/folders')
                }} className="flex h-12 items-center pl-4 gap-2 hover:bg-third hover:cursor-pointer">
                <div>
                    <TbFolderFilled className="text-2xl text-white"/>
                </div>
                <div  className="text-white font-inter font-bold text-base">
                    Foldery
                </div>
            </div>
            
        </div>
    )
}

export default SideBar;