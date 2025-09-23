import {FC, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase/firebas";
import { useSelector } from "react-redux";
import { RootState, useFetchUserQuery } from "../../../store";
import { toast } from "react-toastify";
import logo from "../../../img/eslowka.png"
import { HiExclamationCircle } from "react-icons/hi";
import UserMenuComponent from "./components/UserMenuComponent";
import StatsComponent from "./components/StatsComponent";

const NavBar:FC<{}> = (props):JSX.Element => {
  const user = useSelector((state: RootState) => state.userProfile);
  const response = useFetchUserQuery(user.value);
  const auth = getAuth();
  const authUser = auth.currentUser;
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();


  const [display, setDisplay] = useState(false);

  const hoverOn = () => {
      setDisplay(true)
  }

  const hoverOff = () => {
      setDisplay(false)
  }

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        toast.success("Pomyślnie wylogowano! Zostaniesz przekierowany!");

    }).catch((error) => {
    // An error happened
    toast.success("Błąd podczas wylogowywania!");
    });
  }

  let userName = "Ładowanie...";
  let streak = 0;
  let level = 0;
  let experience = 0;
  if (response.isSuccess) {
    streak = response.data.streak;
    level = response.data.level;
    experience = response.data.experience;
    userName = response.data.userName;
  }

  let dropDownClass: string = "flex hidden flex-col absolute z-20 text-white w-56 bg-secondary top-12 h- right-0 rounded-b-lg"
  if(dropDown) {
    dropDownClass = "flex flex-col absolute z-20 text-white w-56 bg-secondary top-12 h- right-0 rounded-b-lg"
  }



  return (
    <div>
      <div className="flex top-0 right-0 bg-gradient-to-r from-main to-secondary from-70% w-full h-14 justify-between items-center ">
        <Logo />
        <div className="flex gap-2 h-full justify-center items-center">
          {authUser && !authUser.emailVerified && (
            <div className="max-w-xl px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-sm flex items-center gap-2 text-white">
              <HiExclamationCircle className="text-yellow-300 text-xl" />
              <span className="font-semibold">Aktywuj konto</span>
              <span className="text-sm opacity-90">Sprawdź e‑mail i kliknij link aktywacyjny.</span>
            </div>
          )}
          <PremiumButton/>
          <div
            className="h-full flex items-center justify-between
                              bg-secondary 
                      w-min:54 max-lg:w-screen gap-2 rounded-xl lg:rounded-tl-xl lg:rounded-bl-xl"
          >
          <StatsComponent streak={streak} level={level} experience={experience}/>
          <UserMenuComponent signOut={handleLogout} userName={userName} hoverOn={hoverOn} hoverOff={hoverOff} display={display}/>   
          </div>
        </div>
      </div>
    </div>
  );
};




const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex max-lg:hidden items-center text-black font-bold font-inter text-2xl bg-gradient-to-r from-secondarylight to-white 
                 px-4 py-2 rounded-full shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={() => navigate("/")}
    >
      <img className="h-12 w-12 mr-3 rounded-full" src={logo} alt="logo" />
      <span className="text-lg font-inter">ESłówka.pl</span>
    </div>
  );
};

const PremiumButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/app/premium");
      }}
      className="max-lg:hidden flex w-32 h-12 justify-center items-center bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full 
                 text-white font-bold font-inter text-lg shadow-lg hover:scale-105 hover:bg-yellow-600 transition duration-300 ease-in-out cursor-pointer"
    >
      Premium
    </div>
  );
};

export default NavBar;
