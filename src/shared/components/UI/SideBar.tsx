import { TbSquareRoundedLetterW } from "react-icons/tb";
import { TbFolderFilled } from "react-icons/tb";
import { PiRankingFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa6";

const SideBar = () => {
    const navigate = useNavigate();

    return(
        <div className="relative top-0 left-0 bg-main w-60 h-full max-lg:hidden">
            <div className="flex h-full flex-col justify-between">
                <div>
                        <div onClick={()=>{
                            navigate('/app/collections')
                        }} className="flex h-12 items-center pl-4 gap-2 hover:bg-third hover:cursor-pointer hidden">
                        <div>
                            <TbSquareRoundedLetterW className="text-2xl text-white"/>
                        </div>
                        <div  className="text-white font-inter font-bold text-base">
                            Kolekcje Słówek
                        </div>
                    </div>

                    <div onClick={()=>{
                            navigate('/app/folders')
                        }} className="flex h-12 items-center pl-4 gap-2 hover:bg-third hover:cursor-pointer">
                        <div>
                            <TbFolderFilled className="text-2xl text-white"/>
                        </div>
                        <div  className="text-white font-inter font-bold text-base">
                            Moje Foldery
                        </div>
                    </div>
                    <div onClick={()=>{
                            navigate('/app/ai')
                        }} className="flex h-12 items-center pl-4 gap-2 hover:bg-third hover:cursor-pointer">
                        <div>
                            <FaRobot className="text-2xl text-white"/>
                        </div>
                        <div  className="text-white font-inter font-bold text-base">
                            Chat AI
                        </div>
                    </div>
                    <div onClick={()=>{
                            navigate('/app/ranking')
                        }} className="flex h-12 items-center pl-4 gap-2 hover:bg-third hover:cursor-pointer">
                        <div>
                            <PiRankingFill className="text-2xl text-white"/>
                        </div>
                        <div  className="text-white font-inter font-bold text-base">
                            Ranking
                        </div>
                    </div>
                </div>
                <div className="text-white p-2 text-xs">
                    1.0.4 alpha
                </div>
            </div>

            
        </div>
    )
}

export default SideBar;