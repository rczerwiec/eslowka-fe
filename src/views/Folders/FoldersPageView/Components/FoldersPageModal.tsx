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

    const makeid = (length:number) => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }

    const onCreateFolder = async (newFolder: IFolder) => {
      if(newFolder.folderName===""){
        toast.error("Nazwa folderu nie może być pusta!");
        return;
      }
      if(newFolder.folderName.length>40){
        toast.error("Nazwa folderu nie może być dłuższa niż 40 znaków!");
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
      onCreateFolder({ id:props.renderedFoldersLength , folderName: newFolder, words: [], currentProgress: 0, maxProgress: 0, defaultVoice: "Microsoft Ryan Online (Natural) - English (United Kingdom)",  defaultVoiceReversed:"Microsoft Ryan Online (Natural) - English (United Kingdom)", referenceID:user.value+makeid(9)});
      props.closeModal();
    }


return(
<Modal isVisible={props.isVisible} onClose={props.closeModal}>
<div className="absolute bg-whiteMain mt-20 z-20 h-2/4 w-full top-0 bg-white rounded xl:w-1/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
  <div className="absolute flex flex-col p-8 shrink h-full w-full overflow-y-auto  scrollbar-hide">
       {/* Header */}
       <div className="flex justify-between items-center mb-6">
        <h2 className="font-inter font-bold text-3xl text-fifth">Nowy Folder</h2>
        <BiSolidExit
          onClick={props.closeModal}
          className="text-3xl text-fifth cursor-pointer hover:scale-110 transition-transform"
        />
      </div>

    {/* Form */}
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
        <label className="font-inter font-medium text-xl text-fifth">
          Nazwa Folderu
        </label>
        <input
          className="bg-fifth_light w-full max-w-md h-12 rounded-md px-4 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder="np. Warzywa"
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-bold rounded-md hover:bg-secondarylight transition-transform transform hover:scale-105"
        >
          <FaCheckCircle className="text-lg" />
          Utwórz Folder
        </button>
      </form>
    
  {/* Character Image */}
  <Character
        alt="character2"
        className="absolute z-0 w-2/4 bottom-0 left-0 opacity-10"
        character={character2}
      />

  </div>
</div>
</Modal>)
}

export default FoldersPageModal;