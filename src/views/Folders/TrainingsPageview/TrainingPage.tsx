//ICONS & SVG
import { IoMdArrowRoundBack } from "react-icons/io";
import character1 from "../../../shared/img/character1.svg";

import { useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import Character from "../../../shared/components/Character";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store";
import { useEffect } from "react";

const TrainingPage = () => {
  const navigate = useNavigate();
  const folder = useSelector((state: RootState) => state.folderProfile);
  useEffect(()=>{
    if(folder.id===undefined){
      navigate("/app/folders");
    }
  },[])

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div
          className="flex pl-4 bg-fourth h-8  items-center
                            text-fifth text-sm font-medium"
        >
          Tryby
        </div>
        <div
          className="flex pl-4 h-20 w-3/4 items-center justify-between
                            text-black text-3xl font-medium"
        >
          <div>Wybierz Tryb</div>
          <div
            onClick={() => {
              navigate("/app/folders");
            }}
            className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
          >
            <IoMdArrowRoundBack />
            <div className="text-lg">Powrót </div>
          </div>
          </div>
          <div
              className="flex flex-col pl-4 mb-2 items-left
                text-black text-3xl font-medium"
            >
              <div className="flex flex-col  gap-4 w-3/4 justify-center">
                <div className="flex items-center justify-between p-2 bg-fourth rounded-lg shadow-lg  hover:bg-secondarylight hover:cursor-pointer">
                  <button
                    onClick={() => {
                      navigate("/app/folders/training/play");
                    }}
                    className="flex items-center w-full gap-4 hover:cursor-pointer"
                  >
                    <FaPlayCircle className="bg-main text-white rounded-md" />
                    <div className="text-xl">Słówko - Tłumaczenie</div>
                  </button>
                  <div className="flex gap-4 mr-4"></div>
                </div>
                <div className="flex items-center justify-between p-2 bg-fourth rounded-lg shadow-lg  hover:bg-secondarylight hover:cursor-pointer">
                  <button
                    onClick={() => {
                      navigate("/app/folders/training/playReversed");
                    }}
                    className="flex items-center w-full gap-4 hover:cursor-pointer"
                  >
                    <FaPlayCircle className="bg-main text-white rounded-md" />
                    <div className="text-xl">Słówko - Tłumaczenie (Odwrotne)</div>
                  </button>
                  <div className="flex gap-4 mr-4"></div>
                </div>
              </div>
            </div>
      </div>
      <Character alt="character1" className="absolute z-0 w-1/5 bottom-0 right-0" character={character1}/>
    </>
  );
};

export default TrainingPage;
