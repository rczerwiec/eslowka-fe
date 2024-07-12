import character1 from "../../shared/img/character1.svg";
import { HiPlus } from "react-icons/hi";
import { TbFolderFilled } from "react-icons/tb";
import { useFetchFoldersQuery } from "../../shared/store";
import { IFolder } from "../../shared/store/slices/WordsSlice";

const FoldersPage = () => {
  const response = useFetchFoldersQuery("");

  let renderedFolders;
  if (response.isLoading) {
    renderedFolders = <div>Ładowanie...</div>;
  } else if (response.isError) {
    renderedFolders = <div>Error</div>;
  } else if (response.isSuccess) {
    renderedFolders = response.data.map((folder: IFolder, index: number) => {
      return (
        <div
          className="flex flex-col pl-4 mb-2 items-left
                text-black text-3xl font-medium"
        >
          <div className="flex flex-col w-3/4 justify-center">
            <div className="flex items-center gap-4 p-2 bg-fourth rounded-lg shadow-lg hover:cursor-pointer hover:bg-secondarylight">
              <TbFolderFilled className="bg-main text-white rounded-md" />
              <div className="text-xl">{folder.folderName}</div>
            </div>
          </div>
        </div>
      );
    });
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
        {renderedFolders}
        <div className="flex z-10 absolute bottom-0 right-0 m-8 h-16 w-16 bg-secondary hover:bg-third rounded-full shadow-md items-center justify-center">
          <HiPlus className="text-2xl" />
        </div>
      </div>
      <img
        alt="character1"
        className="absolute z-0 w-1/5 bottom-0 right-0"
        src={character1}
      ></img>
    </>
  );
};

export default FoldersPage;
