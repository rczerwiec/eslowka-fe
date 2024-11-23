//ICONS & SVG
import character1 from "../../../shared/img/character1.svg";
import { HiPlus } from "react-icons/hi";
import { RootState, useFetchFoldersQuery } from "../../../shared/store";
import { IFolder } from "../../../shared/store/slices/FolderSlice";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../../shared/store/slices/FolderSlice";
import { useNavigate } from "react-router-dom";
import useModal from "../../../shared/components/Modal/useModal";
import Character from "../../../shared/components/Character";
import FoldersPageModal from "./Components/FoldersPageModal";
import RemoveConfirmModal from "./Components/RemoveConfirmModal";
import { useState } from "react";
import FolderRenderUtil from "./utils/FolderRenderUtil";
import FirstTitle from "../../../shared/components/FirstTitle";
import MainTitle from "../../../shared/components/MainTitle";
import { motion } from "framer-motion";
import Button from "../../../shared/components/Button";
import { Colors } from "../../../shared/Enums/Stylings";
import FolderReferenceCodeModal from "./Components/FolderReferenceCodeModal";

const FoldersPage = () => {
  const user = useSelector((state: RootState) => state.userProfile);
  const { isVisible, closeModal, toggleModal } = useModal();
  const ReferenceModal = useModal();
  const response = useFetchFoldersQuery(user.value);
  const [currentFolder, setCurrentFolder] = useState<IFolder>();
  const confirmationModal = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //RENDER FOLDERS
  let folderRender = FolderRenderUtil(
    response.data,
    response.isLoading,
    response.isError,
    response.isSuccess,
    dispatch,
    change,
    navigate,
    setCurrentFolder,
    confirmationModal.toggleModal
  );

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <FirstTitle>Foldery</FirstTitle>
        <div className="flex w-3/4 justify-between items-center">
        <MainTitle>Twoje Foldery </MainTitle>
        <div>
          <Button onClick={()=>{
            ReferenceModal.toggleModal();
          }} bgColor={Colors.MAIN} textColor={Colors.WHITE}>KOD REF.</Button>
        </div>
        </div>
        <form>{folderRender?.renderedFolders}</form>
        <motion.div whileHover={{ scale: [null, 1.5, 1.4] }}
      transition={{ duration: 0.3 }}
          onClick={() => {
            toggleModal();
          }}
          className="flex z-10 absolute bottom-0 right-0 m-8 h-16 w-16 bg-secondary hover:bg-secondarylight hover:cursor-pointer rounded-full shadow-md items-center justify-center"
        >
          <HiPlus className="text-2xl" />
        </motion.div>
      </div>
      <Character
        alt="character1"
        className="absolute z-0 w-1/5 bottom-0 right-0 max-lg:hidden"
        character={character1}
      />
      <FoldersPageModal
        renderedFoldersLength={folderRender?.renderedFolderLength}
        isVisible={isVisible}
        closeModal={closeModal}
      />
      <FolderReferenceCodeModal
        renderedFoldersLength={folderRender?.renderedFolderLength}
        isVisible={ReferenceModal.isVisible}
        closeModal={ReferenceModal.closeModal}
      />
      <RemoveConfirmModal
        isVisible={confirmationModal.isVisible}
        closeModal={confirmationModal.closeModal}
        folder={currentFolder}
        userID={user.value}
      />
    </>
  );
};

export default FoldersPage;
