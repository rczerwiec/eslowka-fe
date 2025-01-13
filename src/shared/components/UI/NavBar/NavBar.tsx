import {FC, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase/firebas";
import { useSelector } from "react-redux";
import { RootState, useFetchUserQuery } from "../../../store";
import { toast } from "react-toastify";
import logo from "../../../img/eslowka.png"
import UserMenuComponent from "./components/UserMenuComponent";
import StatsComponent from "./components/StatsComponent";

const NavBar:FC<{}> = (props):JSX.Element => {
  const user = useSelector((state: RootState) => state.userProfile);
  const response = useFetchUserQuery(user.value);
  
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
      <div className="flex top-0 right-0 bg-gradient-to-r from-main to-secondary from-70% w-full h-14 justify-between items-center">
        <Logo />
        <div className="flex gap-2 h-full justify-center items-center">
          <PremiumButton/>
          <div
            className="h-full flex items-center justify-between
                              bg-secondary 
                      w-min:54 max-lg:w-screen gap-2 lg:rounded-tl-xl lg:rounded-bl-xl"
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
      className="flex justify-center items-center text-secondary font-bold font-inter text-3xl
        pl-4 max-lg:hidden cursor-pointer" onClick={()=>{
          navigate('/')
        }}
    >
         <img className="h-10 w-10 mr-2" src={logo} alt="logo"/>
      <span className="text-2xl font-inter">ESłówka.pl</span>
    </div>
  );
};

const PremiumButton = () => {
  const navigate = useNavigate();

    return (
        <div onClick={()=>{navigate('/app/premium')}}
        className="flex w-28  mr-5 h-2/3 justify-center items-center
                            bg-gold rounded-xl font-bold font-inter hover:cursor-pointer hover:bg-slate-200 max-lg:hidden"
      >
        Premium
      </div>
    )
}

export default NavBar;
