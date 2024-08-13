import { FaCheckCircle, FaFrownOpen } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";

const StatusBox = () => {
    return(
        <div className="flex flex-col items-center w-1/4 shadow-lg mx-2 rounded-xl text-sm font-thin font-inter bg-white z-10 h-40 border-secondary border-y-2 border-x-2">
        <div className="font-semibold font-inter text-base p-2">Statusy:</div>
        <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center text-red-600 text-xl size-8 border m-2 border-fifth rounded-xl">
                <FaFrownOpen />
              </div>
              <div className="font-thin text-xs w-14 text-center">
                Jest dla mnie kłopotliwe
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center text-orange-400 text-xl size-8 border m-2 border-fifth rounded-xl">
                <GrInProgress />
              </div>
              <div className="font-thin text-xs w-14 text-center">
                Wciąż się uczę
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center text-green-600 text-xl size-8 border m-2 border-fifth rounded-xl">
                <FaCheckCircle />
              </div>
              <div className="font-thin text-xs w-14 text-center">Znam</div>
            </div>
          </div>
        </div>
    )

}

export default StatusBox;