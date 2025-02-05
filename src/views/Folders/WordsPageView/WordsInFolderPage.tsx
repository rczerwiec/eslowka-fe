//ICONS & SVG
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CSVLink } from "react-csv";

// Icons & SVG
import { HiPlus } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaAngleLeft, FaAngleRight, FaCopy, FaPlayCircle } from "react-icons/fa";
import character1 from "../../../shared/img/character1.svg";

// Custom hooks and store
import {
  RootState,
  useGetAllWordsInFolderQuery,
  useUpdateFolderNameMutation,
} from "../../../shared/store";
import { useModal } from "../../../shared/components/Modal";

// Components
import FirstTitle from "../../../shared/components/FirstTitle";
import StatusBox from "../../../shared/components/StatusBox";
import EditableText from "../../../shared/components/EditableText";
import Character from "../../../shared/components/Character";
import CsvFileInput from "../../../shared/components/CsvFileInput";
import LanguageSelector from "../TrainingsPageview/Components/LanguageSelector";
import WordRenderer, { WordsTable } from "./Components/WordRenderer";
import AddWordsModal from "./Components/AddWordsModal";
import UpdateWordsModal from "./Components/UpdateWordsModal";
import ImportWordsModal from "./Components/ImportWordsModal";

// Types
import { change, IWord } from "../../../shared/store/slices/FolderSlice";

const WordsInFolderPage: React.FC = () => {
  const { isVisible, toggleModal, closeModal } = useModal();
  const updateModal = useModal();
  const importModal = useModal();
  const navigate = useNavigate();

  const folder = useSelector((state: RootState) => state.folderProfile);
  const user = useSelector((state: RootState) => state.userProfile);
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [page, setPage] = useState(1);
  const [newID, setNewID] = useState(0);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const { data: wordsData, isLoading, isError } = useGetAllWordsInFolderQuery({
    folderID: folder.id,
    userID: user.value,
  });
  const [renameFolder] = useUpdateFolderNameMutation();

  useEffect(() => {
    if (!folder.words) {
      navigate("/app/folders");
    }
  }, [folder.words, navigate]);

  const handleFileLoad = (csvData: any) => {
    setData(csvData);
    importModal.toggleModal();
  };

  const handleFolderNameChange = (newName: string) => {
    renameFolder({ newName, userID: user.value, folderID: folder.id });
  };

  const handleFolderIDCopy = () => {
    navigator.clipboard.writeText(folder.referenceID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Pagination and data handling
  const availablePages = useMemo(() => Math.ceil((wordsData?.length || 0) / 11), [wordsData]);
  const paginatedWords = useMemo(() => {
    return wordsData?.slice((page - 1) * 11, page * 11) || [];
  }, [wordsData, page]);

  const renderedWords = useMemo(() => {
    if (isLoading) return <div>Ładowanie...</div>;
    if (isError) {
      navigate("/app/folders");
      return <div>Error</div>;
    }
    if (wordsData) {
      return (
        <WordRenderer
          setCurrentWord={setCurrentWord}
          data={paginatedWords}
          allWords={wordsData}
          folder={folder}
          setNewID={setNewID}
          openUpdateModal={updateModal.toggleModal}
        />
      );
    }
    return null;
  }, [isLoading, isError, wordsData, paginatedWords, folder, updateModal, navigate]);

  return ( 
    <div className="flex flex-col w-full ">
      {/* Header of the page displaying the folder name */}
      <FirstTitle>Foldery - {folder.folderName}</FirstTitle>
  
      {/* Navigation bar and action buttons */}
      <div className="flex flex-wrap gap-4 px-4 h-20 items-center text-black text-xl lg:text-3xl font-medium">
        {/* Editable folder name with the total count of words */}
        <div className="flex items-center gap-2 w-full lg:w-auto max-xl:hidden">
          <EditableText initialText={folder.folderName} onConfirm={handleFolderNameChange} />
          <span className="text-xs text-fifth">({folder.words?.length || 0} słówek)</span>
        </div>
  
        {/* Controls for navigation and actions */}
        <div className="flex flex-wrap gap-2 justify-center items-center text-sm lg:text-base w-full lg:w-auto max-lg:pt-4">
          {/* Current page display */}
          <div className="flex justify-center items-center text-fifth max-lg:hidden">
            Strona {page}/{availablePages}
          </div>
          <div className="flex justify-center items-center text-fifth ">
            {page}/{availablePages}
          </div>
  
          {/* Button: Go to the previous page */}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="flex items-center bg-secondary rounded-xl p-3 hover:cursor-pointer hover:bg-secondarylight"
            aria-label="Previous page"
          >
            <FaAngleLeft />
          </button>
  
          {/* Button: Go to the next page */}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, availablePages))}
            className="flex items-center bg-secondary rounded-xl p-3 hover:cursor-pointer hover:bg-secondarylight"
            aria-label="Next page"
          >
            <FaAngleRight />
          </button>
  
          {/* Button: Open modal to add a new word */}
          <button
            onClick={toggleModal}
            className="max-lg:hidden flex items-center gap-1 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
          >
            <HiPlus />
            <span>Nowe Słowo</span>
          </button>
  
          {/* Button: Navigate to training mode */}
          <button
            onClick={() => {
              dispatch(change(folder));
              navigate("/app/folders/training")}}
            className="flex items-center gap-1 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
          >
            <FaPlayCircle />
            <span>Trenuj</span>
          </button>
  
          {/* Button: Navigate back to the folder list */}
          <button
            onClick={() => navigate("/app/folders")}
            className="flex items-center gap-1 bg-secondary rounded-xl p-2 hover:cursor-pointer hover:bg-secondarylight"
          >
            <IoMdArrowRoundBack />
            <span>Powrót</span>
          </button>
  
          {/* Button: Copy the folder reference ID */}
          <button
            onClick={handleFolderIDCopy}
            className="max-lg:hidden flex items-center gap-2 p-2 text-xs lg:text-sm hover:cursor-pointer hover:bg-secondarylight text-fifth rounded-lg"
          >
            {copied ? <span>Skopiowano!</span> : <>KOD REF:<FaCopy /></>}
            <span>{folder.referenceID}</span>
          </button>


        </div>
      </div>
  
      {/* Main content area */}
      <div className="flex flex-col lg:flex-row pl-4 max-lg:pr-4 items-start max-lg:mt-4">
        {/* Words table displaying the list of words */}
        <div className="flex flex-col w-full lg:w-3/4 shadow-lg">
          <WordsTable renderedWords={renderedWords} />
        </div>
  
        {/* Sidebar for additional actions */}
        <div className="flex flex-col w-full lg:w-1/3 gap-4 mt-4 lg:mt-0">
          <StatusBox />
  
          {/* Export words as a CSV file */}
          <CSVLink
            className="flex max-lg:hidden p-2 justify-center font-bold items-center shadow-lg mx-2 rounded-xl text-sm font-inter bg-white z-10 hover:bg-secondarylight border-secondary border-y-2 border-x-2"
            data={wordsData || []}
            filename={"eslowka-eksport.csv"}
          >
            Eksportuj słówka
          </CSVLink>
  
          {/* Input for importing CSV files */}
          <CsvFileInput onFileLoad={handleFileLoad} />
  
          {/* Default voice settings for "Word" column */}
          <div className="max-lg:hidden flex flex-col gap-2 p-2 justify-center font-bold items-center shadow-lg mx-2 rounded-xl text-sm font-inter bg-white z-10 border-secondary border-y-2 border-x-2">
            <label className="text-sm">Domyślny głos dla kolumny "Słowo":</label>
            <LanguageSelector
              defaultVoice={true}
              selectedVoice={folder.defaultVoice}
              userID={user.value}
              folder={folder}
            />
          </div>
  
          {/* Default voice settings for "Translation" column */}
          <div className="max-lg:hidden flex flex-col gap-2 p-2 justify-center font-bold items-center shadow-lg mx-2 rounded-xl text-sm font-inter bg-white z-10 border-secondary border-y-2 border-x-2">
            <label className="text-sm">Domyślny głos dla kolumny "Tłumaczenie":</label>
            <LanguageSelector
              defaultVoice={false}
              selectedVoice={folder.defaultVoiceReversed}
              userID={user.value}
              folder={folder}
            />
          </div>
        </div>
      </div>
  
      {/* Floating button to add a new word */}

      <motion.div
        whileHover={{ scale: [null, 1.2, 1.1] }}
        transition={{ duration: 0.3 }}
        onClick={toggleModal}
        className="fixed bottom-5 right-5 z-20 h-16 w-16 bg-secondary hover:bg-secondarylight rounded-full shadow-lg flex items-center justify-center cursor-pointer"
      >
        <HiPlus className="text-3xl text-white" />
      </motion.div>

      {/* Responsive Button: Copy the folder reference ID */}
      <button
        onClick={handleFolderIDCopy}
        className="flex lg:hidden absolute w-1/4 lg:w-1/5 bg-white bottom-5 left-5 items-center gap-2 p-2 text-xs lg:text-sm hover:cursor-pointer hover:bg-secondarylight text-fifth rounded-lg"
      >
        {copied ? <span>Skopiowano!</span> : <>REF:<FaCopy /></>}
      </button>
  
      {/* Decorative character image */}
      <Character character={character1} alt="character1" className="absolute w-1/4 lg:w-1/5 bottom-0 right-0 max-lg:hidden" />
  
      {/* Modal for adding new words */}
      <AddWordsModal isVisible={isVisible} closeModal={closeModal} folder={folder} newID={newID} />

      {/* Modal for updating words */}
      <UpdateWordsModal
        isVisible={updateModal.isVisible}
        closeModal={updateModal.closeModal}
        folder={folder}
        currentWord={currentWord}
        newID={0}
      />
  
      {/* Modal for importing words */}
      <ImportWordsModal
        isVisible={importModal.isVisible}
        closeModal={importModal.closeModal}
        folder={wordsData}
        data={data}
      />
    </div>
  );

}

export default WordsInFolderPage;