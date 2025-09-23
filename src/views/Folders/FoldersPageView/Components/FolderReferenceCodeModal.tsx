import {useEffect, useState } from "react";
import { Modal} from "../../../../shared/components/Modal";
import Character from "../../../../shared/components/Character";
import { BiSolidExit } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { IFolder, IWord } from "../../../../shared/store/slices/FolderSlice";
import character2 from "../../../../shared/img/character2.svg";
import { RootState, useCreateFolderMutation, useGetFolderByReferenceCodeQuery } from "../../../../shared/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IProps{
  renderedFoldersLength: number | undefined,
  isVisible: boolean,
  closeModal: () => void,
  folders: IFolder[],
}

function FolderReferenceCodeModal({renderedFoldersLength, folders, isVisible, closeModal} :IProps){

    const [referenceCode, setReferenceCode] = useState("");
    const response = useGetFolderByReferenceCodeQuery({referenceCode});
    const [createFolder] = useCreateFolderMutation();
    const user = useSelector((state: RootState) => state.userProfile);
    useEffect(()=>{

    },[])


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

    const onSubmit = (e:any) => {
      e.preventDefault();
      response.refetch()
      console.log("REFETCHING...");
      if(response.isLoading){
        console.log("Loading");
      }
      if(response.isSuccess){
        console.log("Success");
        const folder:IFolder = response.data;
        console.log(folder);
        const updatedWords = folder.words.map((word:IWord, index:number)=>{
          console.log(word);
          console.log(index);
          if(renderedFoldersLength){
            word = {...word, folderId: folders[renderedFoldersLength-1].id+1}
          }
          return word;

        })


        closeModal();
        onCreateFolder({ id:folders[renderedFoldersLength!-1].id+1 , folderName: folder.folderName, words: updatedWords, currentProgress: folder.currentProgress, maxProgress: folder.maxProgress, defaultVoice: folder.defaultVoice,  defaultVoiceReversed:folder.defaultVoiceReversed, referenceID:user.value+makeid(9), isShared:false,folderLanguage:folder.folderLanguage,sharedCounter:0, authorID: folder.authorID} );
      }
      if(response.isError){
        console.log("Error",response.error);
        
      }
      

      setReferenceCode("");
    }


return (
  <Modal isVisible={isVisible} onClose={closeModal}>
    <div className="relative bg-white/95 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 z-30 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
      >
        <BiSolidExit className="text-2xl" />
      </button>
      
      {/* Content */}
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-secondarylight rounded-full mb-4">
            <span className="text-white text-2xl font-bold">#</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kod Referencyjny</h2>
          <p className="text-gray-600">Wprowadź kod, aby zaimportować folder</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Wprowadź Kod
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-200 outline-none"
              placeholder="Kod znajdziesz w folderze obok przycisku powrotu"
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-secondarylight text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
          >
            <FaCheckCircle className="text-lg" />
            Importuj Folder
          </button>
        </form>
      </div>
    </div>
  </Modal>
);
}

export default FolderReferenceCodeModal;