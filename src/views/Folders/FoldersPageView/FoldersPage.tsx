//ICONS & SVG
import character1 from "../../../shared/img/character1.svg";
import { HiPlus } from "react-icons/hi";
import { RootState, useGetUserFoldersQuery } from "../../../shared/store";
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
  const response = useGetUserFoldersQuery(user.value);
  const [currentFolder, setCurrentFolder] = useState<IFolder>();
  const confirmationModal = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Helper function to handle folder rendering
  const folderRender = FolderRenderUtil(
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
    <div className="flex flex-col w-full h-full bg-gray-100 p-6 relative">
      {/* Page Title */}
      <FirstTitle>Foldery</FirstTitle>
      <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
        <MainTitle>Twoje Foldery</MainTitle>
        <Button
          onClick={ReferenceModal.toggleModal}
          bgColor={Colors.MAIN}
          textColor={Colors.WHITE}
          className="hidden lg:block"
        >
          KOD REF.
        </Button>
      </div>

      {/* Folder List */}
      <div className="w-full max-w-4xl mx-auto mt-6">
      {Array.isArray(folderRender?.renderedFolders) && folderRender?.renderedFolders.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 max-h-[calc(100vh-150px)] overflow-y-auto">
    {folderRender.renderedFolders}
  </div>
) : (
  <div className="text-center text-gray-500 font-medium mt-10">Brak folderów do wyświetlenia.</div>
)}
      </div>

      {/* Add Folder Button */}
      <Button
        onClick={ReferenceModal.toggleModal}
        bgColor={Colors.MAIN}
        textColor={Colors.WHITE}
        className="fixed bottom-5 left-5 z-20 h-16 w-16 rounded-full shadow-lg lg:hidden flex items-center justify-center"
      >
        KOD REF.
      </Button>
      <motion.div
        whileHover={{ scale: [null, 1.2, 1.1] }}
        transition={{ duration: 0.3 }}
        onClick={toggleModal}
        className="fixed bottom-5 right-5 z-20 h-16 w-16 bg-secondary hover:bg-secondarylight rounded-full shadow-lg flex items-center justify-center cursor-pointer"
      >
        <HiPlus className="text-3xl text-white" />
      </motion.div>

      {/* Character Image */}
      <Character
        alt="character1"
        className="absolute bottom-0 right-0 w-1/5 max-lg:hidden"
        character={character1}
      />

      {/* Modals */}
      <FoldersPageModal
        renderedFoldersLength={folderRender?.renderedFolderLength || 0}
        isVisible={isVisible}
        closeModal={closeModal}
      />
      <FolderReferenceCodeModal
        renderedFoldersLength={folderRender?.renderedFolderLength || 0}
        isVisible={ReferenceModal.isVisible}
        closeModal={ReferenceModal.closeModal}
      />
      <RemoveConfirmModal
        isVisible={confirmationModal.isVisible}
        closeModal={confirmationModal.closeModal}
        folder={currentFolder}
        userID={user.value}
      />
    </div>
  );
};

export default FoldersPage;