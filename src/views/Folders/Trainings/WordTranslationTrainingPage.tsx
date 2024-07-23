//ICONS & SVG
import { IoMdArrowRoundBack } from "react-icons/io";
import character1 from "../../../shared/img/character1.svg";
import { FaCheckCircle, FaFrownOpen } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Character from "../../../shared/components/Character";

const WordTranslationTraining = () => {
  const [translation, setTranslation] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div
          className="flex pl-4 bg-fourth h-8  items-center
                            text-fifth text-sm font-medium"
        >
          Ćwicz
        </div>
        <div
          className="flex pl-4 h-20 w-3/4 items-center justify-between
                            text-black text-3xl font-medium"
        >
          <div>Słówko - Tłumaczenie</div>
          <div
            onClick={() => {
              navigate("/folders/training");
            }}
            className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
          >
            <IoMdArrowRoundBack />
            <div className="text-lg">Powrót </div>
          </div>
        </div>
        <div
          className="flex flex-col pl-4 mb-2 w-3/4 items-center gap-8
                text-black text-3xl font-medium"
        >
          <div className="font-bold text-red-600 text-5xl hidden">Źle!</div>
          <div className="font-bold text-green-600 text-5xl hidden">Dobrze!</div>
          <div className="font-thin text-5xl">Jablko</div>
          <div className="flex gap-4">
            <input
              className="bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base"
              placeholder="wpisz tłumaczenie"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
            ></input>
            <div
              onClick={() => {}}
              className="relative left-0 flex items-center h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
            >
              <div className="text-lg text-white">Sprawdź </div>
            </div>
          </div>
          {/* STATUSY SŁÓWKA */}
          <div className="flex flex-col justify-center items-center w-1/3 text-center font-inter gap-4">
            <div className="flex gap-16">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center text-red-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border border-fifth rounded-xl">
                  <FaFrownOpen />
                </div>
                <div className="font-thin text-base w-14 text-center">
                  Jest dla mnie kłopotliwe
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center text-orange-400 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border border-fifth rounded-xl">
                  <GrInProgress />
                </div>
                <div className="font-thin text-base w-14 text-center">
                  Wciąż się uczę
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center text-green-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border border-fifth rounded-xl">
                  <FaCheckCircle />
                </div>
                <div className="font-thin text-base w-14 text-center">Znam</div>
              </div>
            </div>
            <div className="flex text-center font-thin text-sm text-fifth">
              Wybrany status określa, jak często dane słówko będzie pojawiało
              się w ćwiczeniach. Status możesz zmieniać w dowolnej chwili.
            </div>
          </div>
        </div>
      </div>
      <Character alt="character1" className="absolute z-0 w-1/5 bottom-0 right-0" character={character1}/>
    </>
  );
};

export default WordTranslationTraining;
