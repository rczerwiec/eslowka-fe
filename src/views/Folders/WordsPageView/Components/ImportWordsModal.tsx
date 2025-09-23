import { FC } from "react"
import { INewWords, IWord } from "../../../../shared/store/slices/FolderSlice"
import { Modal } from "../../../../shared/components/Modal"
import { RootState, useCreateMultipleWordsInFolderMutation } from "../../../../shared/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import { Colors } from "../../../../shared/Enums/Stylings";


const ImportWordsModal: FC<{isVisible: boolean, closeModal: () => void, folder: IWord[], data: any}> = (props): JSX.Element => {
    const [createWords] = useCreateMultipleWordsInFolderMutation();
    const user = useSelector((state: RootState) => state.userProfile);
    const navigate = useNavigate();
    const onWordsCreate = async (newWords: INewWords) => {
        //UPDATE FOLDER - ADD WORDS IN DB
        return await createWords({newWords:newWords, userID: user.value})
          .unwrap()
          .then((res) => {
            toast.success("Pomyślnie zaimportowano słówka!");
            navigate('/app')
          })
          .catch((err) => {
            toast.error("Problem podczas importu!");
          });
      };

    const ImportWords = async (e:Event) =>{
        e.preventDefault();
        //console.log(props.folder)
        if(props.folder.length ===0){
          toast.error("Błąd podczas importu! Przed importem, twój folder powinien mieć conajmniej jedno dodane słówko!");
        }
        const folderWords = props.folder;
        const dataToAdd :IWord[]= props.data;
        if (
          props.data[0].hasOwnProperty("id") ||
          props.data[0].hasOwnProperty("word") ||
          props.data[0].hasOwnProperty("translation") ||
          props.data[0].hasOwnProperty("streak") ||
          props.data[0].hasOwnProperty("known") ||
          props.data[0].hasOwnProperty("folderId") ||
          props.data[0].hasOwnProperty("repeated")
        ) {
          if (folderWords !== undefined) {
            if (folderWords.length !== 0) {
              //MAP ID LIST OF CURRENT FOLDER
              const currentWordsIDs = folderWords.map(
                (word: IWord, index: number) => {
                  return word.id;
                }
              );
              //console.log(currentWordsIDs);
              //console.log(currentWordsIDs[currentWordsIDs.length - 1]);

              //SET NEW ID TO WORDS
              const dataToAddWithNewIDs = dataToAdd.map(
                (word: IWord, index: number) => {
                  word.id =
                    currentWordsIDs[currentWordsIDs.length - 1] + (index + 1);
                  //console.log("NEWID", word.id);
                  word.folderId = folderWords[0].folderId;
                  if(word.note === null) word.note= "";
                  return word;
                }
              );
              await onWordsCreate({
                words: dataToAddWithNewIDs,
                folderID: folderWords[0].folderId,
              }).catch(() => {
                toast.error("Błąd podczas importu! Przed importem, twój folder powinien mieć conajmniej jedno dodane słówko!");
              });
            }
          }
        }
        else{
            toast.error("Zły format importu!");
            props.closeModal();
        }
            


        //console.log("CURRENT DATA",folderWords);
        //console.log("DATA TO ADD",dataToAdd);


    }


return (
    <Modal isVisible={props.isVisible} onClose={props.closeModal}>
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="relative bg-white/95 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
          {/* Content */}
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-secondarylight rounded-full mb-4">
                <span className="text-white text-2xl font-bold">{props.data.length}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Import słówek</h2>
              <p className="text-gray-600">Znaleziono {props.data.length} słówek gotowych do zaimportowania</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => props.closeModal()}
                className="flex-1 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200"
              >
                Anuluj
              </button>
              <Button 
                bgColor={Colors.SECONDARY} 
                onClick={ImportWords}
                className="flex-1 px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                Importuj słówka
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
)}

export default ImportWordsModal;