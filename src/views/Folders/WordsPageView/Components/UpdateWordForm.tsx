import { Field, useFormik } from "formik";
import {
  RootState,
  useCreateWordMutation,
  useCreateWordsMutation,
  useUpdateWordDetailsMutation,
  useUpdateWordStatusMutation,
} from "../../../../shared/store";
import {
  IFolder,
  INewWord,
  INewWords,
  IWord,
} from "../../../../shared/store/slices/FolderSlice";
import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast} from 'react-toastify';

const UpdateWordForm: FC<{
  folder: IFolder;
  newID: number;
  closeModal: () => void;
  currentWord: IWord | undefined;
}> = (props): JSX.Element => {
  const user = useSelector((state: RootState) => state.userProfile);
  const [updateWord] = useUpdateWordDetailsMutation();
  let currentWordWord = "ttt";
  let currentWordTranslation = "tt";
  let currentWordNote = "";
  let currentWordID = 0;
  if(props.currentWord !== undefined){
      currentWordWord = props.currentWord.word;
      currentWordNote = props.currentWord.note;
      currentWordID = props.currentWord.id;
      currentWordTranslation = props.currentWord.translation
  }
  const formik = useFormik({
    initialValues: {
      word: currentWordWord,
      translation: currentWordTranslation,
      note:currentWordNote,
    },
    onSubmit: (values) => {
      updateWord({updatedWord: {
        word: {
          id: currentWordID,
          folderId:  props.folder.id,
          word: values.word,
          translation: values.translation,
          note: values.note,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0
        },
        folderID: props.folder.id
      }, userID: user.value}).then(()=>{
        toast.success("Pomyślnie zaaktualizowano słowo!");
        props.closeModal();
      }).catch((err)=>{
        toast.error("Błąd podczast aktualizacji! Zgłoś ten błąd do Administratora!");
      })
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="z-10">
                  <div className="font-inter font-bold text-2xl text-fifth z-10 truncate">
              Nowe Słówko - {props.folder.folderName}
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <label>Słówko</label>
        <input
          id="word"
          name="word"
          type="text"
          className="bg-fifth_light p-4 w-2/4 h-8 rounded-md font-inter text-xs font-extralight"
          placeholder="np. świnia"
          value={formik.values.word}
          onChange={formik.handleChange}
        ></input>
        <label>Tłumaczenie</label>
        <input
          id="translation"
          name="translation"
          type="text"
          className="bg-fifth_light p-4 w-2/4 h-8 rounded-md font-inter text-xs font-extralight"
          placeholder="np. pig"
          value={formik.values.translation}
          onChange={formik.handleChange}
        ></input>
        <label>Notatka</label>
                <input
          id="note"
          name="note"
          type="text"
          className="bg-fifth_light p-4 w-2/4 h-16 rounded-md font-inter text-xs font-extralight"
          placeholder="np. używane gdy odnosimy się do osób starszych"
          value={formik.values.note}
          onChange={formik.handleChange}
        ></input>
      </div>
      <input></input>
      <button type="submit" className="absolute bottom-0 right-0 pr-8 pb-6 text-3xl text-secondary">
              <FaCheckCircle className="hover:text-4xl hover:cursor-pointer"
              />
            </button>
    </form>
  );
};

export default UpdateWordForm;