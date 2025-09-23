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
  useUpdateFolderSharingMutation,
  useUpdateFolderLanguageMutation,
  useFetchUserQuery,
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
import { toast } from "react-toastify";

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
  const [sharingPending, setSharingPending] = useState(false);
  const [languagePending, setLanguagePending] = useState(false);
  const dispatch = useDispatch();

  const { data: wordsData, isLoading, isError } = useGetAllWordsInFolderQuery({
    folderID: folder.id,
    userID: user.value,
  });
  const [renameFolder] = useUpdateFolderNameMutation();
  const [updateSharing] = useUpdateFolderSharingMutation();
  const [updateLanguage] = useUpdateFolderLanguageMutation();
  const { data: authorData } = useFetchUserQuery(folder.authorID as string, { skip: !folder.authorID });

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
          <div className="flex justify-center items-center text-fifth lg:hidden">
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

  
          {/* shared folder settings and stats */}
          <div className="max-lg:hidden flex flex-col gap-3 p-3 justify-center font-bold items-stretch shadow-lg mx-2 rounded-xl text-sm font-inter bg-white z-10 border-secondary border-y-2 border-x-2">
            {folder.authorID && folder.authorID !== user.value && (
              <div className="text-xs text-red-600 font-normal bg-red-50 p-2 rounded border border-red-200">
                ⚠️ Tylko oryginalny autor folderu może go udostępniać
              </div>
            )}
            <div className="flex items-center justify-between">
              <label className="text-sm">Udostępnij folder</label>
              <input
                type="checkbox"
                checked={!!folder.isShared}
                onChange={async (e) => {
                  const checked = e.target.checked;
                  if ((folder.words?.length || 0) < 5) return;
                  
                  // Sprawdź czy użytkownik jest autorem folderu
                  if (folder.authorID && folder.authorID !== user.value) {
                    toast.error("Tylko autor może udostępniać ten folder");
                    return;
                  }
                  
                  try {
                    setSharingPending(true);
                    await updateSharing({ isShared: checked, userID: user.value, folderID: folder.id }).unwrap();
                    dispatch(change({
                      id: folder.id,
                      folderName: folder.folderName,
                      words: folder.words,
                      currentProgress: folder.currentProgress,
                      maxProgress: folder.maxProgress,
                      defaultVoice: folder.defaultVoice,
                      defaultVoiceReversed: folder.defaultVoiceReversed,
                      referenceID: folder.referenceID,
                      isShared: checked,
                      folderLanguage: folder.folderLanguage,
                      sharedCounter: folder.sharedCounter,
                      authorID: folder.authorID,
                    }));
                    toast.success(checked ? "Folder udostępniony" : "Udostępnianie wyłączone");
                  } catch (err) {
                    toast.error("Nie udało się zapisać ustawienia udostępniania");
                  } finally {
                    setSharingPending(false);
                  }
                }}
                disabled={(folder.words?.length || 0) < 5 || sharingPending || (folder.authorID && folder.authorID !== user.value)}
                className="h-5 w-5"
              />
            </div>
            {(folder.words?.length || 0) < 5 && (
              <div className="text-xs text-gray-500 font-normal">Co najmniej 5 słów wymagane, aby udostępniać.</div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm">W kolekcjach</span>
              <span className="text-fifth">{folder.sharedCounter ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Język</span>
              <select
                value={folder.folderLanguage}
                onChange={async (e) => {
                  const newLang = e.target.value;
                  try {
                    setLanguagePending(true);
                    await updateLanguage({ folderLanguage: newLang, userID: user.value, folderID: folder.id }).unwrap();
                    dispatch(change({
                      id: folder.id,
                      folderName: folder.folderName,
                      words: folder.words,
                      currentProgress: folder.currentProgress,
                      maxProgress: folder.maxProgress,
                      defaultVoice: folder.defaultVoice,
                      defaultVoiceReversed: folder.defaultVoiceReversed,
                      referenceID: folder.referenceID,
                      isShared: folder.isShared,
                      folderLanguage: newLang,
                      sharedCounter: folder.sharedCounter,
                      authorID: folder.authorID,
                    }));
                    toast.success("Zmieniono język folderu");
                  } catch (err) {
                    toast.error("Nie udało się zmienić języka folderu");
                  } finally {
                    setLanguagePending(false);
                  }
                }}
                disabled={languagePending || (folder.authorID && folder.authorID !== user.value)}
                className="h-9 w-40 rounded-md border border-gray-300 bg-white px-2 text-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent disabled:opacity-60"
              >
                <option value="Angielski">Angielski</option>
                <option value="Niemiecki">Niemiecki</option>
                <option value="Hiszpański">Hiszpański</option>
                <option value="Francuski">Francuski</option>
                <option value="Włoski">Włoski</option>
              </select>
            </div>
            {(folder.authorID || authorData?.userName) && (
              <div className="flex items-center justify-between">
                <span className="text-sm">Autor</span>
                <span className="text-fifth break-all text-right font-normal">{authorData?.userName || folder.authorID}</span>
              </div>
            )}
          </div>

  
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