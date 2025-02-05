import { FC, useState } from "react";
import { useFormik } from "formik";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  RootState,
  useCreateWordInFolderMutation,
  useCreateMultipleWordsInFolderMutation,
} from "../../../../shared/store";
import { change, IFolder, INewWord, INewWords } from "../../../../shared/store/slices/FolderSlice";
import { useDispatch, useSelector } from "react-redux";

const AddWordsForm: FC<{
  folder: IFolder;
  newID: number;
  closeModal: () => void;
}> = ({ folder, newID, closeModal }) => {
  const user = useSelector((state: RootState) => state.userProfile);
  const [createWord] = useCreateWordInFolderMutation();
  const [createWords] = useCreateMultipleWordsInFolderMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      word: "",
      translation: "",
      toggle: false,
      words: Array(9).fill({
        id: newID,
        word: "",
        translation: "",
        note: "",
        folderId: folder.id,
        repeated: 0,
        known: 0,
        streak: 0,
        reverseStreak: 0,
      }),
    },
    onSubmit: async (values) => {
      if (values.toggle) {
        const validWords = values.words.filter(w => w.word.trim() && w.translation.trim());

        if (validWords.length === 0) {
          toast.error("Nie dodano żadnych słówek!");
          return;
        }

        try {
          await createWords({ newWords: { words: validWords, folderID: folder.id }, userID: user.value }).unwrap();
          
          const updatedFolder = {
            ...folder,
            words: [...folder.words, ...validWords],
          };

          dispatch(change(updatedFolder));
          toast.success("Pomyślnie utworzono słówka!");
          closeModal();
        } catch (error) {
          toast.error("Błąd podczas tworzenia słówek!");
        }
      } else {
        if (!values.word.trim() || !values.translation.trim()) {
          toast.error("Uzupełnij wszystkie pola!");
          return;
        }

        const newWord: INewWord = {
          word: {
            id: newID,
            folderId: folder.id,
            word: values.word,
            translation: values.translation,
            repeated: 0,
            known: 0,
            streak: 0,
            reverseStreak: 0,
            note: "",
          },
          folderID: folder.id,
        };

        try {
          await createWord({ newWord, userID: user.value }).unwrap();
          
          const updatedFolder = {
            ...folder,
            words: [...folder.words, newWord.word],
          };

          dispatch(change(updatedFolder));
          toast.success("Pomyślnie utworzono słówko!");
          closeModal();
        } catch (error) {
          toast.error("Błąd podczas tworzenia słówka!");
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="font-bold text-2xl text-fifth mb-4">
        Dodaj słówka - {folder.folderName}
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

      {formik.values.toggle ? (
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
      )}

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
