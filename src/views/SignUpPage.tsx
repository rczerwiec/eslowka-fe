import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../shared/store";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebas";
import loginPageSvg from "../shared/img/loginPage.svg"
import Character from "../shared/components/Character";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../shared/components/Button";
import { Colors, Sizes } from "../shared/Enums/Stylings";

const SignUpPage = () => {
  const [createUser] = useCreateUserMutation();
  const doCreateUserWithEmailAndPassword = async (
    email: string,
    userName: string,
    password: string
  ) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        sendEmailVerification(user.user);
        toast.success("Pomyślnie utworzono konto! Zostaniesz przekierowany!");
        let newUser = {
          id: user.user.uid,
          uid: user.user.uid,
          userName: userName,
          email: email,
          folders: [],
          settings: {
            language: "polish",
            darkmode: false,
            wordsPerTraining: 5,
          },
          experience: 0,
          level: 0,
          streak: 0,
        };
        createUser(newUser).then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        });
      })
      .catch(() => {
        toast.error("Błąd podczas tworzenia konta!");
      });
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      if(values.password.length < 8){
        toast.error("Hasło musi mieć przynajmniej 8 znaków!");
        return;
      }
      if(values.userName.length < 4){
        toast.error("Login musi mieć przynajmniej 4 znaków!");
        return;
      }
      doCreateUserWithEmailAndPassword(
        values.email,
        values.userName,
        values.password,
      );
    },
  });

  return (
    <>
      <div
        className="flex flex-col h-screen
       items-center justify-center 
       bg-gradient-to-r from-gradient_from to-gradient_to"
      >
        <div className="fixed top-28 z-20 flex flex-col justify-center items-center max-w-[400px] font-inter p-2 max-lg:hidden">
          <div className="text-2xl text-main font-bold">WAŻNE!</div>
          <div className="text-xs font-semibold text-center text-red-600">Aplikacja jest w bardzo wczesnej wersji - alpha. W tej wersji, aplikacja jest darmowa. Jednocześnie ostrzegamy iż Twoje dane mogą zostać utracone w wyniku
            częstych resetów bazy danych. Pamiętaj o regularnym eksportowaniu swoich folderów słówek!
          </div>
        </div>

        <section
          className="flex relative max-md:flex-col
        rounded-3xl 
        md:min-h-[42rem] md:min-w-[80rem] max-md:w-full max-md:h-full 
        bg-white shadow-lg"
        >
          <div
            className="flex flex-col
           gap-5 p-4 
           w-1/2 h-full max-md:w-full 
           justify-center items-center 
           rounded-tl-3xl rounded-bl-3xl z-20"
          >
            <div
              className="font-inter font-bold
                            text-[54px] max-lg:text-[42px]"
            >
              Utwórz konto!
            </div>
            <form
              className="flex flex-col gap-3"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex justify-center items-center font-inter text-fifth font-bold">
                Wprowadź swoje dane!
              </div>
              <div className="flex flex-col gap-4">
                <input
                  className="bg-fifth_light h-10 rounded-md p-3 w-[20rem]"
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="nazwa użytkownika"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                />
                <input
                  className="bg-fifth_light h-10 rounded-md p-3 w-[20rem]"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <input
                  className="bg-fifth_light h-10 rounded-md p-3"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="hasło"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div className="flex justify-center items-center">
                <Button bgColor={Colors.SECONDARY} textColor={Colors.WHITE} size={Sizes.XL}
                  className="font-inter font-bold w-fit px-16 py-2 rounded-xl"
                  type="submit"
                >
                  Rejestruj!
                </Button>
              </div>
            </form>
          </div>
          <div
            className="flex flex-col
           z-0 gap-5 p-4 
           lg:w-1/2 max-lg:w-full 
           justify-center items-center 
           bg-secondary 
           max-lg:rounded-3xl lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-tl-login_screen lg:rounded-bl-login_screen"
          >
            <div className="font-inter font-bold z-20 text-[54px] text-white max-lg:text-[32px]">
              Masz już konto?
            </div>
            <Button bgColor={Colors.SECONDARY} textColor={Colors.WHITE} size={Sizes.XL}
              onClick={() => {
                navigate("/login");
              }}
              className="z-20 font-inter font-bold w-fit mt-2 px-16 py-3 rounded-2xl  border-white border-x-[5px] border-y-[5px]"
              type="submit"
            >
              Logowanie!
            </Button>
          </div>
          <Character
            alt="LoginPage character"
            className="absolute z-10 bottom-0 left-1/3 h-[30rem] select-none max-lg:hidden"
            character={loginPageSvg}
          />
        </section>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default SignUpPage;