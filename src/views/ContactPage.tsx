import { useFormik } from "formik";
import FirstTitle from "../shared/components/FirstTitle";
import MainTitle from "../shared/components/MainTitle";
import Button from "../shared/components/Button";
import { Colors } from "../shared/Enums/Stylings";

const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      topic: "",
      note: "",
    },
    onSubmit: (values) => {
      //onsole.log("Form submitted", values);
    },
  });

  return (
    <div className="flex flex-col items-center w-full h-full bg-gray-100 p-6">
      <FirstTitle>Kontakt</FirstTitle>
      <MainTitle>Formularz Kontaktowy</MainTitle>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mt-4">
        <div className="font-inter text-lg mb-6 text-center">
          Masz pytanie lub chcesz zgłosić błąd? Skontaktuj się z nami!
        </div>
        <div className="font-inter text-md text-center mb-8">
          Email: <a href="mailto:media.wspolpraca@gmail.com" className="text-blue-500 underline">media.wspolpraca@gmail.com</a>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-semibold">Temat</label>
          <input
            id="topic"
            name="topic"
            type="text"
            className="bg-gray-200 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Wpisz temat swojego zgłoszenia"
            value={formik.values.topic}
            onChange={formik.handleChange}
          />
          <label className="text-sm font-semibold">Treść</label>
          <textarea
            id="note"
            name="note"
            rows={4}
            className="bg-gray-200 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Treść zgłoszenia"
            value={formik.values.note}
            onChange={formik.handleChange}
          ></textarea>
          <Button
            bgColor={Colors.SECONDARY}
            type="submit"
            className="w-full py-3 text-white rounded-lg hover:bg-secondary-dark transition duration-200"
          >
            Zgłoś
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;