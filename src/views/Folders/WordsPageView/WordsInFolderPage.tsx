//ICONS & SVG
import { HiPlus } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import character1 from "../../../shared/img/character1.svg";

import { RootState, useFetchSpecificWordsQuery } from "../../../shared/store";
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
import { CSVLink } from "react-csv";
import CsvFileInput from "../../../shared/components/CsvFileInput";
import ImportWordsModal from "./Components/ImportWordsModal";

const WordsInFolderPage = () => {
  const { isVisible, toggleModal, closeModal } = useModal();
  const updateModal = useModal();
  const importModal = useModal();
  const [newID, setNewID] = useState(0);
  const navigate = useNavigate();
  const folder = useSelector((state: RootState) => state.folderProfile);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [page, setPage] = useState(1);
  const user = useSelector((state: RootState) => state.userProfile);
  const response = useFetchSpecificWordsQuery({
    folderID: folder.id,
    userID: user.value,
  });

  let renderedWords;
  let availablePages = 0;
  let resultArray = [];
  useEffect(() => {
    if (folder.words === undefined) {
      navigate("/app/folders");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //LOADING THE TABLE
  if (response.isLoading) {
    renderedWords = <div>Ładowanie...</div>;
  } else if (response.isError) {
    renderedWords = <div>Error</div>;
    navigate("/app/folders");
  } else if (response.isSuccess) {
    //CALCULATE DATA PER PAGE
    let responseDataLength = 0;
    let allWords = response.data;
    resultArray = Object.keys(response.data).map(function(personNamedIndex){
      let person = response.data[personNamedIndex];
      // do something with person
      return person;
  });
    if (response !== undefined) {
      responseDataLength = response.data.length;
    }
    availablePages = responseDataLength / 12;
    availablePages = ~~availablePages + 1;

    let wordsData;
    wordsData = response.data.slice(12 * (page - 1), 12 * page - 1+1);

    renderedWords = (
      <WordRenderer
        setCurrentWord={setCurrentWord}
        data={wordsData}
        allWords={allWords}
        folder={folder}
        setNewID={setNewID}
        openUpdateModal={updateModal.toggleModal}
      />
    );
  }

  let pageArrows = <></>;
  if (availablePages > 1) {
    pageArrows = (
      <>
        <div className="flex justify-center items-center text-base text-fifth">
          Strona {page}
        </div>
        <div
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
        >
          <FaAngleLeft />
        </div>
        <div
          onClick={() => {
            if (page < availablePages) setPage(page + 1);
          }}
          className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
        >
          <FaAngleRight />
        </div>
      </>
    );
  }
  let folderLength = 1;
  if (folder.words !== undefined) {
    folderLength = folder.words.length;
  }
  const wordAmount = folderLength;

  const [data, setData] = useState([]);
  const handleFileLoad = (csvData:any) => {
    setData(csvData);
    importModal.toggleModal();
  };
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
          className="flex pl-4 gap-4 h-20 max-lg:w-full items-center max-lg:justify-center
                            text-black text-3xl font-medium"
        >
          <div className="flex justify-center items-center gap-2 max-lg:hidden">
            <div>{folder.folderName}</div>
            <div className="text-xs text-fifth">({wordAmount} słówek)</div>
          </div>
          <div className="flex gap-4">
            {pageArrows}
            <div
              onClick={() => {
                toggleModal();
              }}
              className="flex items-center bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
            >
              <HiPlus />
              <div className="text-lg">Nowe Słówko </div>
            </div>
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
          className="flex pl-4 max-lg:pr-4 items-left
                            text-black text-3xl font-medium"
        >
          <div className="flex flex-col h-auto w-3/4 max-lg:w-full shadow-lg justify-start">
            <WordsTable renderedWords={renderedWords} />
          </div>
          <div className="flex flex-col w-1/3">
            <StatusBox />
            <CSVLink
              className="flex text-xl items-center text-center justify-center bg-secondary rounded-xl p-2 m-4 z-20 shadow-lg hover:cursor-pointer hover:bg-secondarylight"
              data={resultArray}
              filename={"eslowka-eksport.csv"}
            >
              Eksport Słówek
            </CSVLink>
            <CsvFileInput onFileLoad={handleFileLoad} />
          </div>
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
        className="absolute z-0 w-1/5 bottom-0 right-0 max-lg:hidden"
        character={character1}
      />
      <ImportWordsModal
        isVisible={importModal.isVisible}
        closeModal={importModal.closeModal}
        folder={response.data}
        data={data}
        />
      <AddWordsModal
        isVisible={isVisible}
        closeModal={closeModal}
        folder={folder}
        newID={newID}
      />
      <UpdateWordsModal
        currentWord={currentWord}
        isVisible={updateModal.isVisible}
        closeModal={updateModal.closeModal}
        folder={folder}
        newID={0}
      />
    </>
  );
};

export default WordsInFolderPage;
