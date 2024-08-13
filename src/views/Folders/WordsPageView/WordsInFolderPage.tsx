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
import { useEffect, useState } from "react";
import StatusBox from "../../../shared/components/StatusBox";
import Character from "../../../shared/components/Character";
import AddWordsModal from "./Components/AddWordsModal";
import WordRenderer, { WordsTable } from "./Components/WordRenderer";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import UpdateWordsModal from "./Components/UpdateWordsModal";
import { IWord } from "../../../shared/store/slices/FolderSlice";

const WordsInFolderPage = () => {
  const { isVisible, toggleModal, closeModal } = useModal();
  const updateModal = useModal();
  const [newID, setNewID] = useState(0)
  const navigate = useNavigate();
  const folder = useSelector((state: RootState) => state.folderProfile);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [page, setPage] = useState(1);
  const user = useSelector((state: RootState) => state.userProfile);
  const response = useFetchSpecificWordsQuery({folderID:folder.id, userID:user.value});

  let renderedWords;
  let availablePages=0;
  useEffect(() => {
    console.log("RESPONSE.DATA",response.data);
    console.log("FOLDER.WORDS",folder.words);
      if(folder.words === undefined){
        console.log("nawiguje do strony z folderami")
        navigate("/app/folders");
      }

  }, [])
  //LOADING THE TABLE
  if (response.isLoading) {
    renderedWords = <div>Ładowanie...</div>;
  } else if (response.isError) {
    renderedWords = <div>Error</div>;
    navigate("/app/folders");
  } else if (response.isSuccess) {
    //CALCULATE DATA PER PAGE
    let responseDataLength = 0;
    if(response !== undefined){
      console.log("DŁUGOSC RESPONSE",response.data.length);
      responseDataLength = response.data.length;
    } 
    availablePages = responseDataLength/12;
    availablePages = ~~availablePages+1;
    
    let wordsData;
    wordsData = response.data.slice(12*(page-1),((12*page)-1));
    /////////////////////////////
    console.log("ID FOLDER:",folder.id)
    console.log("wordsData:",wordsData);

    renderedWords = <WordRenderer setCurrentWord={setCurrentWord} data={wordsData} folder={folder} setNewID={setNewID} openUpdateModal={updateModal.toggleModal}/>
  }


  let pageArrows = <></>
  if(availablePages>1){
    pageArrows = (
      <>
      <div className="flex justify-center items-center text-base text-fifth">Strona {page}</div>
      <div onClick={() => {
        if(page>1){
          setPage(page-1);
        }
        }} className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight">
        <FaAngleLeft />
      </div>
      <div              onClick={() => {
        if(page<availablePages)
          setPage(page+1);
        }} className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight">
        <FaAngleRight />
      </div></>
      
    )
  }
  console.log("FOLDEr:", folder);
  let folderLength = 1;
  if(folder.words !== undefined){
    folderLength = folder.words.length;
  }
  const wordAmount = folderLength;
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
          <div className="flex justify-center items-center gap-2">
          <div>{folder.folderName}
          </div>
          <div className="text-xs text-fifth">({wordAmount} słówek)</div></div>
          <div className="flex gap-4">
            {pageArrows}
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
        </div>
        <div
          className="flex pl-4 items-left
                            text-black text-3xl font-medium"
        >
          <div className="flex flex-col w-3/4 shadow-lg justify-center">
            <WordsTable renderedWords={renderedWords} />
          </div>
          <StatusBox />
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
      <Character
        alt="character1"
        className="absolute z-0 w-1/5 bottom-0 right-0"
        character={character1}
      />
      <AddWordsModal
        isVisible={isVisible}
        closeModal={closeModal}
        folder={folder}
        newID={newID}
      />
      <UpdateWordsModal currentWord={currentWord} isVisible={updateModal.isVisible} closeModal={updateModal.closeModal} folder={folder} newID={0}/>
    </>
  );
};

export default WordsInFolderPage;
