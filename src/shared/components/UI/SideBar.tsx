import { TbSquareRoundedLetterW, TbFolderFilled } from "react-icons/tb";
import { PiRankingFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FaBook, FaRobot } from "react-icons/fa6";

const SideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Moje Foldery", icon: <TbFolderFilled className="text-2xl" />, route: "/app/folders" },
    { label: "Chat AI", icon: <FaRobot className="text-2xl" />, route: "/app/ai" },
    { label: "Ćwicz Czytanie", icon: <FaBook className="text-2xl" />, route: "/app/read" },
    { label: "Ranking", icon: <PiRankingFill className="text-2xl" />, route: "/app/ranking" },
  ];

  return (
    <div className="max-lg:hidden relative flex flex-col justify-between top-0 left-0 bg-main w-60  ax-lg:hidden shadow-lg">
      <div className="flex flex-col justify-between">
        {/* Górna część menu */}
        <div className="pt-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.route)}
              className="flex h-12 items-center pl-6 gap-4 text-white font-inter font-bold text-base hover:bg-third hover:cursor-pointer hover:shadow-md transition-all"
            >
              <div className="text-white">{item.icon}</div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Dolna część z informacją o wersji */}
        <div className="absolute bottom-1 left-12 mx-auto text-center text-white text-xs py-4 border-t border-neutral-800">
          <div className="font-semibold">Esłówka</div>
          <div>Wersja: 1.13.1 alpha</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
