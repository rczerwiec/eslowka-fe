//ICONS & SVG
import character1 from "../../../shared/img/character1.svg";
import { HiPlus } from "react-icons/hi";
import { FaEdit, FaPlayCircle,  } from "react-icons/fa";
import { TbFolderFilled } from "react-icons/tb";

import {
  RootState,
  useFetchFoldersQuery,
} from "../../../shared/store";
import { IFolder } from "../../../shared/store/slices/FolderSlice";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../../shared/store/slices/FolderSlice";
import { useNavigate } from "react-router-dom";
import useModal from "../../../shared/components/Modal/useModal";
import Character from "../../../shared/components/Character";
import FoldersPageModal from "./Components/FoldersPageModal";

const FoldersPage = () => {
  const user = useSelector((state: RootState) => state.userProfile);
  const { isVisible, closeModal, toggleModal } = useModal();
  console.log(user.value);
  const response = useFetchFoldersQuery(user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const folderProfile = useSelector((state: RootState) => state.folderProfile);


  let renderedFolders;
  let renderedFolderLength;
  if (response.isLoading) {
    renderedFolders = <div>Ładowanie.p..</div>;
  } else if (response.isError) {
    renderedFolders = <div>Error</div>;

  } else if (response.isSuccess) {
    let wordAmount = 0;
    renderedFolders = response.data.map((folder: IFolder, index: number) => {
      console.log(folderProfile.id);
      wordAmount = folder.words.length;

      const percentage = ~~((100*folder.currentProgress)/folder.maxProgress);

    let progressPanel = <div className="flex items-center">
    <div className="text-fifth font-inter font-medium text-base">
      Progress:
    </div>
    <div className="text-red-600 font-inter font-medium text-base">
      {percentage}%
    </div>
  </div>
    if (percentage >40 && percentage < 70){
      progressPanel = (<div className="flex items-center">
      <div className="text-fifth font-inter font-medium text-base">
        Progress:
      </div>
      <div className="text-orange-500 font-inter font-medium text-base">
        {percentage}%
      </div>
    </div>)
    }
    else if (percentage >=70){
      progressPanel = (<div className="flex items-center">
      <div className="text-fifth font-inter font-medium text-base">
        Progress:
      </div>
      <div className="text-green-600 font-inter font-medium text-base">
        {percentage}%
      </div>
    </div>)
    }


      return (
        <div
          className="flex flex-col pl-4 mb-2 items-left
                text-black text-3xl font-medium"
        >
          <div className="flex flex-col w-3/4 justify-center">
            <div className="flex items-center justify-between bg-fourth rounded-lg shadow-lg  hover:bg-secondarylight">
              <button
                onClick={() => {
                  dispatch(change(folder));
                  navigate("/app/folders/words");
                }}
                className="flex items-center gap-4 p-2 hover:cursor-pointer w-full h-full"
              >
                <TbFolderFilled className="bg-main text-white rounded-md" />
                <div className="text-xl">{folder.folderName}</div>
                <div className="text-xs text-fifth">
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
              </div>
            </div>
          </div>
        </div>      
      );
    });
    renderedFolderLength = renderedFolders.length;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div
          className="flex pl-4 bg-fourth h-8  items-center
                            text-fifth text-sm font-medium"
        >
          Foldery
        </div>
        <div
          className="flex pl-4 h-20 items-center
                            text-black text-3xl font-medium"
        >
          Twoje Foldery
        </div>
        <form>
        {renderedFolders}
        </form>
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
      <FoldersPageModal renderedFoldersLength={renderedFolderLength} isVisible={isVisible} closeModal={closeModal} />
    </>
  );
};

export default FoldersPage;
