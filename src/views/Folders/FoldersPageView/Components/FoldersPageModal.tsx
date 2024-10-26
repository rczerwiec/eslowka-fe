import { FC, useState } from "react";
import { Modal, useModal } from "../../../../shared/components/Modal";
import Character from "../../../../shared/components/Character";
import { BiSolidExit } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { IFolder } from "../../../../shared/store/slices/FolderSlice";
import character2 from "../../../../shared/img/character2.svg";
import { RootState, useCreateFolderMutation } from "../../../../shared/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FoldersPageModal: FC<{renderedFoldersLength: Number | undefined, isVisible: boolean, closeModal: () => void}> = (props): JSX.Element => {

    const [newFolder, setNewFolder] = useState("");

    const [createFolder] = useCreateFolderMutation();
    const user = useSelector((state: RootState) => state.userProfile);

    const onCreateFolder = async (newFolder: IFolder) => {
      if(newFolder.folderName===""){
        toast.error("Nazwa folderu nie może być pusta!");
        return;
      }
      if(newFolder.folderName.length>20){
        toast.error("Nazwa folderu nie może być dłuższa niż 20 znaków!");
        return;
      }

      return await createFolder({newFolder: newFolder,userID:user.value})
        .unwrap()
        .then(() => {
          toast.success("Pomyślnie utworzono folder!");
        }).catch(() => {
          toast.error("Błąd podczas tworzenia folderu!");
        });
    };

    const onSubmit = () => {
      setNewFolder("");
      props.closeModal();
      onCreateFolder({ id:props.renderedFoldersLength , folderName: newFolder, words: [], currentProgress: 0, maxProgress: 0  });
    }


return(
<Modal isVisible={props.isVisible} onClose={props.closeModal}>
<div className="absolute bg-whiteMain mt-20 z-20 h-2/4 w-full top-0 bg-white rounded xl:w-1/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
  <div className="absolute flex flex-col p-8 shrink h-full w-full overflow-y-auto  scrollbar-hide">
    <div className="font-inter font-bold text-3xl text-fifth z-10">
      Nowy Folder
    </div>
      <form onSubmit={onSubmit} className="flex flex-col justify-center items-center mt-8 z-10">
      <div className="font-inter font-medium text-xl text-fifth">
        Nazwa Folderu
      </div>
      <input
        className="bg-fifth_light w-3/4 h-10 rounded-md p-3"
        placeholder="np. warzywa"
        value={newFolder}
        onChange={(e) => setNewFolder(e.target.value)}  
      ></input>
          <button className="absolute bottom-0 right-0 pr-8 pb-6 text-3xl text-secondary hover:text-4xl hover:cursor-pointer">
      <FaCheckCircle
        onClick={onSubmit}
      />
    </button>
      </form>
    
    <Character alt="character2" className="absolute z-0 w-3/6 bottom-0 left-auto" character={character2}/>
    <div className="absolute z-20 top-0 right-0 pr-8 pt-6 text-3xl text-fifth"  >
      <BiSolidExit onClick={props.closeModal}  className="hover:cursor-pointer"/>
    </div>

  </div>
</div>
</Modal>)
}

export default FoldersPageModal;