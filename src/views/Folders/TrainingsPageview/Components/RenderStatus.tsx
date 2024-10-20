import { FaCheckCircle, FaFrownOpen } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";

interface IProps{
    changeStatus: (statusID:number) => void;
    status: number;
}

function RenderStatus({changeStatus, status}:IProps){
    const classNameOrangeIcon = "flex items-center justify-center text-orange-400 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border  rounded-xl"
    const classNameGreenIcon = "flex items-center justify-center text-green-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border border-mainrounded-xl"
    const classNameRedIcon = "flex items-center justify-center text-red-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border rounded-xl"
    const border =  " border-main border-x-2 border-y-2 "
    return (
      <div className="flex gap-16">
        <div
          className="flex flex-col items-center"
          onClick={() => {
            changeStatus(0);
          }}
        >
          {status === 0 ? (
            <div className={classNameRedIcon+border}>
              <FaFrownOpen />
            </div>
          ) : (
            <div className={classNameRedIcon}>
              <FaFrownOpen />
            </div>
          )}
          <div className="font-thin text-base w-14 text-center">
            Jest dla mnie kłopotliwe
          </div>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => {
            changeStatus(1);
          }}
        >
          {status === 1 ? (
            <div className={classNameOrangeIcon+border}>
              <GrInProgress />
            </div>
          ) : (
            <div className={classNameOrangeIcon}>
              <GrInProgress />
            </div>
          )}

          <div className="font-thin text-base w-14 text-center">
            Wciąż się uczę
          </div>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => {
            changeStatus(2);
          }}
        >
          {status === 2 ? (
            <div className={classNameGreenIcon+border}>
              <FaCheckCircle />
            </div>
          ) : (
            <div className={classNameGreenIcon}>
              <FaCheckCircle />
            </div>
          )}
          <div className="font-thin text-base w-14 text-center">Znam</div>
        </div>
      </div>
    );

}

export default RenderStatus;