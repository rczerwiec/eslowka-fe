import { useSelector } from "react-redux";
import { Modal } from "../../shared/components/Modal";
import { RootState, useCreateWordMutation, useFetchFolderQuery, useFetchFoldersQuery } from "../../shared/store";
import { IFolder, INewWord } from "../../shared/store/slices/FolderSlice";
import { ChangeEvent, useState } from "react";
import { GoogleGenerativeAI} from "@google/generative-ai";
import FolderSelector from "./FolderSelector";
import { toast } from "react-toastify";

interface IProps {
  isVisible: boolean;
  onClose?: () => void;
  word: string;
}


function AIWordModal({ isVisible, onClose, word}: IProps) {
   const user = useSelector((state: RootState) => state.userProfile);
   const [folder, setFolder] = useState<any>();
   const response = useFetchFoldersQuery(user.value);
   const formatedWord = word.replaceAll(",","").replaceAll(")","").replaceAll("(","").replaceAll(".","").replaceAll("?","").replaceAll("!","").replaceAll(`"`,"").replaceAll("`","").replaceAll("'","").replaceAll(":","");
   const [createWord] = useCreateWordMutation();

  // gemini api key
  const apikey = process.env.REACT_APP_GEMINI_API_KEY;

   //AI
   let genAI;
   if (apikey !== undefined) {
     genAI = new GoogleGenerativeAI(apikey);
   }
   const model = genAI?.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
  });



  const setTranslation = async (word: string) => {
    let translation = "";
    if(model){
      const result = await model.generateContent("Przetłumacz słowo:"+word+" i zapisz jednym słowem tłumaczenie na język polski");
      const response = await result.response;
      translation = response.text().toString();
    }
    return translation;
  }

  //ADD THIS WORD TO CURRENT SELECTED FOLDER
  const AddWordToFolder = async () => {
    console.log(folder);
    if(folder){
    let newID = 0;
    if(folder.words.length !== 0 ){
      console.log("długosc",folder.words.length)
      console.log("poprzednie id",folder.words[folder.words.length - 1].id)
      newID = (folder.words[folder.words.length - 1].id + 1)
    }
    console.log("NOWE ID",newID);
    const translation = await setTranslation(formatedWord);
    const word:INewWord = {
      word: {
        id:newID,
        folderId: folder.id,
        word: formatedWord,
        translation: translation,
        repeated: 0,
        known: 0,
        streak: 0,
        reverseStreak: 0,
        note: "",
      },
      folderID: folder.id,
    }


    return await createWord({newWord:word, userID: user.value})
    .unwrap()
    .then((res) => {
      toast.success("Pomyślnie dodano słówko do folderu!");
    })
    .catch((err) => {
      toast.success("Błąd podczas dodawania słówka do folderu!");
    });
  }
  }

  let options = [{value:"Ładowanie...", label: "Ładowanie..."}];
  if(response.isSuccess) {
    options = response.data.map((folder: IFolder) => ({ value: folder.folderName, label: folder.folderName }));
  } 
  
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="absolute bg-whiteMain mt-20 z-20 h-2/4 w-full top-0 bg-white rounded xl:w-1/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
        <div className="absolute flex flex-col p-8 shrink h-full w-full overflow-y-auto  scrollbar-hide">
          <div className="font-inter font-bold text-3xl text-fifth z-10">
            Słówko
          </div>
            {formatedWord}

            <div>
              Dodaj Do:
              <FolderSelector userID={user.value} options={options} text="Wybierz folder" setFolder={setFolder}/>
              <button onClick={AddWordToFolder}>DODAJ</button>
            </div>
            
          <div className="absolute z-20 top-0 right-0 pr-8 pt-6 text-3xl text-fifth"></div>
        </div>
      </div>
    </Modal>
  );
}

export default AIWordModal;
