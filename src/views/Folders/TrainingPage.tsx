import { IoMdArrowRoundBack } from "react-icons/io";
import character1 from "../../shared/img/character1.svg";
import { useNavigate } from "react-router-dom";

const TrainingPage = () => {
    
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col w-full h-full">
      <div
          className="flex pl-4 h-20 w-3/4 items-center justify-between
                            text-black text-3xl font-medium"
        >
          <div>Ćwicz</div>
          <div
            onClick={() => {
              navigate("/folders");
            }}
            className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
          >
            <IoMdArrowRoundBack />
            <div className="text-lg">Powrót </div>
          </div>
        </div>
      </div>
      <img
        alt="character1"
        className="absolute z-0 w-1/5 bottom-0 right-0"
        src={character1}
      ></img>
    </>
  );
};

export default TrainingPage;
