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
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-secondarylight rounded-full mb-4">
            <FaCheckCircle className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Edytuj słowo
          </h2>
          <p className="text-gray-600">
            Folder: <span className="font-semibold text-secondary">{props.folder.folderName}</span>
          </p>
        </div>

        <div className="space-y-6">
          {/* Pole dla Słówka */}
          <div className="space-y-2">
            <label htmlFor="word" className="block text-sm font-semibold text-gray-700">
              Słówko
            </label>
            <input
              id="word"
              name="word"
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-200 outline-none"
              placeholder="np. świnia"
              value={formik.values.word}
              onChange={formik.handleChange}
            />
          </div>

          {/* Pole dla Tłumaczenia */}
          <div className="space-y-2">
            <label htmlFor="translation" className="block text-sm font-semibold text-gray-700">
              Tłumaczenie
            </label>
            <input
              id="translation"
              name="translation"
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-200 outline-none"
              placeholder="np. pig"
              value={formik.values.translation}
              onChange={formik.handleChange}
            />
          </div>

          {/* Pole dla Notatki */}
          <div className="space-y-2">
            <label htmlFor="note" className="block text-sm font-semibold text-gray-700">
              Notatka
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-200 outline-none resize-none"
              placeholder="np. używane gdy odnosimy się do osób starszych"
              value={formik.values.note}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={props.closeModal}
            className="flex-1 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200"
          >
            Anuluj
          </button>
          <Button
            type="submit"
            size={Sizes.XL3}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-secondarylight text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            <FaCheckCircle className="text-lg" />
            Zapisz zmiany
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateWordForm;
