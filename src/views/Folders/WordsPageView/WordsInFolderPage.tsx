//ICONS & SVG
import { HiPlus } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import character1 from "../../../shared/img/character1.svg";

import {
  RootState,
  useFetchSpecificWordsQuery,
} from "../../../shared/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../shared/components/Modal";
import { useState } from "react";
import StatusBox from "../../../shared/components/StatusBox";
import Character from "../../../shared/components/Character";
import AddWordsModal from "./Components/AddWordsModal";
import WordRenderer, { WordsTable } from "./Components/WordRenderer";

const WordsInFolderPage = () => {
  const { isVisible, toggleModal, closeModal } = useModal();
  const [newID, setNewID] = useState(0)
  const navigate = useNavigate();
  const folder = useSelector((state: RootState) => state.folderProfile);
  const response = useFetchSpecificWordsQuery(folder.id);

  let renderedWords;
  
  //LOADING THE TABLE
  if (response.isLoading) {
    renderedWords = <div>Ładowanie...</div>;
  } else if (response.isError) {
    renderedWords = <div>Error</div>;
    navigate("/folders");
  } else if (response.isSuccess) {
    renderedWords = <WordRenderer data={response.data} folder={folder} setNewID={setNewID}/>
  }

  return (
    <>
      <div className="flex flex-col size-full">
        <div
          className="flex pl-4 bg-fourth h-8  items-center
                            text-fifth text-sm font-medium"
        >
          Foldery - {folder.folderName}
        </div>
        <div
          className="flex pl-4 h-20 w-3/4 items-center justify-between
                            text-black text-3xl font-medium"
        >
          <div>{folder.folderName}</div>
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
        <div
          className="flex pl-4 items-left
                            text-black text-3xl font-medium"
        >
          <div className="flex flex-col w-3/4 shadow-lg justify-center">
          <WordsTable renderedWords={renderedWords}/>
          </div>  
          <StatusBox/>
        </div>
        
        <div
          onClick={() => {
            toggleModal();
          }}
          className="flex z-10 absolute bottom-0 right-0 m-8 h-16 w-16 bg-secondary hover:bg-third hover:cursor-pointer rounded-full shadow-md items-center justify-center"
        >
          <HiPlus className="text-2xl" />
        </div>
      </div>
      <Character alt="character1" className="absolute z-0 w-1/5 bottom-0 right-0" character={character1}/>
      <AddWordsModal isVisible={isVisible} closeModal={closeModal} folder={folder} newID={newID}/>
    </>
  );
};

export default WordsInFolderPage;
