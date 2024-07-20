//ICONS & SVG
import { HiPlus } from "react-icons/hi";
import { FaCheckCircle, FaTrashAlt, FaFrownOpen } from "react-icons/fa";
import { BiSolidExit } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GrInProgress } from "react-icons/gr";
import character3 from "../../shared/img/character3.svg";
import character1 from "../../shared/img/character1.svg";

import {
  RootState,
  useFetchSpecificWordsQuery,
  useCreateWordMutation,
  useRemoveWordMutation,
} from "../../shared/store";
import { INewWord, IWord } from "../../shared/store/slices/FolderSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, useModal } from "../../shared/components/Modal";
import { useState } from "react";

const WordsInFolderPage = () => {
  const [newWord, setNewWord] = useState("");
  const [wordTranslation, setWordTranslation] = useState("");
  const { isVisible, toggleModal, closeModal } = useModal();
  const navigate = useNavigate();
  const folder = useSelector((state: RootState) => state.folderProfile);
  const response = useFetchSpecificWordsQuery(folder.id);
  const [createWord] = useCreateWordMutation();
  const [removeWord] = useRemoveWordMutation();

  const onWordCreate = async (newWord: INewWord) => {
    return await createWord(newWord)
      .unwrap()
      .then((res) => {
        console.log("res from api:", res);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  let newID: number = 0;
  let renderedWords;
  if (response.isLoading) {
    renderedWords = <div>Ładowanie...</div>;
  } else if (response.isError) {
    renderedWords = <div>Error</div>;
    navigate("/folders");
  } else if (response.isSuccess) {
    renderedWords = response.data.map((word: IWord, index: number) => {
      let statusIcon = <div className="flex justify-center items-center h-14 p-4"><FaCheckCircle className="flex justify-center items-center h-14 text-green-500" /></div>;
      if (word.known === 0) {
        statusIcon = <div className="flex justify-center items-center h-14 p-4"><FaFrownOpen className="flex justify-center items-center h-14 text-red-500" /></div>;
      } else if (word.known === 1) {
        statusIcon = <div className="flex justify-center items-center h-14 p-4"><GrInProgress className="flex justify-center items-center h-14 text-orange-500"/></div>
      }

      let tr = (
        <tr className="h-14 font-inter font-medium text-xl" key={word.id}>
          <th className="border-r-4 border-white">{word.id}</th>
          <th className="border-r-4 border-white">{word.word}</th>
          <th className="border-r-4 border-white">{word.translation}</th>
          <th className="border-r-4 border-white">{statusIcon}</th>
          <th className="flex justify-between items-center h-14 p-4">
            <FaTrashAlt
              className="hover:cursor-pointer"
              onClick={() => {
                removeWord({ word: word, folderID: folder.id });
              }}
            />
          </th>
        </tr>
      );
      if (index % 2 === 0) {
        tr = (
          <tr
            className="h-14 bg-fourth font-inter font-medium text-xl"
            key={word.id}
          >
            <th className="border-r-4 border-white">{word.id}</th>
            <th className="border-r-4 border-white">{word.word}</th>
            <th className="border-r-4 border-white">{word.translation}</th>
            <th className="border-r-4 border-white">{statusIcon}</th>
            <th className="flex justify-between items-center h-14 p-4">
              <FaTrashAlt
                className="hover:cursor-pointer"
                onClick={() => {
                  removeWord({ word: word, folderID: folder.id });
                }}
              />
            </th>
          </tr>
        );
      }
      newID = response.data[response.data.length - 1].id + 1;

      return <>{tr}</>;
    });
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
            <table>
              <tr className="bg-secondary h-14 text-white ">
                <th className="rounded-tl-xl border-r-4 border-white">ID</th>
                <th className="border-r-4 border-white">Słowo</th>
                <th className="border-r-4 border-white">Tłumaczenie</th>
                <th className="border-r-4 border-white">Status</th>
                <th className="rounded-tr-xl">Opcje</th>
              </tr>
              {renderedWords}
            </table>
          </div>
          <div className="flex flex-col items-center w-1/4 shadow-lg mx-2 rounded-xl text-sm font-thin font-inter bg-white z-20 h-40 ">
          <div className="font-semibold font-inter text-base p-2">Statusy:</div>
          <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center text-red-600 text-xl size-8 border m-2 border-fifth rounded-xl">
                  <FaFrownOpen />
                </div>
                <div className="font-thin text-xs w-14 text-center">
                  Jest dla mnie kłopotliwe
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center text-orange-400 text-xl size-8 border m-2 border-fifth rounded-xl">
                  <GrInProgress />
                </div>
                <div className="font-thin text-xs w-14 text-center">
                  Wciąż się uczę
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center text-green-600 text-xl size-8 border m-2 border-fifth rounded-xl">
                  <FaCheckCircle />
                </div>
                <div className="font-thin text-xs w-14 text-center">Znam</div>
              </div>
            </div>
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
      <img
        alt="character1"
        className="absolute z-0 w-1/5 bottom-0 right-0"
        src={character1}
      ></img>
      <Modal isVisible={isVisible} onClose={closeModal}>
        <div className="absolute bg-whiteMain mt-20 z-20 h-2/4 w-full top-0 bg-white rounded xl:w-1/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
          <div className="absolute flex flex-col p-8 shrink h-full w-full overflow-y-auto  scrollbar-hide z-10">
            <div className="font-inter font-bold text-2xl text-fifth z-10 truncate">
              Nowe Słówko - {folder.folderName}
            </div>
            <div className="flex flex-col justify-center items-center mt-6">
              <div className="font-inter font-medium text-xl text-fifth z-10">
                Słówko
              </div>
              <input
                className="bg-fifth_light w-2/4 h-10 rounded-md p-3 z-10"
                placeholder="np. pig"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col justify-center items-center mt-6 z-10">
              <div className="font-inter font-medium text-xl text-fifth ">
                Tłumaczenie
              </div>
              <input
                className="bg-fifth_light w-2/4 h-10 rounded-md p-3"
                placeholder="np. świnia"
                value={wordTranslation}
                onChange={(e) => setWordTranslation(e.target.value)}
              ></input>
            </div>

            <img
              alt="character2"
              className="absolute z-0 w-3/6 bottom-0 left-auto"
              src={character3}
            ></img>
            <div className="absolute top-0 right-0 pr-8 pt-6 text-3xl z-20 text-fifth ">
              <BiSolidExit className="hover:text-4xl hover:cursor-pointer" onClick={closeModal} />
            </div>
            <div className="absolute bottom-0 right-0 pr-8 pb-6 text-3xl text-secondary">
              <FaCheckCircle className="hover:text-4xl hover:cursor-pointer"
                onClick={() => {
                  closeModal();
                  setNewWord("");
                  setWordTranslation("");
                  onWordCreate({
                    word: {
                      id: newID,
                      folderId: folder.id,
                      word: newWord,
                      translation: wordTranslation,
                      repeated: 0,
                      known: 0,
                    },
                    folderID: folder.id,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WordsInFolderPage;
