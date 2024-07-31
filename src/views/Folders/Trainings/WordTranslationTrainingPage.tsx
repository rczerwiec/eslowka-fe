//ICONS & SVG
import { IoMdArrowRoundBack } from "react-icons/io";
import character1 from "../../../shared/img/character1.svg";
import { FaCheckCircle, FaFrownOpen } from "react-icons/fa";
import { FaFire, FaSkull } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Character from "../../../shared/components/Character";
import { useSelector } from "react-redux";
import { RootState, useFetchRandomWordsArrayQuery, useUpdateWordStatusMutation } from "../../../shared/store";
import { IWord } from "../../../shared/store/slices/FolderSlice";
import { useFormik } from "formik";

const WordTranslationTraining = () => {

  //FORMIK HOOK
  const formik = useFormik({
    initialValues: {
      translation: '',
    },
    onSubmit: values => {
      
    },
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [ButtonsState, setButtonsState] = useState(["text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight", "text-lg text-white hidden", "font-bold text-green-600 text-5xl hidden", "Dobrze!", "wpisz tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base"]);
  const [wordsState, setWordsState] = useState<IWord[]>([{word: "Ładowanie...", id: -1, translation: "Ładowanie...", repeated: 0, known: 0, folderId: -1, streak:0, reverseStreak: 0,}]);
  const folder = useSelector((state: RootState) => state.folderProfile);
  const navigate = useNavigate();
  const {isLoading, isSuccess, error, data} = useFetchRandomWordsArrayQuery(folder.id);
  const [updateStatus] = useUpdateWordStatusMutation();
  const inputRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const [currentWord, setCurrentWord] = useState<IWord>({word: "Ładowanie...", id: -1, translation: "Ładowanie...", repeated: 0, known: 0, folderId: -1, streak:0, reverseStreak: 0});
  const [status, setStatus] = useState<number>(-1);

  //IF INPUT IS NOT NULL - MAKE IT FOCUSED
  if(inputRef.current !== null && !isDisabled) {inputRef.current.focus();}
  else if(buttonRef.current !==null) {buttonRef.current.focus();}

  useEffect(() => {
    console.log("refresh")
    if (isLoading) {
      console.log("Ładowanie słów");
    } else if (error) {
      navigate("/folders");
    } else{
        setStatus(data[data.length -1].known);
        setWordsState(data);
        setCurrentWord(data[data.length -1])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  //UPDATE WORD IN DB
  const updateWord = async (updatedWord: IWord) => {
    await updateStatus({
      word: updatedWord,
      folderID: updatedWord.folderId,
    });
    console.log("Zaaktualizowano!", updatedWord.word);
  }

  //CHANGE STATUS
  const changeStatus = async (changeTo: number) => {
    setStatus(changeTo);
  }

  //CONFIRM TRANSLATION - ON_BUTTON_CLICK AFTER CHECK
  const checkTranslation = () => {
    
    let known = currentWord.known;
    if(status!== -1){
      known = status;
    }
    console.log(formik.values.translation);
    //IF IT'S CORRECT
    if (formik.values.translation.toLowerCase() === currentWord.translation.toLowerCase()) {

      if (currentWord.known === 0 && currentWord.streak === 4){
        known = 1;
      }
      if (currentWord.known === 1 && currentWord.streak === 10){
        known = 2;
      }

      const wordUpdated = {
        id: currentWord.id,
        word: currentWord.word,
        translation: currentWord.translation,
        repeated: currentWord.repeated + 1,
        known: known,
        folderId: currentWord.folderId,
        streak: currentWord.streak +1,
        reverseStreak: 0,
      };
      updateWord(wordUpdated);

      const newState = [...wordsState].splice(0, wordsState.length - 1);
      if (newState.length >= 1) {
        formik.values.translation = "";
        setIsDisabled(false);
        setWordsState(newState);
        setStatus(newState[newState.length - 1].known)
        setCurrentWord(newState[newState.length - 1]);
        setButtonsState(["text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight", "text-lg text-white hidden", "font-bold text-green-600 text-5xl hidden", "Dobrze!", "wpisz tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base"])
      } else {
        navigate("/folders");
      }
      //IF NOT CORRECT
    } else {
      const wordUpdated = {
        id: currentWord.id,
        word: currentWord.word,
        translation: currentWord.translation,
        repeated: currentWord.repeated + 1,
        known: known,
        folderId: currentWord.folderId,
        streak: 0,
        reverseStreak: currentWord.reverseStreak + 1,
      };
      updateWord(wordUpdated);
      let lastWord = currentWord;
      if(lastWord.reverseStreak >= 2 && known === 1){
        known = 0;
      }
      if(lastWord.reverseStreak >= 4 && known === 2){
        known = 1;
      }
      console.log(lastWord.reverseStreak);
      console.log(known);
      lastWord = { ...lastWord, repeated: lastWord.repeated + 1, reverseStreak: lastWord.reverseStreak + 1, streak: 0, known: known};
      let newState = [...wordsState].splice(0, wordsState.length - 1);
      newState = [lastWord].concat(newState);
      setIsDisabled(false);
      formik.values.translation = "";
      setWordsState(newState);
      setStatus(newState[newState.length - 1].known)
      setCurrentWord(newState[newState.length - 1]);
      setButtonsState(["text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight", "text-lg text-white hidden", "font-bold text-green-600 text-5xl hidden", "Dobrze!", "wpisz tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base"])
    }
  };

  //CHECK TRANSLATION - ON_BUTTON_CLICK BEFORE CHECK
  const setStatusBar = () => {
    if (formik.values.translation.toLocaleLowerCase() === wordsState[wordsState.length - 1].translation.toLocaleLowerCase()) {
      setButtonsState(["text-lg text-white hidden", "text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight","font-bold text-green-600 text-5xl", "Dobrze!", "Błędne tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base bg-green-200"]);
      setIsDisabled(true);
      buttonRef.current.focus();
    }
    else{ 
      setButtonsState(["text-lg text-white hidden", "text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight","font-bold text-red-600 text-5xl", "Źle!", "Błędne tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base bg-red-200"]);
      setIsDisabled(true);
    }
  }


let renderStatus;
if (status === 0) {
  renderStatus = (
    <div className="flex gap-16">
    <div className="flex flex-col items-center" onClick={() => {
      changeStatus(0);
    }}>
      <div className="flex items-center justify-center text-red-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border border-main border-x-2 border-y-2 rounded-xl">
        <FaFrownOpen />
      </div>
      <div className="font-thin text-base w-14 text-center">
        Jest dla mnie kłopotliwe
      </div>
    </div>
    <div className="flex flex-col items-center" onClick={() => {
      changeStatus(1);
    }}>
      <div className="flex items-center justify-center text-orange-400 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border  rounded-xl">
        <GrInProgress />
      </div>
      <div className="font-thin text-base w-14 text-center">
        Wciąż się uczę
      </div>
    </div>
    <div className="flex flex-col items-center" onClick={() => {
      changeStatus(2);
    }}>
      <div className="flex items-center justify-center text-green-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border border-mainrounded-xl">
        <FaCheckCircle />
      </div>
      <div className="font-thin text-base w-14 text-center">
        Znam
      </div>
    </div>
  </div>
  );
} else if (status === 1) {
  renderStatus = (
    <div className="flex gap-16">
    <div className="flex flex-col items-center" onClick={() => {
      changeStatus(0);
    }}>
      <div className="flex items-center justify-center text-red-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border rounded-xl">
        <FaFrownOpen />
      </div>
      <div className="font-thin text-base w-14 text-center">
        Jest dla mnie kłopotliwe
      </div>
    </div>
    <div className="flex flex-col items-center" onClick={() => {
      changeStatus(1);
    }}>
      <div className="flex items-center justify-center text-orange-400 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border border-main border-x-2 border-y-2  rounded-xl">
        <GrInProgress />
      </div>
      <div className="font-thin text-base w-14 text-center">
        Wciąż się uczę
      </div>
    </div>
    <div className="flex flex-col items-center" onClick={() => {
      changeStatus(2);
    }}>
      <div className="flex items-center justify-center text-green-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border rounded-xl">
        <FaCheckCircle />
      </div>
      <div className="font-thin text-base w-14 text-center">
        Znam
      </div>
    </div>
  </div>
  );
} else if (status===2){
  renderStatus = (
    <div className="flex gap-16">
    <div className="flex flex-col items-center" onClick={() => {
      changeStatus(0);
    }}>
      <div className="flex items-center justify-center text-red-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border  rounded-xl">
        <FaFrownOpen />
      </div>
      <div className="font-thin text-base w-14 text-center">
        Jest dla mnie kłopotliwe
      </div>
    </div>
    <div className="flex flex-col items-center" onClick={() => {
      changeStatus(1);
    }}>
      <div className="flex items-center justify-center text-orange-400 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border  rounded-xl">
        <GrInProgress />
      </div>
      <div className="font-thin text-base w-14 text-center">
        Wciąż się uczę
      </div>
    </div>
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center text-green-600 text-3xl size-12 hover:size-14 hover:text-4xl hover:cursor-pointer border border-main border-x-2 border-y-2 rounded-xl">
        <FaCheckCircle />
      </div>
      <div className="font-thin text-base w-14 text-center">
        Znam
      </div>
    </div>
  </div>
  );
}
else{
  renderStatus = (<div>Błąd ładowania statusu!</div>)
}

let streakIcon;
if (currentWord.streak>=5 && currentWord.streak < 15){
  streakIcon = <div className="flex flex-col justify-center items-center pt-3"><FaFire className=" text-2xl text-orange-600"/><div className="text-sm font-bold text-fifth">{currentWord.streak}</div></div>
}
else if (currentWord.streak>=15  && currentWord.streak<35){
  streakIcon = <div className="flex flex-col justify-center items-center pt-3"><FaFire className=" text-2xl text-zinc-400"/><div className="text-sm font-bold text-fifth">{currentWord.streak}</div></div>
}
else if (currentWord.streak>=35){
  streakIcon = <div className="flex flex-col justify-center items-center pt-3"><FaFire className=" text-2xl text-gold"/><div className="text-sm font-bold text-fifth">{currentWord.streak}</div></div>
}
else if(currentWord.reverseStreak>=5){
  streakIcon = <div className="flex flex-col justify-center items-center pt-3"><FaSkull className=" text-2xl text-red-600"/><div className="text-sm font-bold text-fifth">-{currentWord.reverseStreak}</div></div>
}
else{
  streakIcon = <></>
}


//BUTTON AND TRANSLATION INPUTS
let ButtonInput = (
  <div className="flex gap-4">
  <input
    className={ButtonsState[5]}
    placeholder={ButtonsState[4]}
    disabled={isDisabled}
    ref={inputRef}
    id="translation"
    name="translation"
    type="text"
    onChange={formik.handleChange}
    value={formik.values.translation}
  ></input>
  <div
    onClick={() => {}}
    className="relative left-0 flex items-center"
  >
    <button onClick={setStatusBar} className={ButtonsState[0]} >Sprawdź </button>
    <button onClick={checkTranslation} className={ButtonsState[1]} ref={buttonRef}>Dalej </button>
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
                {ButtonsState[3]} - {currentWord.translation}
              </div>
            <div className="flex items-center justify-center gap-2 font-thin text-5xl">            {currentWord.word}{streakIcon}
            </div>
       <form onSubmit={formik.handleSubmit}>
        {ButtonInput}         

     </form>
            {/* STATUSY SŁÓWKA */}
            <div className="flex flex-col justify-center items-center w-1/3 text-center font-inter gap-4">
              {renderStatus}
              <div className="flex text-center font-thin text-sm text-fifth">
                Wybrany status określa, jak często dane słówko będzie pojawiało
                się w ćwiczeniach. Status możesz zmieniać w dowolnej chwili, zmienia on się również wraz 
                z ilością powtórzeń danego słowa.
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
