import React from "react";
import { IFolder } from "../../../../shared/store/slices/FolderSlice";
import { TbFolderFilled } from "react-icons/tb";
import { FaEdit, FaPlayCircle, FaTrash } from "react-icons/fa";
import ProgressPanel from "../Components/ProgressPanelComponent";

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

  // Funkcja pomocnicza do renderowania przycisków akcji
  const renderActionButton = (
    icon: React.ReactNode,
    label: string,
    onClick: () => void,
    color: string = "text-gray-600"
  ) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 hover:text-main font-medium ${color} transition duration-200`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );

  // Stan ładowania
  if (isLoading) {
    return { renderedFolders: <div className="text-center">Ładowanie...</div>, renderedFolderLength };
  }

  // Stan błędu
  if (isError) {
    return {
      renderedFolders: <div className="text-center text-red-500">Błąd podczas ładowania folderów.</div>,
      renderedFolderLength,
    };
  }

  // Gdy pobieranie zakończone i są foldery
  if (isSuccess && folders.length > 0) {
    const renderedFolders = folders.map((folder) => {
      const wordAmount = folder.words.length;
      const percentage = Math.floor((100 * folder.currentProgress) / folder.maxProgress);

      return (
        <div
          key={folder.id}
          className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
        >
          {/* Nagłówek folderu */}
          <div
            className="flex items-center gap-4 bg-secondary p-4 text-white cursor-pointer"
            onClick={() => {
              dispatch(change(folder));
              navigate("/app/folders/words");
            }}
          >
            <TbFolderFilled className="text-3xl" />
            <span className="text-lg font-semibold truncate">{folder.folderName}</span>
          </div>

          {/* Pasek postępu + liczba słówek */}
          <div className="flex-col p-4 justify-center items-center">
            <ProgressPanel percentage={percentage} wordAmount={wordAmount}/>
          </div>

          {/* Przyciski akcji */}
          <div className="flex justify-around items-center bg-gray-100 p-4">
            {renderActionButton(
              <FaEdit className="text-lg" />,
              "Edytuj",
              () => {
                dispatch(change(folder));
                navigate("/app/folders/words");
              }
            )}
            {renderActionButton(
              <FaPlayCircle className="text-lg text-green-500" />,
              "Ćwicz",
              () => {
                dispatch(change(folder));
                navigate("/app/folders/training");
              }
            )}
            {renderActionButton(
              <FaTrash className="text-lg text-red-500" />,
              "Usuń",
              () => {
                toggleConfirmationModal();
                setCurrentFolder(folder);
              }
            )}
          </div>
        </div>
      );
    });

    renderedFolderLength = folders.length;

    return { renderedFolders, renderedFolderLength };
  }

  // Jeśli nie ma folderów
  if (isSuccess && folders.length === 0) {
    return {
      renderedFolders: (
        <div className="text-center text-gray-500">
          Brak folderów do wyświetlenia.
        </div>
      ),
      renderedFolderLength,
    };
  }

  return { renderedFolders: null, renderedFolderLength };
};

export default FolderRenderUtil;
