import { FC } from "react";
import { IFolder, IWord } from "../../../../shared/store/slices/FolderSlice";
import { FaFire, FaSkull } from "react-icons/fa6";
import WordStatusForm from "./WordStatusForm";
import { FaTrashAlt } from "react-icons/fa";
import { RootState, useDeleteWordInFolderMutation } from "../../../../shared/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";

export const WordsTable: FC<{ renderedWords: JSX.Element | undefined}> = (
  props
): JSX.Element => {
  return (
    <table className="font-inter text-xl max-lg:text-sm max-lg:px-0">
      <tr className="bg-secondary h-10 text-white max-lg:h-7">
        <th className="rounded-tl-xl border-r-4 border-white hidden">id</th>
        <th className="rounded-tl-xl border-r-4 border-white">Słowo</th>
        <th className="border-r-4 border-white">Tłumaczenie</th>
        <th className="border-r-4 border-white max-lg:hidden">Status</th>
        <th className="rounded-tr-xl w-14">Opcje</th>
      </tr>
      {props.renderedWords}
    </table>
  );
};

const WordRenderer: FC<{
  data: IWord[];
  allWords: IWord[];
  folder: IFolder;
  setNewID: (newID: number) => void;
  openUpdateModal: () => void;
  setCurrentWord: (word: IWord) => void;
}> = (props): JSX.Element => {
  const user = useSelector((state: RootState) => state.userProfile);

  const [removeWord] = useDeleteWordInFolderMutation();
  let tr: any;
  //IF WORDS TABLE IS NOT EMPTY
  if (props.data.length !== 0) {
    tr = props.data.map((word: IWord, index: number) => {
      let streakIcon;
      if (word.streak >= 5 && word.streak < 15) {
        streakIcon = <FaFire className=" text-2xl text-orange-600 max-lg:text-base" />;
      } else if (word.streak >= 15 && word.streak < 35) {
        streakIcon = <FaFire className=" text-2xl text-zinc-400 max-lg:text-base" />;
      } else if (word.streak >= 35) {
        streakIcon = <FaFire className=" text-2xl text-gold max-lg:text-base" />;
      } else if (word.reverseStreak >= 5) {
        streakIcon = <FaSkull className=" text-2xl text-red-600 max-lg:text-base" />;
      } else {
        streakIcon = <FaFire className=" text-2xl text-transparent max-lg:text-base" />;
      }

      tr = (
        <tr className="h-14 font-inter font-medium text-xl max-lg:text-sm " key={word.id}>
          <th className="border-r-4 border-white hidden">{word.id}</th>
          <th onClick={() => {
          props.openUpdateModal();
          props.setCurrentWord(word);
        }} className="flex justify-center items-center gap-2 border-r-4 border-white">
            {" "}
            {streakIcon}
            {word.word.slice(0,13)}
          </th>
          <th onClick={() => {
          props.openUpdateModal();
          props.setCurrentWord(word);
        }} className="border-r-4 border-white">{word.translation.slice(0,13)}</th>
          <th className="border-r-4 border-white max-lg:hidden">
            <WordStatusForm word={word} />
          </th>
          <th className="flex justify-start gap-3 items-center h-14 p-4">
            <FaTrashAlt
              className="hover:cursor-pointer hover:text-secondary"
              onClick={() => {
                removeWord({
                  wordToRemove: { word: word, folderID: props.folder.id },
                  userID: user.value,
                })
                  .then(() => {
                    toast.success("Pomyślnie usunięto słówko!");
                  })
                  .catch(() => {
                    toast.error("Błąd podczas usuwania słówka!");
                  });
              }}
            />
            <FiEdit
              onClick={() => {
                props.openUpdateModal();
                props.setCurrentWord(word);
              }}
              className="hover:cursor-pointer hover:text-secondary max-lg:hidden"
            />
          </th>
        </tr>
      );
      if (index % 2 === 0) {
        tr = (
          <tr
            className="h-14 bg-fourth font-inter font-medium text-xl max-lg:text-sm "
            key={word.id}
          >
            <th  className="border-r-4 border-white hidden">{word.id}</th>
            <th onClick={() => {
          props.openUpdateModal();
          props.setCurrentWord(word);
        }} className="flex justify-center items-center gap-2 border-r-4 border-white">
              {" "}
              {streakIcon}
              {word.word.slice(0,13)}
            </th>
            <th onClick={() => {
          props.openUpdateModal();
          props.setCurrentWord(word);
        }} className="border-r-4 border-white">{word.translation.slice(0,13)}</th>
            <th className="border-r-4 border-white max-lg:hidden">
              <WordStatusForm word={word} />
            </th>
            <th className="flex justify-start gap-3 items-center h-14 p-4">
            <FaTrashAlt
                className="hover:cursor-pointer hover:text-secondary "
                onClick={() => {
                  removeWord({
                    wordToRemove: { word: word, folderID: props.folder.id },
                    userID: user.value,
                  });
                }}
                
              />
                      <FiEdit
                      onClick={() => {
                        props.openUpdateModal();
                        props.setCurrentWord(word);
                      }}
                className="hover:cursor-pointer hover:text-secondary max-lg:hidden"
              />
            </th>
          </tr>
        );
      }
      return <>{tr}</>;
    });
    props.setNewID(props.allWords[props.allWords.length - 1].id + 1);
  }
  return tr;
};

export default WordRenderer;
