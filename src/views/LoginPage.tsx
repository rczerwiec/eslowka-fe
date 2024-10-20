import { useFormik } from "formik";
import {doSignInWithEmailAndPassword } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { HiMail } from "react-icons/hi";
import loginPageSvg from "../shared/img/loginPage.svg"
import Character from "../shared/components/Character";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebas";
import { useCreateUserMutation, useUpdateUserDatesMutation } from "../shared/store";
import { FaGoogle } from "react-icons/fa6";
import { userInfo } from "os";
import Button from "../shared/components/Button";
import { Colors, Sizes } from "../shared/Enums/Stylings";

const LoginPage = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [updateDates] = useUpdateUserDatesMutation();

  const googleSignIn = () =>{
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  //Register with Google Auth
  const handleGoogleSignIn = async (e:any) => {
    e.preventDefault();
    try {
      await googleSignIn().then((obj)=>{
        let newUser = {
          id: obj.user.uid,
          uid: obj.user.uid,
          userName: obj.user.displayName,
          email: obj.user.email,
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
            updateDates({datesToUpdate: {  
              practiceDate: new Date(),
              onLogin: true,
              currentStreak: 0,}, userID: obj.user.uid});
            toast.success("Pomyślnie zalogowano! Zostaniesz przekierowany!");
            navigate("/app");
          }, 5000);
        }).catch((err) => {
          toast.error("Wystąpił błąd podczas rejestracji z użyciem Google!");
        }
      );
      })
    } catch (error) {
      toast.error("Błąd podczas rejestracji z użyciem Google!");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //Sign in with login and password
    onSubmit: (values) => {
      doSignInWithEmailAndPassword(values.email, values.password).then((obj)=>{
        console.log(obj.user.uid)
        updateDates({datesToUpdate: {  
          practiceDate: new Date(),
          onLogin: true,
          currentStreak: 0,}, userID: obj.user.uid});
        if(obj.user.emailVerified){
          toast.success("Pomyślnie zalogowano! Zostaniesz przekierowany!");
          setTimeout(() => {
            navigate("/app");
          }, 2500);
        }
        else{
          toast.error("Wygląda na to, że Twój adres email nie jest zweryfikowany. Sprawdź pocztę!");
          signOut(auth)
        }

      }).catch((err)=>{
        toast.error("Błedny login lub hasło!");
      });
      //CREATE USER IN MONGODB
    },
  });

  return (
    <>
    <div className="flex flex-col h-screen
       items-center justify-center 
       bg-gradient-to-r from-gradient_from to-gradient_to">
      <section className="flex relative max-lg:flex-col
        rounded-3xl 
        lg:min-h-[42rem] lg:min-w-[80rem] max-lg:w-full max-lg:h-full 
        bg-white shadow-lg">
          <div className="flex flex-col
           gap-5 p-4 
           w-1/2 h-full max-lg:w-full 
           justify-center items-center 
           rounded-tl-3xl rounded-bl-3xl z-20">
          <div className="font-inter font-bold text-[54px] max-lg:text-[41px]">Zaloguj się!</div>
          <div className="flex flex-row gap-4 text-[42px] text-fifth">
            <div onClick={handleGoogleSignIn} className="border border-black rounded-xl p-2"><FaGoogle/></div>
            <div className="border border-black rounded-xl p-2"><HiMail/></div>
            <div className="border border-black rounded-xl p-2"><HiMail/></div>
            <div className="border border-black rounded-xl p-2"><HiMail/></div>
          </div>
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center items-center font-inter text-fifth font-bold">Wprowadź swoje dane!</div>
            <div className="flex flex-col gap-4">
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
            <div onClick={()=> {
              sendPasswordResetEmail(auth, formik.values.email).then(()=>{
                toast.info("Link resetujący hasło został wysłany na podany przez Ciebie adres email!");
              }).catch((err)=>{
                toast.error("Wprowadź swój adres email powyżej (bez hasła)!");
              })
            }} className="flex justify-center items-center font-inter text-fifth font-bold underline cursor-pointer">Nie pamiętasz hasła?</div>
            <div className="flex justify-center items-center">
              <Button className="" size={Sizes.XL} textColor={Colors.WHITE} bgColor={Colors.SECONDARY}>Zaloguj</Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col
           z-0 gap-5 p-4 
           lg:w-1/2 max-lg:w-full 
           justify-center items-center 
           bg-secondary 
           max-lg:rounded-3xl lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-tl-login_screen lg:rounded-bl-login_screen">
          <div className="font-inter font-bold z-20 text-[54px] text-white max-lg:text-[32px] max-lg:text-center">Witaj, przybyszu!</div>
          <div className="flex justify-center z-20 items-center font-inter text-lg text-white font-medium max-lg:text-center">Chciałbyś nauczyć się nowych słówek, ale nie wiesz jak zacząć?</div>
          <Button bgColor={Colors.SECONDARY} textColor={Colors.WHITE} size={Sizes.XL} onClick={()=>{
            navigate('/signup')
          }} className="z-20 font-inter font-bold w-fit mt-8 px-16 py-3 rounded-2xl  border-white border-x-[5px] border-y-[5px]" type="submit">Dołącz do nas!</Button>
        </div>
        <Character alt="LoginPage character" className="absolute z-10 bottom-0 left-1/3 h-[30rem] select-none max-lg:hidden" character={loginPageSvg}/>
      </section>
    </div>
    <ToastContainer
        position="bottom-center"
        autoClose={2500}
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

export default LoginPage;

