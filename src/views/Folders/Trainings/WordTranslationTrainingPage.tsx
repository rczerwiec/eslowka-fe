//ICONS & SVG
import { IoMdArrowRoundBack } from "react-icons/io";
import character1 from "../../../shared/img/character1.svg";
import { FaCheckCircle, FaFrownOpen } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Character from "../../../shared/components/Character";
import { useSelector } from "react-redux";
import { RootState, useFetchRandomWordsArrayQuery, useUpdateWordStatusMutation } from "../../../shared/store";
import { IWord } from "../../../shared/store/slices/FolderSlice";

const WordTranslationTraining = () => {
  const [translation, setTranslation] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);
  const [ButtonsState, setButtonsState] = useState(["text-lg text-white", "text-lg text-white hidden", "font-bold text-green-600 text-5xl hidden", "Dobrze!", "wpisz tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base"]);
  const [wordsState, setWordsState] = useState<IWord[]>([{word: "Ładowanie...", id: -1, translation: "Ładowanie...", repeated: 0, known: 0, folderId: -1}]);
  const folder = useSelector((state: RootState) => state.folderProfile);
  //getRandomWordFromFolder
  const navigate = useNavigate();
  const {isLoading, isSuccess, error, data} = useFetchRandomWordsArrayQuery(folder.id);
  
  useEffect(() => {
    if (isLoading) {
      console.log("Ładowanie słów");
    } else if (error) {
      navigate("/folders");
    } else{
        setWordsState(data);
        console.log("SLOWKA:",wordsState);
    }
  }, [isSuccess])

  const [updateStatus] = useUpdateWordStatusMutation();
  const updateWord = async (updatedWord: IWord) => {
    await updateStatus({
      word: updatedWord,
      folderID: updatedWord.folderId,
    });
    console.log("Zaaktualizowano!", updatedWord.word);
  }

  const checkTranslation = () => {
    const wordUpdated = {
      id: wordsState[wordsState.length - 1].id,
      word: wordsState[wordsState.length - 1].word,
      translation: wordsState[wordsState.length - 1].translation,
      repeated: wordsState[wordsState.length - 1].repeated + 1,
      known: wordsState[wordsState.length - 1].known,
      folderId: wordsState[wordsState.length - 1].folderId,
    };
    updateWord(wordUpdated);

    //IF IT'S CORRECT
    if (translation === wordsState[wordsState.length - 1].translation) {
      const newState = [...wordsState].splice(0, wordsState.length - 1);
      if (newState.length >= 1) {
        setIsDisabled(false);
        setWordsState(newState);
        setTranslation("");
        setButtonsState(["text-lg text-white", "text-lg text-white hidden", "font-bold text-green-600 text-5xl hidden", "Dobrze!", "wpisz tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base"])
      } else {
        navigate("/folders");
      }
      //IF NOT CORRECT
    } else {
      let lastWord = wordsState[wordsState.length - 1];
      lastWord = { ...lastWord, repeated: lastWord.repeated + 1 };
      let newState = [...wordsState].splice(0, wordsState.length - 1);
      newState = [lastWord].concat(newState);
      setIsDisabled(false);
      setWordsState(newState);
      setTranslation("");
      setButtonsState(["text-lg text-white", "text-lg text-white hidden", "font-bold text-green-600 text-5xl hidden", "Dobrze!", "wpisz tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base"])
    }
  };

  const setStatusBar = () => {
    if (translation === wordsState[wordsState.length - 1].translation) {
      setButtonsState(["text-lg text-white hidden", "text-lg text-white","font-bold text-green-600 text-5xl", "Dobrze!", "Błędne tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base bg-green-200"]);
      setIsDisabled(true);
    }
    else{
      setButtonsState(["text-lg text-white hidden", "text-lg text-white","font-bold text-red-600 text-5xl", "Źle!", "Błędne tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base bg-red-200"]);
      setIsDisabled(true);
    }
  }

  
  let ButtonInput = (
    <div className="flex gap-4">
    <input
      className={ButtonsState[5]}
      placeholder={ButtonsState[4]}
      disabled={isDisabled}
      value={translation}
      onChange={(e) => setTranslation(e.target.value)}
    ></input>
    <div
      onClick={() => {}}
      className="relative left-0 flex items-center h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
    >
      <button onClick={setStatusBar} className={ButtonsState[0]}>Sprawdź </button>
      <button onClick={checkTranslation} className={ButtonsState[1]}>Dalej </button>
    </div>
  </div>)

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

        <div className={ButtonsState[2]}>
                {ButtonsState[3]}
              </div>
            <div className="font-thin text-5xl">            {wordsState[wordsState.length-1].word}</div>
            {ButtonInput}
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
                  <div className="font-thin text-base w-14 text-center">
                    Znam
                  </div>
                </div>
              </div>
              <div className="flex text-center font-thin text-sm text-fifth">
                Wybrany status określa, jak często dane słówko będzie pojawiało
                się w ćwiczeniach. Status możesz zmieniać w dowolnej chwili.
              </div>
            </div>
          </div>
        </div>
        <Character
          alt="character1"
          className="absolute z-0 w-1/5 bottom-0 right-0"
          character={character1}
        />
      </>
    );
};

export default WordTranslationTraining;
