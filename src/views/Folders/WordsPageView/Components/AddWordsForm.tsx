import { useFormik } from "formik";
import {
  RootState,
  useCreateWordInFolderMutation,
  useCreateMultipleWordsInFolderMutation,
} from "../../../../shared/store";
import {
  IFolder,
  INewWord,
  INewWords,
} from "../../../../shared/store/slices/FolderSlice";
import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast} from 'react-toastify';

const AddWordsForm: FC<{
  folder: IFolder;
  newID: number;
  closeModal: () => void;
}> = (props): JSX.Element => {
  const user = useSelector((state: RootState) => state.userProfile);
  const [createWord] = useCreateWordInFolderMutation();
  const [createWords] = useCreateMultipleWordsInFolderMutation();
  const formik = useFormik({
    initialValues: {
      word: "",
      translation: "",
      toggle: false,
      words: [
        {
          id: props.newID,
          word: "",
          translation: "",
          note: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0,
        },
        {
          id: props.newID + 1,
          word: "",
          translation: "",
          note: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0,
        },
        {
          id: props.newID + 2,
          word: "",
          translation: "",
          note: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0,
        },
        {
          id: props.newID + 3,
          word: "",
          translation: "",
          note: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0,
        },
        {
          id: props.newID + 4,
          word: "",
          translation: "",
          note: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0,
        },
        {
          id: props.newID + 5,
          word: "",
          translation: "",
          note: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0,
        },
        {
          id: props.newID + 6,
          word: "",
          translation: "",
          note: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0,
        },
        {
          id: props.newID + 7,
          word: "",
          translation: "",
          note: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0,
        },
        {
          id: props.newID + 8,
          word: "",
          translation: "",
          note: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
          streak: 0,
          reverseStreak: 0,
        },
      ],
    },
    onSubmit: (values) => {
      if (values.toggle) {
        onWordsCreate({ words: values.words, folderID: props.folder.id }).then(() => {
          toast.success("Pomyślnie utworzono słówka!");
        }).catch(() => {
          toast.error("Błąd podczas tworzenia słówek!");
        });
        props.closeModal();
      } else {
        if(values.word==="" || values.word===undefined || values.word===null){
          toast.error("Uzupełnij wszystkie pola!");
          return;
        }
        if(values.translation==="" || values.translation===undefined || values.translation===null){
          toast.error("Uzupełnij wszystkie pola!");
          return;
        }

        onWordCreate({
          word: {
            id: props.newID,
            folderId: props.folder.id,
            word: values.word,
            translation: values.translation,
            repeated: 0,
            known: 0,
            streak: 0,
            reverseStreak: 0,
            note: "",
          },
          folderID: props.folder.id,
        }).then(() => {
          toast.success("Pomyślnie utworzono słówko!");
        }).catch(() => {
          toast.error("Błąd podczas tworzenia słówka!");
        });;
        props.closeModal();
      }
    },
  });

  //CREATE NEW WORD
  const onWordCreate = async (newWord: INewWord) => {

    //UPDATE FOLDER - ADD WORD IN DB
    return await createWord({newWord:newWord, userID: user.value})
      .unwrap()
      .then((res) => {
      })
      .catch((err) => {
      });
  };

  //CREATE NEW WORD
  const onWordsCreate = async (newWords: INewWords) => {
    
    //UPDATE FOLDER - ADD WORDS IN DB
    return await createWords({newWords:newWords, userID: user.value})
      .unwrap()
      .then((res) => {
      })
      .catch((err) => {
      });
  };

  let toRender;
  if (formik.values.toggle) {

    let tempRender = [...Array(9)].map((e, i) => (
      <div key={i}>
        <input
          id={"words[" + i + "].word"}
          name={"words[" + i + "].word"}
          type="text"
          className="bg-fifth_light p-4 w-2/4 h-8 rounded-md font-inter text-xs font-extralight"
          placeholder="np. świnia"
          value={formik.values.words[i].word}
          onChange={formik.handleChange}
        ></input>
        <input
          id={"words[" + i + "].translation"}
          name={"words[" + i + "].translation"}
          type="text"
          className="bg-fifth_light p-4 w-2/4 h-8 rounded-md font-inter text-xs font-extralight"
          placeholder="np. pig"
          value={formik.values.words[i].translation}
          onChange={formik.handleChange}
        ></input>
      </div>
      )
    );

    toRender = (
      <div className="z-50">
        <div className="flex justify-center">
          <label className="w-1/2" htmlFor="word">
            Słówko
          </label>
          <label htmlFor="word">Tłumaczenie</label>
        </div>
        <div className="flex justify-center flex-col gap-2">{tempRender}
          <p className="flex justify-end text-xs font-inter text-fifth underline">*Puste słówka nie zostaną dodane</p>
        </div>
      </div>
    );
  } else {
    //SINGLE WORD ADDITION
    toRender = (
      <div className="flex flex-col font-inter gap-4 m-2">
        <div className="flex justify-between w-3/4">
          <label className="font-bold text-fifth text-xl" htmlFor="word">Słówko</label>
          <input
            id="word"
            name="word"
            type="text"
            className="bg-fifth_light w-2/4 h-10 rounded-md p-3 z-10"
            placeholder="np. pig"
            value={formik.values.word}
            onChange={formik.handleChange}
          ></input>
        </div>
        <div className="flex justify-between w-3/4">
          <label className="font-bold text-fifth text-xl" htmlFor="word">Tłumaczenie</label>
          <input
            id="translation"
            name="translation"
            type="text"
            className="bg-fifth_light w-2/4 h-10 rounded-md p-3 z-10"
            placeholder="np. swinia"
            value={formik.values.translation}
            onChange={formik.handleChange}
          ></input>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="z-10">
                  <div className="font-inter font-bold text-2xl text-fifth z-10 truncate">
              Nowe Słówko - {props.folder.folderName}
            </div>
      <div className="flex font-inter text-fifth font-extralight m-2 gap-2">
        <input type="checkbox" name="toggle" onChange={formik.handleChange} />
        <label>Dodaj kilka</label>
      </div>

      {toRender}
      <button type="submit" className="absolute bottom-0 right-0 pr-8 pb-6 text-3xl text-secondary">
              <FaCheckCircle className="hover:text-4xl hover:cursor-pointer"
              />
            </button>
    </form>
  );
};

export default AddWordsForm;