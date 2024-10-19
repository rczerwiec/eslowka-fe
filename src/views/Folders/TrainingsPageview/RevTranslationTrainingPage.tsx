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
import { RootState, useFetchRandomWordsArrayQuery, useFetchUserQuery, useUpdateUserDatesMutation, useUpdateUserStatsMutation, useUpdateWordStatusMutation } from "../../../shared/store";
import { IWord } from "../../../shared/store/slices/FolderSlice";
import { useFormik } from "formik";
import CheckTranslationUtil from "./Utils/CheckTranslationUtil";
import FirstTitle from "../../../shared/components/FirstTitle";

const RevTranslationTraining = () => {
  const user = useSelector((state: RootState) => state.userProfile);

  //FORMIK HOOK
  const formik = useFormik({
    initialValues: {
      translation: '',
    },
    onSubmit: values => {
    },
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [ButtonsState, setButtonsState] = useState(["text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight", "text-lg text-white hidden", "font-bold text-green-600 text-5xl hidden", "Dobrze!", "wpisz tłumaczenie!", "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base  max-lg:w-60"]);
  const [wordsState, setWordsState] = useState<IWord[]>([{word: "Ładowanie...", id: -1, translation: "Ładowanie...",note: "", repeated: 0, known: 0, folderId: -1, streak:0, reverseStreak: 0,}]);
  const folder = useSelector((state: RootState) => state.folderProfile);
  const navigate = useNavigate();
  const {isLoading, isSuccess, error, data} = useFetchRandomWordsArrayQuery({folderID:folder.id, userID: user.value});
  const [updateStatus] = useUpdateWordStatusMutation();
  const [updateStats] = useUpdateUserStatsMutation();
  const [updateDates] = useUpdateUserDatesMutation();
  const response = useFetchUserQuery(user.value);
  const inputRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const [currentWord, setCurrentWord] = useState<IWord>({word: "Ładowanie...", id: -1, translation: "Ładowanie...", note: "", repeated: 0, known: 0, folderId: -1, streak:0, reverseStreak: 0});
  const [status, setStatus] = useState<number>(-1);

  //IF INPUT IS NOT NULL - MAKE IT FOCUSED
  if(inputRef.current !== null && !isDisabled) {inputRef.current.focus();}
  else if(buttonRef.current !==null) {buttonRef.current.focus();}

  useEffect(() => {
    if(folder.id===undefined){
      navigate("/app/folders");
    }
    else if(folder.words===undefined){
      navigate("/app/folders");
    }
    else if (isLoading) {
    } else if (error) {
      navigate("/app/folders");
    } else{
        if(data.length === 0){
          navigate("/app/folders");
        }
        else{
          setStatus(data[data.length -1].known);
          setWordsState(data);
          setCurrentWord(data[data.length -1])
        }

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  let userName = "Ładowanie...";
  let streak = 0;
  let level = 0;
  let reversed = false;
  let experience = 0;
  let practiceDate = new Date();
  if (response.isSuccess) {
    streak = response.data.streak;
    level = response.data.level;
    experience = response.data.experience;
    userName = response.data.userName;
    practiceDate = response.data.practiceDate;
  }
    //UPDATE WORD IN DB
    const updateWord = async (updatedWord: IWord) => {
      await updateDates({datesToUpdate: {  
        practiceDate: practiceDate,
        onLogin: false,
        currentStreak: streak,}, userID: user.value});

      await updateStatus({updatedWord:{
        word: updatedWord,
        folderID: updatedWord.folderId,
      }, userID: user.value});
    }

    const updateUserStats = async (value:number) => {
      const newExperience = experience+value;
      await updateStats({experience: newExperience, userID: user.value});
    }

  //CHANGE STATUS
  const changeStatus = async (changeTo: number) => {
    setStatus(changeTo);
  }


  //CHECK TRANSLATION - ON_BUTTON_CLICK BEFORE CHECK
  const setStatusBar = () => {

    if (formik.values.translation.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, "l") === wordsState[wordsState.length - 1].word.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, "l")) {
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
    <button onClick={()=> {
      CheckTranslationUtil(updateWord, updateUserStats ,currentWord, status, formik, wordsState, navigate, setWordsState,setIsDisabled, setStatus, setCurrentWord, setButtonsState, reversed);
    }} className={ButtonsState[1]} ref={buttonRef}>Dalej </button>
  </div>
</div>)

    return (
      <>
        <div className="flex flex-col w-full h-full">
        <FirstTitle>Ćwicz Słówka</FirstTitle>
          <div
            className="flex px-4 h-20 w-3/4 max-lg:w-full items-center justify-between
                            text-black text-3xl font-medium"
          >
            <div className="max-lg:text-2xl">Słówko - Tłumaczenie (Odwrotne)</div>
            <div
              onClick={() => {
                navigate("/app/folders/training");
              }}
              className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
            >
              <IoMdArrowRoundBack />
              <div className="text-lg">Powrót </div>
            </div>
          </div>
          <div
            className="flex flex-col px-4 mb-2 w-3/4 max-lg:w-full items-center gap-8
                text-black text-3xl font-medium"
          >

        <div className={ButtonsState[2]}>
                {ButtonsState[3]} - {currentWord.word}
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex items-center justify-center gap-2 font-thin text-5xl">            {currentWord.translation}{streakIcon}
              </div>
              <div className="text-sm font-inter font-thin text-fifth">{currentWord.note}</div>
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
          className="absolute z-0 w-1/5 bottom-0 right-0 max-lg:hidden"
          character={character1}
        />
      </>
    );
};

export default RevTranslationTraining;
