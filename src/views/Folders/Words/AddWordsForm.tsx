import { Field, useFormik } from "formik";
import {
  useCreateWordMutation,
  useCreateWordsMutation,
} from "../../../shared/store";
import {
  IFolder,
  INewWord,
  INewWords,
} from "../../../shared/store/slices/FolderSlice";
import { FC } from "react";

const AddWordsForm: FC<{
  folder: IFolder;
  newID: number;
  closeModal: () => void;
}> = (props): JSX.Element => {
  const [createWord] = useCreateWordMutation();
  const [createWords] = useCreateWordsMutation();
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
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
        {
          id: props.newID + 1,
          word: "",
          translation: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
        {
          id: props.newID + 2,
          word: "",
          translation: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
        {
          id: props.newID + 3,
          word: "",
          translation: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
        {
          id: props.newID + 4,
          word: "",
          translation: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
        {
          id: props.newID + 5,
          word: "",
          translation: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
        {
          id: props.newID + 6,
          word: "",
          translation: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
        {
          id: props.newID + 7,
          word: "",
          translation: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
        {
          id: props.newID + 8,
          word: "",
          translation: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
        {
          id: props.newID + 9,
          word: "",
          translation: "",
          folderId: props.folder.id,
          repeated: 0,
          known: 0,
        },
      ],
    },
    onSubmit: (values) => {
      if (values.toggle) {
        onWordsCreate({ words: values.words, folderID: props.folder.id });
        props.closeModal();
      } else {
        onWordCreate({
          word: {
            id: props.newID,
            folderId: props.folder.id,
            word: values.word,
            translation: values.translation,
            repeated: 0,
            known: 0,
          },
          folderID: props.folder.id,
        });
        props.closeModal();
      }
    },
  });

  //CREATE NEW WORD
  const onWordCreate = async (newWord: INewWord) => {
    return await createWord(newWord)
      .unwrap()
      .then((res) => {
        console.log("res from api:", res);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  //CREATE NEW WORD
  const onWordsCreate = async (newWords: INewWords) => {
    return await createWords(newWords)
      .unwrap()
      .then((res) => {
        console.log("res from api:", res);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  let toRender;
  if (formik.values.toggle) {
    toRender = [...Array(10)].map((e, i) => (
      <div key={i}>
        <label htmlFor="word">Słówko {i + 1}</label>
        <input
          id={"words[" + i + "].word"}
          name={"words[" + i + "].word"}
          type="text"
          className="bg-fifth_light w-2/4 h-10 rounded-md p-3 z-10"
          placeholder="np. pig"
          value={formik.values.words[i].word}
          onChange={formik.handleChange}
        ></input>
        <label htmlFor="word">Tłumaczenie</label>
        <input
          id={"words[" + i + "].translation"}
          name={"words[" + i + "].translation"}
          type="text"
          className="bg-fifth_light w-2/4 h-10 rounded-md p-3 z-10"
          placeholder="np. pig"
          value={formik.values.words[i].translation}
          onChange={formik.handleChange}
        ></input>
      </div>
    ));
  } else {
    toRender = (
      <div>
        <label htmlFor="word">Słówko</label>
        <input
          id="word"
          name="word"
          type="text"
          className="bg-fifth_light w-2/4 h-10 rounded-md p-3 z-10"
          placeholder="np. pig"
          value={formik.values.word}
          onChange={formik.handleChange}
        ></input>
        <label htmlFor="word">Tłumaczenie</label>
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
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        <input type="checkbox" name="toggle" onChange={formik.handleChange} />
      </label>
      {toRender}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddWordsForm;
// <div className="flex flex-col justify-center items-center mt-6">
//   <div className="font-inter font-medium text-xl text-fifth z-10">
//     Słówko
//   </div>

// </div>
// <div className="flex flex-col justify-center items-center mt-6 z-10">
//   <div className="font-inter font-medium text-xl text-fifth ">
//     Tłumaczenie
//   </div>
//   <input
//     className="bg-fifth_light w-2/4 h-10 rounded-md p-3"
//     placeholder="np. świnia"
//     value={wordTranslation}
//     onChange={(e) => setWordTranslation(e.target.value)}
//   ></input>
// </div>
