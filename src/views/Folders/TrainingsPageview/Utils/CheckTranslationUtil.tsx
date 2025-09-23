import { IWord } from "../../../../shared/store/slices/FolderSlice";

function CheckTranslationUtil(
  updateWord: (w: IWord) => void,
  updateStats: (e: number) => void,
  currentWord: IWord,
  status: number,
  formik: any,
  wordsState: IWord[],
  navigate: (url: string) => void,
  setWordsState: (words: IWord[]) => void,
  setIsDisabled: (value: boolean) => void,
  setStatus: (value: number) => void,
  setCurrentWord: (value: IWord) => void,
  setButtonsState: (value: string[]) => void,
  reversed: boolean,
) {
  let known = currentWord.known;
  if (status !== -1) {
    known = status;
  }
  let word = formik.values.translation
  .toLocaleLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/\u0142/g, "l")
  let translation = wordsState[wordsState.length - 1].word
  .toLocaleLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/\u0142/g, "l")
  .replaceAll('\n','');
  if (reversed){
    translation = wordsState[wordsState.length - 1].translation
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0142/g, "l").replaceAll('\n','');
  }
  //IF IT'S CORRECT
  if (
    word ===
    translation
  ) {
    //console.log(word+"-", translation)
    if (currentWord.known === 0 && currentWord.streak === 2) {
      known = 1;
    }
    if (currentWord.known === 1 && currentWord.streak === 5) {
      known = 2;
    }

    const wordUpdated = {
      id: currentWord.id,
      word: currentWord.word,
      translation: currentWord.translation,
      note: currentWord.note,
      repeated: currentWord.repeated + 1,
      known: known,
      folderId: currentWord.folderId,
      streak: currentWord.streak + 1,
      reverseStreak: 0,
    };
    updateWord(wordUpdated);
    updateStats(5);

    const newState = [...wordsState].splice(0, wordsState.length - 1);
    if (newState.length >= 1) {
      formik.values.translation = "";
      setIsDisabled(false);
      setWordsState(newState);
      setStatus(newState[newState.length - 1].known);
      setCurrentWord(newState[newState.length - 1]);
      setButtonsState([
        "text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight",
        "text-lg text-white hidden",
        "font-bold text-green-600 text-5xl hidden",
        "Dobrze!",
        "wpisz tłumaczenie!",
        "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base",
      ]);
    } else {
      navigate("/app/folders");
    }
    //IF NOT CORRECT
  } else {
    const wordUpdated = {
      id: currentWord.id,
      word: currentWord.word,
      translation: currentWord.translation,
      note: currentWord.note,
      repeated: currentWord.repeated + 1,
      known: known,
      folderId: currentWord.folderId,
      streak: 0,
      reverseStreak: currentWord.reverseStreak + 1,
    };
    updateWord(wordUpdated);
    updateStats(1);
    let lastWord = currentWord;
    if (lastWord.reverseStreak >= 2 && known === 1) {
      known = 0;
    }
    if (lastWord.reverseStreak >= 4 && known === 2) {
      known = 1;
    }
    lastWord = {
      ...lastWord,
      repeated: lastWord.repeated + 1,
      reverseStreak: lastWord.reverseStreak + 1,
      streak: 0,
      known: known,
    };
    let newState = [...wordsState].splice(0, wordsState.length - 1);
    newState = [lastWord].concat(newState);
    setIsDisabled(false);
    formik.values.translation = "";
    setWordsState(newState);
    setStatus(newState[newState.length - 1].known);
    setCurrentWord(newState[newState.length - 1]);
    setButtonsState([
      "text-lg text-white h-14 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight",
      "text-lg text-white hidden",
      "font-bold text-green-600 text-5xl hidden",
      "Dobrze!",
      "wpisz tłumaczenie!",
      "bg-fifth_light h-14 rounded-md w-96 p-3 font-thin text-base",
    ]);
  }
}

export default CheckTranslationUtil;
