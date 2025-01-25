import React from "react";
import { IFolder } from "../../../../shared/store/slices/FolderSlice";
import { TbFolderFilled } from "react-icons/tb";
import { FaEdit, FaFolder, FaPlayCircle } from "react-icons/fa";
import ProgressPanel from "../Components/ProgressPanelComponent";

interface FolderRenderUtilProps {
  folders: IFolder[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  dispatch: unknown;
  change: (folder: IFolder) => void;
  navigate: (url: string) => void;
  setCurrentFolder: (folder: IFolder) => void;
  toggleConfirmationModal: () => void;
}

const FolderRenderUtil = (
  folders: IFolder[],
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  dispatch: any,
  change: (folder: IFolder) => void,
  navigate: (url: string) => void,
  setCurrentFolder: (folder: IFolder) => void,
  toggleConfirmationModal: () => void
) => {
  let renderedFolderLength = 0;

  // Helper to render action buttons
  const renderActionButton = (
    icon: React.ReactNode,
    label: string,
    onClick: () => void
  ) => (
    <button
      onClick={onClick}
      className="flex flex-col gap-1 text-gray-600 hover:text-main font-medium items-center"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );

  // Loading State
  if (isLoading) {
    return { renderedFolders: <div>Ładowanie...</div>, renderedFolderLength };
  }

  // Error State
  if (isError) {
    return {
      renderedFolders: <div>Błąd podczas ładowania folderów.</div>,
      renderedFolderLength,
    };
  }

  // Success State
  if (isSuccess && folders.length > 0) {
    const renderedFolders = folders.map((folder) => {
      const wordAmount = folder.words.length;
      const percentage = Math.floor(
        (100 * folder.currentProgress) / folder.maxProgress
      );

      return (
        <div
          key={folder.id}
          className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
        >
          <div className="flex items-center justify-between bg-secondary p-4 text-white">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => {
              dispatch(change(folder));
              navigate("/app/folders/words");
            }}>
              <TbFolderFilled className="text-2xl" />
              <div className="text-lg font-semibold truncate">{folder.folderName}</div>
            </div>
            <div className="text-sm hidden max-lg:block">(Słówka: {wordAmount})</div>
          </div>

          <div className="p-4">
            <ProgressPanel percentage={percentage} />
            <div className="mt-2 text-sm text-gray-600">Słówka: {wordAmount}</div>
          </div>

          <div className="flex justify-around items-center bg-gray-100 p-4">
            {renderActionButton(
              <FaEdit className="text-lg" />, "Edytuj", () => {
                dispatch(change(folder));
                navigate("/app/folders/words");
              }
            )}
            {renderActionButton(
              <FaPlayCircle className="text-lg text-green-500" />, "Ćwicz", () => {
                dispatch(change(folder));
                navigate("/app/folders/training");
              }
            )}
            <div
              onClick={() => {
                toggleConfirmationModal();
                setCurrentFolder(folder);
              }}
              className="flex flex-col items-center gap-1 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <FaFolder className="text-lg" />
              <span className="text-xs">Usuń</span>
            </div>
          </div>
        </div>
      );
    });

    renderedFolderLength = folders.length;

    return { renderedFolders, renderedFolderLength };
  }

  // No Folders State
  if (isSuccess && folders.length === 0) {
    return {
      renderedFolders: <div className="text-center text-gray-500">Brak folderów do wyświetlenia.</div>,
      renderedFolderLength,
    };
  }

  return { renderedFolders: null, renderedFolderLength };
};

export default FolderRenderUtil;