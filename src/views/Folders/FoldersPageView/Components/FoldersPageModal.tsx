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

const FoldersPageModal: FC<{folders: IFolder[],renderedFoldersLength: number | undefined, isVisible: boolean, closeModal: () => void}> = (props): JSX.Element => {

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
      if(!props.renderedFoldersLength) return;
      onCreateFolder({ id:props.folders[props.renderedFoldersLength-1].id+1 , folderName: newFolder, words: [], currentProgress: 0, maxProgress: 0, defaultVoice: "Microsoft Ryan Online (Natural) - English (United Kingdom)",  defaultVoiceReversed:"Microsoft Ryan Online (Natural) - English (United Kingdom)", referenceID:user.value+makeid(9),isShared:false,folderLanguage:"Angielski",sharedCounter:0, authorID: user.value});
      props.closeModal();
    }


return(
<Modal isVisible={props.isVisible} onClose={props.closeModal}>
  <div className="relative bg-white/95 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
    {/* Close Button */}
    <button
      onClick={props.closeModal}
      className="absolute top-4 right-4 z-30 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
    >
      <BiSolidExit className="text-2xl" />
    </button>
    
    {/* Content */}
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-secondarylight rounded-full mb-4">
          <FaCheckCircle className="text-white text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Nowy Folder</h2>
        <p className="text-gray-600">Utwórz nowy folder na słówka</p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Nazwa Folderu
          </label>
          <input
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-200 outline-none"
            placeholder="np. Warzywa"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-secondarylight text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <FaCheckCircle className="text-lg" />
          Utwórz Folder
        </button>
      </form>
    </div>
  </div>
</Modal>)
}

export default FoldersPageModal;