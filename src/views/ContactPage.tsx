import { useFormik } from "formik";

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
      <div
        className="flex pl-4 bg-fourth h-8  items-center
                                    text-fifth text-sm font-medium"
      >
        Kontakt
      </div>
      <div
        className="flex pl-4 h-20 items-center
                                    text-black text-3xl font-medium"
      >
        Kontakt
      </div>
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
           <div
          className="flex  m-8 p-4 bg-secondary hover:bg-third hover:cursor-pointer rounded-lg shadow-md items-center justify-center"
        >Zgłoś</div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;