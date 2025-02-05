import { IoMdArrowRoundBack } from "react-icons/io";
import character1 from "../../../shared/img/character1.svg";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import Character from "../../../shared/components/Character";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store";
import { useEffect } from "react";
import FirstTitle from "../../../shared/components/FirstTitle";
import MainTitle from "../../../shared/components/MainTitle";
import { toast } from "react-toastify";

const TrainingPage = () => {
  const navigate = useNavigate();
  const folder = useSelector((state: RootState) => state.folderProfile);
  console.log(folder);
  useEffect(() => {
    if (folder.id === undefined) {
      navigate("/app/folders");
    }
  }, []);

  const handleNavigation = (route: string) => {
    if (folder.words.length === 0) {
      toast.error("Folder musi mieć dodane jakieś słówka!");
    } else {
      navigate(route);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      <FirstTitle>Tryby</FirstTitle>
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-lg">
        <MainTitle>Wybierz Tryb</MainTitle>
        <button
          onClick={() => navigate("/app/folders")}
          className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondarylight transition duration-200"
        >
          <IoMdArrowRoundBack />
          <span>Powrót</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 px-6 py-8">
        <ModeButton
          title="Słówko - Tłumaczenie"
          onClick={() => handleNavigation("/app/folders/training/play")}
        />
        <ModeButton
          title="Słówko - Tłumaczenie (Odwrotne)"
          onClick={() => handleNavigation("/app/folders/training/playReversed")}
        />
        <ModeButton
          title="Słówko - Tłumaczenie - Mowa"
          onClick={() => handleNavigation("/app/folders/training/playHear")}
        />
        <ModeButton
          title="Słówko - Tłumaczenie (Odwrotne) - Mowa"
          onClick={() => handleNavigation("/app/folders/training/playHearReversed")}
        />
      </div>

      <Character
        alt="character1"
        className="absolute z-0 w-1/5 bottom-0 right-0 max-lg:hidden"
        character={character1}
      />
    </div>
  );
};

const ModeButton = ({ title, onClick }: { title: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full max-w-3xl p-4 bg-white shadow-md rounded-lg hover:bg-secondarylight transition duration-200"
  >
    <div className="flex items-center gap-4">
      <FaPlayCircle className="text-secondary text-2xl" />
      <span className="text-lg font-medium text-gray-800">{title}</span>
    </div>
  </button>
);

export default TrainingPage;
