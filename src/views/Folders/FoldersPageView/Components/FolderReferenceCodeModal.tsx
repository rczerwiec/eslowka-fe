import {useEffect, useState } from "react";
import { Modal} from "../../../../shared/components/Modal";
import Character from "../../../../shared/components/Character";
import { BiSolidExit } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { IFolder } from "../../../../shared/store/slices/FolderSlice";
import character2 from "../../../../shared/img/character2.svg";
import { RootState, useCreateFolderMutation, useGetFolderByReferenceCodeQuery } from "../../../../shared/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IProps{
  renderedFoldersLength: Number | undefined,
  isVisible: boolean,
  closeModal: () => void,
}

function FolderReferenceCodeModal({renderedFoldersLength, isVisible, closeModal} :IProps){

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
        closeModal();
        onCreateFolder({ id:renderedFoldersLength , folderName: folder.folderName, words: folder.words, currentProgress: folder.currentProgress, maxProgress: folder.maxProgress, defaultVoice: folder.defaultVoice,  defaultVoiceReversed:folder.defaultVoiceReversed, referenceID:user.value+makeid(9)});
      }
      if(response.isError){
        console.log("Error",response.error);
        
      }
      

      setReferenceCode("");
    }


return (
  <Modal isVisible={isVisible} onClose={closeModal}>
    <div className="absolute bg-whiteMain mt-20 z-20 h-2/4 w-full top-0 bg-white rounded xl:w-1/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
      <div className="absolute flex flex-col p-8 shrink h-full w-full overflow-y-auto  scrollbar-hide">
        <div className="font-inter font-bold text-3xl text-fifth z-10">
          KOD REFERENCYJNY
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center mt-8 z-10"
        >
          <div className="font-inter font-medium text-xl text-fifth">
            Wprowadź Kod
          </div>
          <input
            className="bg-fifth_light w-3/4 h-10 rounded-md p-3"
            placeholder="Kod znajdziesz w folderze obok przycisku powrotu"
            value={referenceCode}
            onChange={(e) => setReferenceCode(e.target.value)}
          ></input>
          <button className="absolute bottom-0 right-0 pr-8 pb-6 text-3xl text-secondary hover:text-4xl hover:cursor-pointer">
            <FaCheckCircle onClick={onSubmit} />
          </button>
        </form>

        <Character
          alt="character2"
          className="absolute z-0 w-3/6 bottom-0 left-auto"
          character={character2}
        />
        <div className="absolute z-20 top-0 right-0 pr-8 pt-6 text-3xl text-fifth">
          <BiSolidExit onClick={closeModal} className="hover:cursor-pointer" />
        </div>
      </div>
    </div>
  </Modal>
);
}

export default FolderReferenceCodeModal;