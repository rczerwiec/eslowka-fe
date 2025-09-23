//ICONS & SVG
import { IoMdArrowRoundBack } from "react-icons/io";
import character1 from "../../../../../shared/img/character1.svg";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Character from "../../../../../shared/components/Character";
import { useSelector } from "react-redux";
import {
  RootState,
  useGetRandomFolderWordsQuery,
  useFetchUserQuery,
  useUpdateUserDatesMutation,
  useUpdateUserStatsMutation,
  useUpdateWordStatusAndStreakMutation,
} from "../../../../../shared/store";
import { IWord } from "../../../../../shared/store/slices/FolderSlice";
import { useFormik } from "formik";
import CheckTranslationUtil from "../../Utils/CheckTranslationUtil";
import FirstTitle from "../../../../../shared/components/FirstTitle";
import MainTitle from "../../../../../shared/components/MainTitle";
import Button from "../../../../../shared/components/Button";
import RenderStatus from "../../Components/RenderStatus";
import IconStreak from "../../Components/IconStreak";

const TextTrainingReversed = () => {
  const user = useSelector((state: RootState) => state.userProfile);

  //FORMIK HOOK
  const formik = useFormik({
    initialValues: {
      translation: "",
    },
    onSubmit: (values) => {},
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [ButtonsState, setButtonsState] = useState([
    "text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight",
    "text-lg text-white hidden",
    "font-bold text-green-600 text-5xl hidden",
    "Dobrze!",
    "wpisz tłumaczenie!",
    "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base  max-lg:w-60",
  ]);
  const [wordsState, setWordsState] = useState<IWord[]>([
    {
      word: "Ładowanie...",
      id: -1,
      translation: "Ładowanie...",
      note: "",
      repeated: 0,
      known: 0,
      folderId: -1,
      streak: 0,
      reverseStreak: 0,
    },
  ]);
  const folder = useSelector((state: RootState) => state.folderProfile);
  const navigate = useNavigate();
  const { isLoading, isSuccess, error, data } = useGetRandomFolderWordsQuery({
    folderID: folder.id,
    userID: user.value,
  });
  const [updateStatus] = useUpdateWordStatusAndStreakMutation();
  const [updateStats] = useUpdateUserStatsMutation();
  const [updateDates] = useUpdateUserDatesMutation();
  const response = useFetchUserQuery(user.value);
  const inputRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const [currentWord, setCurrentWord] = useState<IWord>({
    word: "Ładowanie...",
    id: -1,
    translation: "Ładowanie...",
    note: "",
    repeated: 0,
    known: 0,
    folderId: -1,
    streak: 0,
    reverseStreak: 0,
  });
  const [status, setStatus] = useState<number>(-1);

  //IF INPUT IS NOT NULL - MAKE IT FOCUSED
  if (inputRef.current !== null && !isDisabled) {
    inputRef.current.focus();
  } else if (buttonRef.current !== null) {
    buttonRef.current.focus();
  }

  useEffect(() => {
    if (folder.id === undefined) {
      navigate("/app/folders");
    } else if (folder.words === undefined) {
      navigate("/app/folders");
    } else if (isLoading) {
    } else if (error) {
      navigate("/app/folders");
    } else {
      if (data.length === 0) {
        navigate("/app/folders");
      } else {
        setStatus(data[data.length - 1].known);
        setWordsState(data);
        setCurrentWord(data[data.length - 1]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  let streak = 0;
  let reversed = false;
  let experience = 0;
  let practiceDate = new Date();
  if (response.isSuccess) {
    streak = response.data.streak;
    experience = response.data.experience;
    practiceDate = response.data.practiceDate;
  }
  //UPDATE WORD IN DB
  const updateWord = async (updatedWord: IWord) => {
    await updateDates({
      datesToUpdate: {
        practiceDate: practiceDate,
        onLogin: false,
        currentStreak: streak,
      },
      userID: user.value,
    });

    await updateStatus({
      updatedWord: {
        word: updatedWord,
        folderID: updatedWord.folderId,
      },
      userID: user.value,
    });
  };

  const updateUserStats = async (value: number) => {
    const newExperience = experience + value;
    await updateStats({ experience: newExperience, userID: user.value });
  };

  //CHANGE STATUS
  const changeStatus = async (changeTo: number) => {
    setStatus(changeTo);
  };

  //CHECK TRANSLATION - ON_BUTTON_CLICK BEFORE CHECK
  const setStatusBar = () => {
    if (
      formik.values.translation
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\u0142/g, "l") ===
      wordsState[wordsState.length - 1].word
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\u0142/g, "l")
        .replaceAll('\n','')
    ) {
      setButtonsState([
        "text-lg text-white hidden",
        "text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight",
        "font-bold text-green-600 text-5xl",
        "Dobrze!",
        "Błędne tłumaczenie!",
        "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base bg-green-200",
      ]);
      setIsDisabled(true);
      buttonRef.current.focus();
    } else {
      setButtonsState([
        "text-lg text-white hidden",
        "text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight",
        "font-bold text-red-600 text-5xl",
        "Źle!",
        "Błędne tłumaczenie!",
        "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base bg-red-200",
      ]);
      setIsDisabled(true);
    }
  };

  let renderStatus = <RenderStatus changeStatus={changeStatus} status={status}/>

  let streakIcon=<IconStreak streak={currentWord.streak} reverseStreak={currentWord.reverseStreak}/>
  

// Creating the ButtonInput component, which contains an input field and two buttons for interaction
let ButtonInput = (
  <div className="flex gap-4 max-lg:flex-col max-lg:justify-center max-lg:items-center">
    {/* Input field for translation */}
    <input
      className={ButtonsState[5]} // Dynamic CSS class based on button state
      placeholder={ButtonsState[4]} // Dynamic placeholder based on button state
      disabled={isDisabled} // Conditionally disables the input field
      ref={inputRef} // Reference for the input field
      id="translation" // ID for the input element
      name="translation" // Name attribute for the input element
      type="text" // Input type is text
      onChange={formik.handleChange} // Handles input change via Formik
      value={formik.values.translation} // Controlled input value managed by Formik
    ></input>
    <div onClick={() => {}} className="relative left-0 flex items-center">
      {/* Button for checking the status bar */}
      <Button onClick={setStatusBar} className={ButtonsState[0]}>
        Sprawdź{" "}
      </Button>
      {/* Button for moving to the next word and performing state updates */}
      <button
        onClick={() => {
          CheckTranslationUtil(
            updateWord, // Updates the current word
            updateUserStats, // Updates user statistics
            currentWord, // Current word object
            status, // Current word status
            formik, // Formik instance for form management
            wordsState, // State of all words
            navigate, // Navigation handler
            setWordsState, // Updates words state
            setIsDisabled, // Toggles input field disabled state
            setStatus, // Updates the status of the word
            setCurrentWord, // Sets the current word
            setButtonsState, // Updates button states
            reversed // Indicates if the translation is reversed
          );
        }}
        className={ButtonsState[1]} // Dynamic CSS class based on button state
        ref={buttonRef} // Reference for the button element
      >
        Dalej{" "}
      </button>
    </div>
  </div>
);

return (
  <>
    <div className="relative flex w-full min-h-full bg-gray-50">
      <div className="flex flex-col w-full max-w-6xl mx-auto px-6 py-6 lg:py-10">
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl px-5 sm:px-6 py-4">
          <MainTitle>Słówko - Tłumaczenie (Odwrotne)</MainTitle>
          <button
            onClick={() => {
              navigate("/app/folders/training");
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-white transition hover:bg-secondarylight focus:outline-none focus:ring-2 focus:ring-secondary/40"
          >
            <IoMdArrowRoundBack />
            <span>Powrót</span>
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center gap-8">
          <div className={ButtonsState[2]}>
            {ButtonsState[3]} - {currentWord.word}
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex items-center justify-center gap-2 font-thin text-4xl sm:text-5xl">
              {currentWord.translation}
              {streakIcon}
            </div>
            <div className="text-sm font-inter font-thin text-fifth">
              {currentWord.note}
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>{ButtonInput}</form>
          <div className="w-full max-w-2xl">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl p-6">
              <div className="flex flex-col items-center gap-6">
                <h3 className="text-lg font-semibold text-gray-800">Status słówka</h3>
                {renderStatus}
                <div className="text-center text-sm text-gray-600 leading-relaxed">
                  Wybrany status określa, jak często dane słówko będzie pojawiało się w ćwiczeniach. Status możesz zmieniać w dowolnej chwili, zmienia on się również wraz z ilością powtórzeń danego słowa.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Character
        alt="character1"
        className="absolute z-0 w-1/5 bottom-0 right-0 max-lg:hidden"
        character={character1}
      />
    </div>
  </>
);
};

export default TextTrainingReversed;
