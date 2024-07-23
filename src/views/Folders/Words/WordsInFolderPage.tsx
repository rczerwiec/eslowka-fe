//ICONS & SVG
import { HiPlus } from "react-icons/hi";
import { FaCheckCircle, FaTrashAlt, FaFrownOpen } from "react-icons/fa";
import { BiSolidExit } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GrInProgress } from "react-icons/gr";
import character3 from "../../../shared/img/character3.svg";
import character1 from "../../../shared/img/character1.svg";

import {
  RootState,
  useFetchSpecificWordsQuery,
  useCreateWordMutation,
  useRemoveWordMutation,
} from "../../../shared/store";
import { INewWord, IWord } from "../../../shared/store/slices/FolderSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, useModal } from "../../../shared/components/Modal";
import { useState } from "react";
import StatusBox from "../../../shared/components/StatusBox";
import Character from "../../../shared/components/Character";
import AddWordsForm from "./AddWordsForm";

const WordsInFolderPage = () => {
  const { isVisible, toggleModal, closeModal } = useModal();
  const navigate = useNavigate();
  const folder = useSelector((state: RootState) => state.folderProfile);
  const response = useFetchSpecificWordsQuery(folder.id);
  const [removeWord] = useRemoveWordMutation();

  let newID: number = 0;
  let renderedWords;
  
  //LOADING THE TABLE
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
      <Modal isVisible={isVisible} onClose={closeModal}>
        <div className="absolute bg-whiteMain mt-20 z-20 h-3/4 w-full top-0 bg-white rounded xl:w-1/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
          <div className="absolute flex flex-col p-8 shrink h-full w-full overflow-y-auto  scrollbar-hide z-10">
            <AddWordsForm folder={folder} newID={newID} closeModal={closeModal}/>
            <Character alt="character2" className="absolute z-0 w-3/6 bottom-0 left-auto" character={character3}/>
            <div className="absolute top-0 right-0 pr-8 pt-6 text-3xl z-20 text-fifth ">
              <BiSolidExit className="hover:text-4xl hover:cursor-pointer" onClick={closeModal} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WordsInFolderPage;
