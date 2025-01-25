import { FC, useState } from "react";
import { useFormik } from "formik";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  RootState,
  useCreateWordInFolderMutation,
  useCreateMultipleWordsInFolderMutation,
} from "../../../../shared/store";
import { IFolder, INewWord, INewWords } from "../../../../shared/store/slices/FolderSlice";
import { useSelector } from "react-redux";

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
      words: Array(9).fill({
        id: props.newID,
        word: "",
        translation: "",
        note: "",
        folderId: props.folder.id,
        repeated: 0,
        known: 0,
        streak: 0,
        reverseStreak: 0,
      }),
    },
    onSubmit: (values) => {
      if (values.toggle) {
        onWordsCreate({ words: values.words, folderID: props.folder.id })
          .then(() => toast.success("Pomyślnie utworzono słówka!"))
          .catch(() => toast.error("Błąd podczas tworzenia słówek!"));
        props.closeModal();
      } else {
        if (!values.word || !values.translation) {
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
        })
          .then(() => toast.success("Pomyślnie utworzono słówko!"))
          .catch(() => toast.error("Błąd podczas tworzenia słówka!"));
        props.closeModal();
      }
    },
  });

  const onWordCreate = async (newWord: INewWord) => {
    return createWord({ newWord: newWord, userID: user.value }).unwrap();
  };

  const onWordsCreate = async (newWords: INewWords) => {
    return createWords({ newWords: newWords, userID: user.value }).unwrap();
  };

  const renderInputs = formik.values.toggle ? (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <label className="font-bold text-fifth text-lg">Słówko</label>
        <label className="font-bold text-fifth text-lg">Tłumaczenie</label>
      </div>
      {formik.values.words.map((_, index) => (
        <div key={index} className="flex gap-4">
          <input
            id={`words[${index}].word`}
            name={`words[${index}].word`}
            type="text"
            className="bg-fifth_light w-full h-10 rounded-md p-3"
            placeholder={`Słówko ${index + 1}`}
            value={formik.values.words[index].word}
            onChange={formik.handleChange}
          />
          <input
            id={`words[${index}].translation`}
            name={`words[${index}].translation`}
            type="text"
            className="bg-fifth_light w-full h-10 rounded-md p-3"
            placeholder={`Tłumaczenie ${index + 1}`}
            value={formik.values.words[index].translation}
            onChange={formik.handleChange}
          />
        </div>
      ))}
      <p className="text-xs text-neutral-500 italic text-right">
        *Puste słówka nie zostaną dodane
      </p>
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <label className="font-bold text-fifth text-lg">Słówko</label>
        <input
          id="word"
          name="word"
          type="text"
          className="bg-fifth_light w-full h-10 rounded-md p-3"
          placeholder="np. pig"
          value={formik.values.word}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <label className="font-bold text-fifth text-lg">Tłumaczenie</label>
        <input
          id="translation"
          name="translation"
          type="text"
          className="bg-fifth_light w-full h-10 rounded-md p-3"
          placeholder="np. świnia"
          value={formik.values.translation}
          onChange={formik.handleChange}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="font-bold text-2xl text-fifth mb-4">
        Dodaj słówka - {props.folder.folderName}
      </h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="toggle"
          name="toggle"
          onChange={formik.handleChange}
          checked={formik.values.toggle}
          className="h-5 w-5"
        />
        <label htmlFor="toggle" className="text-fifth text-sm">
          Dodaj kilka słówek jednocześnie
        </label>
      </div>
      {renderInputs}
      <button
        type="submit"
        className="mt-6 flex items-center justify-center w-full bg-secondary text-white font-bold text-lg py-3 rounded-md hover:bg-secondarylight transition"
      >
        <FaCheckCircle className="mr-2" /> Zapisz
      </button>
    </form>
  );
};

export default AddWordsForm;
