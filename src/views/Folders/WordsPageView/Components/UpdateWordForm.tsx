import { useFormik } from "formik";
import {
  RootState,
  useUpdateWordDetailsMutation,
} from "../../../../shared/store";
import { IFolder, IWord } from "../../../../shared/store/slices/FolderSlice";
import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../../../shared/components/Button";
import { Sizes } from "../../../../shared/Enums/Stylings";

const UpdateWordForm: FC<{
  folder: IFolder;
  newID: number;
  closeModal: () => void;
  currentWord: IWord | undefined;
}> = (props): JSX.Element => {
  const user = useSelector((state: RootState) => state.userProfile);
  const [updateWord] = useUpdateWordDetailsMutation();

  const currentWordWord = props.currentWord?.word || "";
  const currentWordTranslation = props.currentWord?.translation || "";
  const currentWordNote = props.currentWord?.note || "";
  const currentWordID = props.currentWord?.id || 0;

  const formik = useFormik({
    initialValues: {
      word: currentWordWord,
      translation: currentWordTranslation,
      note: currentWordNote,
    },
    onSubmit: (values) => {
      updateWord({
        updatedWord: {
          word: {
            id: currentWordID,
            folderId: props.folder.id,
            word: values.word,
            translation: values.translation,
            note: values.note,
            repeated: 0,
            known: 0,
            streak: 0,
            reverseStreak: 0,
          },
          folderID: props.folder.id,
        },
        userID: user.value,
      })
        .then(() => {
          toast.success("Pomyślnie zaktualizowano słowo!");
          props.closeModal();
        })
        .catch(() => {
          toast.error("Błąd podczas aktualizacji! Zgłoś ten błąd do Administratora!");
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col p-8 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto"
    >
      <h2 className="font-bold text-2xl text-fifth mb-6 text-center">
        Edytuj słowo - {props.folder.folderName}
      </h2>

      <div className="flex flex-col gap-4">
        {/* Pole dla Słówka */}
        <div className="flex flex-col">
          <label htmlFor="word" className="font-medium text-fifth mb-2">
            Słówko
          </label>
          <input
            id="word"
            name="word"
            type="text"
            className="bg-fifth_light p-4 rounded-md border border-neutral-300 focus:ring-2 focus:ring-secondary focus:outline-none"
            placeholder="np. świnia"
            value={formik.values.word}
            onChange={formik.handleChange}
          />
        </div>

        {/* Pole dla Tłumaczenia */}
        <div className="flex flex-col">
          <label htmlFor="translation" className="font-medium text-fifth mb-2">
            Tłumaczenie
          </label>
          <input
            id="translation"
            name="translation"
            type="text"
            className="bg-fifth_light p-4 rounded-md border border-neutral-300 focus:ring-2 focus:ring-secondary focus:outline-none"
            placeholder="np. pig"
            value={formik.values.translation}
            onChange={formik.handleChange}
          />
        </div>

        {/* Pole dla Notatki */}
        <div className="flex flex-col">
          <label htmlFor="note" className="font-medium text-fifth mb-2">
            Notatka
          </label>
          <textarea
            id="note"
            name="note"
            className="bg-fifth_light p-4 rounded-md border border-neutral-300 focus:ring-2 focus:ring-secondary focus:outline-none"
            placeholder="np. używane gdy odnosimy się do osób starszych"
            value={formik.values.note}
            onChange={formik.handleChange}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          type="submit"
          size={Sizes.XL3}
          className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondarylight transition"
        >
          <FaCheckCircle className="text-xl" /> Zapisz
        </Button>
      </div>
    </form>
  );
};

export default UpdateWordForm;
