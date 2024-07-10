import { FaFire } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="flex absolut top-0 right-0 bg-main w-full h-14 justify-between items-center">
      <Logo />
      <div className="flex h-full justify-center items-center">
        <PremiumButton/>
        <div
          className="h-full  flex items-center justify-between
                            bg-secondary 
                            w-56 rounded-tl-xl rounded-bl-xl"
        >
          <Streak />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

const Streak = () => {
  return (
    <div className="flex items-center ml-6">
      <div className="font-bold font-inter text-2xl">3</div>
      <div>
        <FaFire className="text-xl" />
      </div>
    </div>
  );
};
const UserMenu = () => {
  return (
    <div className="flex items-center mr-4">
      <div className="font-bold font-inter text-xl text-white mr-2">Radek</div>
      <div>
        <FaUser className="text-2xl" />
      </div>
      <div>
        <FaChevronDown className="text-lg mr-2" />
      </div>
    </div>
  );
};
const Logo = () => {
  return (
    <div
      className="text-white font-bold font-inter text-3xl
        pl-4"
    >
      ESłówka.pl
    </div>
  );
};

const PremiumButton = () => {
    return (
        <div
        className="flex w-28  mr-5 h-2/3 justify-center items-center
                            bg-gold rounded-xl font-bold font-inter"
      >
        Premium
      </div>
    )
}

export default NavBar;
