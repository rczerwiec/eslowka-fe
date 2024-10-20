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
    onSubmit: (values) => {},
  });

  return (
    <div className="flex flex-col w-full h-full">
      <FirstTitle>Kontakt</FirstTitle>
      <MainTitle>Kontakt</MainTitle>
      <div className="relative flex flex-col justify-center items-center gap-4 pl-4">
        <div className="font-inter text-lg">Email: media.wspolpraca@gmail.com</div>
        <div className="font-inter">Zgłoś nam błąd lub zadaj pytanie:</div>
        <form className="flex flex-col ">
          <label>Temat</label>
          <input
            id="topic"
            name="topic"
            type="text"
            className="bg-fifth_light p-4 w-full h-8 rounded-md font-inter text-xs font-extralight"
            placeholder="Wpisz temat swojego zgłoszenia"
            value={formik.values.topic}
            onChange={formik.handleChange}
          ></input>
          <label>Treść</label>
          <input
            id="note"
            name="note"
            type="text"
            className="bg-fifth_light p-4 w-full h-16 rounded-md font-inter text-xs font-extralight"
            placeholder="Treść zgłoszenia"
            value={formik.values.note}
            onChange={formik.handleChange}
          ></input>
           <Button bgColor={Colors.SECONDARY}
          className="flex  m-8 p-4 hover:bg-third hover:cursor-pointer rounded-lg shadow-md items-center justify-center"
        >Zgłoś</Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;