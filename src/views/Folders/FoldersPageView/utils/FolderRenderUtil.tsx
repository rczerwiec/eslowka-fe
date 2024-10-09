import { FC } from "react";
import { IFolder } from "../../../../shared/store/slices/FolderSlice";
import { TbFolderFilled } from "react-icons/tb";
import { FaEdit, FaFolder, FaPlayCircle } from "react-icons/fa";
import ProgressPanel from "../Components/ProgressPanelComponent";

const FolderRenderUtil = (
  folders: IFolder[],
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  dispatch: any,
  change: (folder:IFolder)=> void,
  navigate: (url: string) => void,
  setCurrentFolder: (folder: IFolder) => void,
  toggleConfirmationModal: () => void,
) => {
  let renderedFolderLength = 0;
  let renderedFolders;
  if (isLoading) {
    renderedFolders = <div>Ładowanie</div>
    return {renderedFolders,renderedFolderLength};
  } else if (isError) {
    renderedFolders = <div>Ładowanie</div>
    return {renderedFolders,renderedFolderLength};
  } else if (isSuccess) {
    let wordAmount = 0;

    //RENDER FOLDERS
    renderedFolders = folders.map((folder: IFolder) => {
      wordAmount = folder.words.length;

      const percentage = ~~(
        (100 * folder.currentProgress) /
        folder.maxProgress
      );

      //CALCULATE PROGRESS
      let progressPanel = ProgressPanel(percentage);
      
      return (
        <div
          key={folder.id}
          className="flex flex-col pl-4 mb-2 items-left
                        text-black text-3xl font-medium max-lg:pr-4"
        >
          <div className="flex flex-col w-3/4 max-lg:w-full justify-center">
            <div className="flex items-center w-full bg-fourth rounded-lg shadow-lg  hover:bg-secondarylight">
              <button
                onClick={() => {
                  dispatch(change(folder));
                  navigate("/app/folders/words");
                }}
                className="flex w-full items-center gap-4 p-2 hover:cursor-pointer h-full"
              >
                <TbFolderFilled className="bg-main text-white rounded-md" />
                <div className="text-xl hidden">{folder.id}</div>
                <div className="text-xl">{folder.folderName}</div>
                <div className="text-xs text-fifth max-lg:hidden">
                  (Słówka:{wordAmount})
                </div>
              </button>
              <div className="flex gap-4 mr-4">
                {progressPanel}
                <button
                  onClick={() => {
                    dispatch(change(folder));
                    navigate("/app/folders/words");
                  }}
                  className="flex flex-col gap-1 text-fifth hover:cursor-pointer hover:text-main font-inter items-center"
                >
                  <FaEdit className="text-lg" />
                  <div className="text-xs">Edytuj</div>
                </button>
                <button
                  onClick={() => {
                    dispatch(change(folder));
                    navigate("/app/folders/training");
                  }}
                  className="flex flex-col gap-1 text-fifth hover:cursor-pointer hover:text-main font-inter items-center"
                >
                  <FaPlayCircle className="text-lg" />
                  <div className="text-xs">Ćwicz</div>
                </button>
                <div
                  onClick={() => {
                    toggleConfirmationModal();
                    setCurrentFolder(folder);
                  }}
                  className="flex flex-col gap-1 text-fifth hover:cursor-pointer hover:text-main font-inter items-center"
                >
                  <FaFolder className="text-lg" />
                  <div className="text-xs">Usuń</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    if (folders.length === 0) {
      renderedFolderLength = 0;
    } else {
      renderedFolderLength = folders[renderedFolders.length - 1].id + 1;
    }

    return {renderedFolders,renderedFolderLength}
  }
};

export default FolderRenderUtil;